import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as categoryApi from "../api/category";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
// 🔹 Get All Categories
export const useAllCategories = () => {
    const { i18n } = useTranslation() // read language at render time
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'
    return useQuery({
        queryKey: ["allCategories", currentLang],
        queryFn: categoryApi.getAllCategories,
    });
}

// 🔹 Get Category By Id
export const useCategoryById = (id) => {
    const { i18n } = useTranslation() // read language at render time
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'
    return useQuery({
        queryKey: ["categoryById", id, currentLang],
        queryFn: () => categoryApi.getCategoryById(id),
        enabled: !!id,
    });
}

// 🔹 Get For Update Category By Id
export const useGetCategoryForUpdate = (id) => {
    const { i18n } = useTranslation() // read language at render time
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'
    return useQuery({
        queryKey: ["categoryById", id, currentLang],
        queryFn: () => categoryApi.getCategoryForUpdate(id),
        enabled: !!id,
    });
}

// 🔹 Get Category By branchId

export const useGetCategoryByBranchId = (branchId, options = {}) => {
    const { i18n } = useTranslation() // read language at render time
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'
    return useQuery({
        queryKey: ["categoriesByBranch", branchId, currentLang],
        queryFn: () => categoryApi.getCategoryByBranchId(branchId),
        enabled: !!branchId,
        keepPreviousData: true,
        staleTime: 1000 * 60 * 2, // 2 minutes (adjust as needed)
        ...options,
    });
}

// 🔹 Create Category
export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

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
        onError: (_err, _newCategory, context) => {
            if (context?.previousCategories) {
                queryClient.setQueryData(["allCategories"], context.previousCategories);
            }
            toast.error(t("Categories.CreateError"));
        },
        onSuccess: () => {
            toast.success(t("Categories.CreateSuccess"));
        },
        onSettled: () => {
            queryClient.invalidateQueries(["allCategories"]);
        },
    });
};

// 🔹 Update Category
export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: ({ id, data }) => categoryApi.updateCategory(id, data),
        onError: () => {
            toast.error(t("Categories.UpdateError"));
        },
        onSuccess: () => {
            toast.success(t("Categories.UpdateSuccess"));
            queryClient.invalidateQueries(["allCategories"]);
        },
    });
};

// 🔹 Delete Category
export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

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

        onError: (_err, _id, context) => {
            if (context?.previousCategories) {
                queryClient.setQueryData(["allCategories"], context.previousCategories);
            }
            toast.error(t("Categories.DeleteError"));
        },

        onSuccess: () => {
            toast.success(t("Categories.DeleteSuccess"));
        },

        onSettled: () => {
            queryClient.invalidateQueries(["allCategories"]);
        },
    });
};
