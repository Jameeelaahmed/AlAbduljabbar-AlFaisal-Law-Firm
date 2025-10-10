import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as categoryApi from "../api/category";
import { toast } from "react-toastify";

// 🔹 Get All Categories
export const useAllCategories = () =>
    useQuery({
        queryKey: ["allCategories"],
        queryFn: categoryApi.getAllCategories,
    });

// 🔹 Get Category By Id
export const useCategoryById = (id) =>
    useQuery({
        queryKey: ["categoryById", id],
        queryFn: () => categoryApi.getCategoryById(id),
        enabled: !!id,
    });
// 🔹 Get For Update Category By Id
export const useGetCategoryForUpdate = (id) =>
    useQuery({
        queryKey: ["categoryById", id],
        queryFn: () => categoryApi.getCategoryForUpdate(id),
        enabled: !!id,
    });

// 🔹 Create Category
export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: categoryApi.createCategory,
        onMutate: async (newCategory) => {
            await queryClient.cancelQueries(["allCategories"]);
            const previousCategories = queryClient.getQueryData(["allCategories"]);

            queryClient.setQueryData(["allCategories"], (old = []) => [
                ...old,
                { ...newCategory, id: Date.now(), isTemp: true },
            ]);

            return { previousCategories };
        },
        onError: (err, newCategory, context) => {
            if (context?.previousCategories) {
                queryClient.setQueryData(["allCategories"], context.previousCategories);
            }
            toast.error(
                err.response?.data?.message ||
                `Something went wrong — couldn't create ${newCategory.name || "category"
                }!`
            );
        },
        onSuccess: () => {
            toast.success("✅ Category created successfully!");
        },
        onSettled: () => {
            queryClient.invalidateQueries(["allCategories"]);
        },
    });
};

// 🔹 Update Category
export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => categoryApi.updateCategory(id, data),
        onError: (err) => {
            toast.error(
                err.response?.data?.message ||
                `Something went wrong — couldn't update this category!`
            );
        },
        onSuccess: () => {
            toast.success("📝 Category updated successfully!");
            queryClient.invalidateQueries(["allCategories"]);
        },
    });
};

// 🔹 Delete Category
export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => categoryApi.deleteCategory(id),

        onMutate: async (id) => {
            await queryClient.cancelQueries(["allCategories"]);
            const previousCategories = queryClient.getQueryData(["allCategories"]);
            queryClient.setQueryData(["allCategories"], (old) =>
                old?.filter((cat) => cat.id !== id)
            );
            return { previousCategories };
        },

        onError: (err, _, context) => {
            queryClient.setQueryData(["allCategories"], context.previousCategories);
            toast.error(
                err.response?.data?.message ||
                `Something went wrong — couldn't delete this category!`
            );
        },

        onSuccess: () => {
            toast.success("🗑️ Category deleted successfully!");
        },

        onSettled: () => {
            queryClient.invalidateQueries(["allCategories"]);
        },
    });
};
