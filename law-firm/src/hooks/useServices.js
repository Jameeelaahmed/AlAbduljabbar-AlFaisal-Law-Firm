import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as serviceApi from "../api/services";
import { toast } from "react-toastify";

import { useTranslation } from "react-i18next";

// 🔹 Get All Services
export const useAllServices = () => {
    const { i18n } = useTranslation() // read language at render time
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'
    return useQuery({
        queryKey: ["allServices", currentLang],
        queryFn: serviceApi.getAllServices,
    });
}

// 🔹 Get Service By Id
export const useServiceById = (id) => {
    const { i18n } = useTranslation() // read language at render time
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'

    return useQuery({
        queryKey: ["ServiceById", id, currentLang],
        queryFn: () => serviceApi.getServiceById(id),
        enabled: !!id,
        retry: 3
    });
}
// 🔹 Get For Update Service By Id
export const useGetServiceForUpdate = (id) => {
    const { i18n } = useTranslation() // read language at render time
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'
    return useQuery({
        queryKey: ["serviceById", id, currentLang],
        queryFn: () => serviceApi.getServiceForUpdate(id),
        enabled: !!id,
    });
}

// Get Service By Category Id 

export const useGetServicesByCategoryId = (id) => {

    const { i18n } = useTranslation() // read language at render time
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'
    return useQuery({
        queryKey: ["serviceByCategoryId", id, currentLang],
        queryFn: () => serviceApi.getServiceByCategoryId(id),
        enabled: !!id,
    });
}

// 🔹 Create Service
export const useCreateService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: serviceApi.createService,
        onMutate: async (newService) => {
            await queryClient.cancelQueries(["allServices"]);
            const previousServices = queryClient.getQueryData(["allServices"]);

            queryClient.setQueryData(["allServices"], (old = []) => [
                ...old,
                { ...newService, id: Date.now(), isTemp: true },
            ]);

            return { previousServices };
        },
        onError: (err, newService, context) => {
            if (context?.previousServices) {
                queryClient.setQueryData(["allServices"], context.previousServices);
            }
            toast.error(
                err.response?.data?.message ||
                `Something went wrong — couldn't create ${newService.name || "service"
                }!`
            );
        },
        onSuccess: () => {
            toast.success("✅ Service created successfully!");
        },
        onSettled: () => {
            queryClient.invalidateQueries(["allServices"]);
        },
    });
};

// 🔹 Update Service
export const useUpdateService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => serviceApi.updateService(id, data),
        onError: (err) => {
            toast.error(
                err.response?.data?.message ||
                `Something went wrong — couldn't update this service!`
            );
        },
        onSuccess: () => {
            toast.success("📝 Service updated successfully!");
            queryClient.invalidateQueries(["allServices"]);
        },
    });
};

// 🔹 Delete Category
export const useDeleteService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => serviceApi.deleteService(id),

        onMutate: async (id) => {
            await queryClient.cancelQueries(["allServices"]);
            const previousServices = queryClient.getQueryData(["allServices"]);
            queryClient.setQueryData(["allServices"], (old) =>
                old?.filter((service) => service.id !== id)
            );
            return { previousServices };
        },

        onError: (err, _, context) => {
            queryClient.setQueryData(["allServices"], context.previousServices);
            toast.error(
                err.response?.data?.message ||
                `Something went wrong — couldn't delete this service!`
            );
        },

        onSuccess: () => {
            toast.success("🗑️ Service deleted successfully!");
        },

        onSettled: () => {
            queryClient.invalidateQueries(["allServices"]);
        },
    });
};
