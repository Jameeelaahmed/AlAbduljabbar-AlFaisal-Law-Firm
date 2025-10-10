import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as categoryApi from '../api/category'
import { toast } from "react-toastify";


export const useAllCategories = () => useQuery({
    queryKey: ["allCategories"],
    queryFn: categoryApi.getAllCategories
})

export const useCategoryById = (id) => useQuery({
    queryKey: ["categoryById"],
    queryFn: categoryApi.getCategoryById(id),
    enabled: !!id
})

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: categoryApi.createCategory,
        onMutate: async (newCategory) => {
            await queryClient.cancelQueries(["allCategories"]);

            const previousCategories = queryClient.getQueryData(["allCategories"]);

            // Add new item with a temporary id
            queryClient.setQueryData(["allCategories"], (old) => [
                ...(old || []),
                { ...newCategory, id: Date.now(), isTemp: true },
            ]);

            return { previousCategories };
        },
        onError: (err, newCategory, context) => {
            queryClient.setQueryData(["allCategories"], context.previousCategories);
            toast.error(err.response?.data?.message || `Something went wrong couldn't create ${newCategory} !`);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["allCategories"]);
        },
        onSuccess: () => {
            toast.success("Category created successfully!");
        }
    });
};


export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => categoryApi.updateCategory(id, data),
        onError: (err) => {
            toast.error(err.response?.data?.message || `Something went wrong couldn't update this category!`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["allCategories"])
            toast.success("Category created successfully!");
        }
    })
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => categoryApi.deleteCategory(id),

        // 1️⃣ Before mutation runs
        onMutate: async (id) => {
            // Cancel any ongoing fetches to avoid conflicts
            await queryClient.cancelQueries(["allCategories"]);

            // Snapshot the current data
            const previousCategories = queryClient.getQueryData(["allCategories"]);

            // Optimistically update cache
            queryClient.setQueryData(["allCategories"], (old) =>
                old?.filter((cat) => cat.id !== id)
            );

            // Return context for rollback if it fails
            return { previousCategories };
        },

        // 2️⃣ If the API fails → rollback
        onError: (err, context) => {
            queryClient.setQueryData(["allCategories"], context.previousCategories);
            toast.error(err.response?.data?.message || `Something went wrong couldn't delete this category!`);
        },

        // 3️⃣ After success or fail → refetch to ensure consistency
        onSettled: () => {
            queryClient.invalidateQueries(["allCategories"]);
        },

        onSuccess: () => {
            toast.success("Category deleted successfully!");
        }
    });
};
