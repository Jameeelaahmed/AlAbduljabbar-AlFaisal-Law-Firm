import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAllUserConsultations } from "../api/consultations";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import * as consultationsApi from '../api/consultations'
import { getConsultationById } from "../api/consultations";
import { rejectConsultation, contactConsultation, resolveConsultation } from "../api/consultations";


export function useConsultations({ pageIndex = 1, pageSize = 5, status = null } = {}) {
    return useQuery({
        queryKey: ["consultations", { pageIndex, pageSize, status }],
        queryFn: getAllUserConsultations,
        keepPreviousData: true,
    });
}

export const useCreateConsultationRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: consultationsApi.createConsultationRequest,

        onMutate: async (newRequest) => {
            await queryClient.cancelQueries(["consultations"]);

            const previousRequests = queryClient.getQueryData(["consultations"]);
            queryClient.setQueryData(["consultations"], (old = []) => [
                ...old,
                { ...newRequest, id: Date.now(), isPending: true },
            ]);

            return { previousRequests };
        },

        onError: (error, newRequest, context) => {
            if (context?.previousRequests) {
                queryClient.setQueryData(["consultations"], context.previousRequests);
            }
            console.error("Error creating consultation:", error);
        },

        onSuccess: () => {
            queryClient.invalidateQueries(["consultations"]);
            toast.success("Consultation Request Sent Successfully")
        },

        onSettled: () => {
            queryClient.invalidateQueries(["consultations"]);
        },
    });
};

// **** CONSULTATION TYPES ****
export const useCreateConsultationType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: consultationsApi.createConsutationsTypes,
        onMutate: async (newConsultationType) => {
            await queryClient.cancelQueries(["allConsultationsTypes"]);
            const previousConsultationTypes = queryClient.getQueryData(["allConsultationsTypes"]);

            queryClient.setQueryData(["allConsultationsTypes"], (old = []) => [
                ...old,
                { ...newConsultationType, id: Date.now(), isTemp: true },
            ]);

            return { previousConsultationTypes };
        },
        onError: (err, newConsultationType, context) => {
            if (context?.previousConsultationTypes) {
                queryClient.setQueryData(["allConsultationsTypes"], context.previousConsultationTypes);
            }
            toast.error(
                err.response?.data?.message ||
                `Something went wrong — couldn't create ${newConsultationType.name || "category"
                }!`
            );
        },
        onSuccess: () => {
            toast.success("✅ Consultation Type created successfully!");
        },
        onSettled: () => {
            queryClient.invalidateQueries(["allConsultationsTypes"]);
        },
    });
};

export const useUpdateConsultaionType = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => consultationsApi.updateConsutationsTypes(id, data),
        onError: (err) => {
            toast.error(
                err.response?.data?.message ||
                `Something went wrong — couldn't update this consultation type!`
            );
        },
        onSuccess: () => {
            toast.success("📝 Consultation Type updated successfully!");
            queryClient.invalidateQueries(["allConsultationsTypes"]);
        },
    });
};

export const useGetConsultationTypeForUpdate = (id) => {
    const { i18n } = useTranslation() // read language at render time
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'
    return useQuery({
        queryKey: ["consultationTypeById", id, currentLang],
        queryFn: () => consultationsApi.getForUpdateConsutationsTypes(id),
        enabled: !!id,
    });
}

export const useGetAllConsultationTypes = () => {
    const { i18n } = useTranslation() // read language at render time
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'
    return useQuery({
        queryKey: ["allConsultationsTypes", currentLang],
        queryFn: consultationsApi.getAllConsutationsTypes,
    });
}

export const useDeleteConsultationTypes = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => consultationsApi.deleteConsutationsTypes(id),

        onMutate: async (id) => {
            await queryClient.cancelQueries(["allConsultationsTypes"]);
            const previousConsultationTypes = queryClient.getQueryData(["allConsultationsTypes"]);
            queryClient.setQueryData(["allConsultationsTypes"], (old) =>
                old?.filter((cat) => cat.id !== id)
            );
            return { previousConsultationTypes };
        },

        onError: (err, _, context) => {
            queryClient.setQueryData(["allConsultationsTypes"], context.previousConsultationTypes);
            toast.error(
                err.response?.data?.message ||
                `Something went wrong — couldn't delete this consultation types!`
            );
        },

        onSuccess: () => {
            toast.success("🗑️ Consultation Types deleted successfully!");
        },

        onSettled: () => {
            queryClient.invalidateQueries(["allConsultationsTypes"]);
        },
    });
};

export function useConsultation(consultationId) {
    return useQuery({
        queryKey: ["consultation", consultationId],
        queryFn: () => getConsultationById(consultationId),
        enabled: !!consultationId,
    });
}

export function useRejectConsultation() {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: rejectConsultation,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["requests"]);
            queryClient.invalidateQueries(["request", variables]);
            toast.success(t("Consultations.Messages.requestRejectedSuccess"));
        },
    });
}

// Hook for resolving a request
export function useResolveConsultation() {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: resolveConsultation,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["requests"]);
            queryClient.invalidateQueries(["request", variables]);
            toast.success(t("Consultations.Messages.requestResolvedSuccess"));
        },
    });
}

// Hook for marking a request as contacted
export function useContactConsultation() {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: contactConsultation,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["requests"]);
            queryClient.invalidateQueries(["request", variables]);
            toast.success(t("Consultations.Messages.requestContactedSuccess"));
        },
    });
}