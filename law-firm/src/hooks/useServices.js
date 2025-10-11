import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as serviceApi from "../api/services";
import { toast } from "react-toastify";

// 🔹 Get All Services
export const useAllServices = () =>
    useQuery({
        queryKey: ["allServices"],
        queryFn: serviceApi.getAllServices,
    });

// 🔹 Get Service By Id
export const useServiceById = (id) =>
    useQuery({
        queryKey: ["ServiceById", id],
        queryFn: () => serviceApi.getServiceById(id),
        enabled: !!id,
    });
// 🔹 Get For Update Service By Id
export const useGetServiceForUpdate = (id) =>
    useQuery({
        queryKey: ["serviceById", id],
        queryFn: () => serviceApi.getServiceForUpdate(id),
        enabled: !!id,
    });

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
export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => serviceApi.deleteCategory(id),

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
