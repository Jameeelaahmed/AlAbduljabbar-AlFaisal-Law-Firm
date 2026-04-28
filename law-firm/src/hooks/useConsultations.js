import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import * as consultationsApi from '../api/consultations'
import { getErrorMessage } from "../api/apiError";


export function useConsultations({ pageIndex = 1, pageSize = 5, status = null } = {}) {
    return useQuery({
        queryKey: ["consultations", { pageIndex, pageSize, status }],
        queryFn: consultationsApi.getAllUserConsultations,
        keepPreviousData: true,
    });
}

export const useCreateConsultationRequest = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

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
            toast.error(getErrorMessage(error, t("Consultations.CreateError")));
            console.error("Error creating consultation:", error);
        },

        onSuccess: () => {
            queryClient.invalidateQueries(["consultations"]);
            toast.success(t("Consultations.CreateSuccess"));
        },

        onSettled: () => {
            queryClient.invalidateQueries(["consultations"]);
        },
    });
};

// **** CONSULTATION TYPES ****
export const useCreateConsultationType = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

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
            toast.error(getErrorMessage(err, t("Consultations.Types.CreateError")));
        },
        onSuccess: () => {
            toast.success(t("Consultations.Types.CreateSuccess"));
        },
        onSettled: () => {
            queryClient.invalidateQueries(["allConsultationsTypes"]);
        },
    });
};

export const useUpdateConsultaionType = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: ({ id, data }) => consultationsApi.updateConsutationsTypes(id, data),
        onError: (err) => {
            toast.error(getErrorMessage(err, t("Consultations.Types.UpdateError")));
        },
        onSuccess: () => {
            toast.success(t("Consultations.Types.UpdateSuccess"));
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
    const { t } = useTranslation();

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
            toast.error(getErrorMessage(err, t("Consultations.Types.DeleteError")));
        },

        onSuccess: () => {
            toast.success(t("Consultations.Types.DeleteSuccess"));
        },

        onSettled: () => {
            queryClient.invalidateQueries(["allConsultationsTypes"]);
        },
    });
};

export function useConsultation(consultationId) {
    return useQuery({
        queryKey: ["consultation", consultationId],
        queryFn: () => consultationsApi.getConsultationById(consultationId),
        enabled: !!consultationId,
    });
}

export function useRejectConsultation() {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: consultationsApi.rejectConsultation,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["requests"]);
            queryClient.invalidateQueries(["request", variables]);
            toast.success(t("Consultations.Messages.requestRejectedSuccess"));
        },
        onError: (err) => {
            toast.error(getErrorMessage(err, t("Consultations.Messages.requestRejectedError")));
        },
    });
}

// Hook for resolving a request
export function useResolveConsultation() {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: consultationsApi.resolveConsultation,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["requests"]);
            queryClient.invalidateQueries(["request", variables]);
            toast.success(t("Consultations.Messages.requestResolvedSuccess"));
        },
        onError: (err) => {
            toast.error(getErrorMessage(err, t("Consultations.Messages.requestResolvedError")));
        },
    });
}

// Hook for marking a request as contacted
export function useContactConsultation() {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: consultationsApi.contactConsultation,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["requests"]);
            queryClient.invalidateQueries(["request", variables]);
            toast.success(t("Consultations.Messages.requestContactedSuccess"));
        },
        onError: (err) => {
            toast.error(getErrorMessage(err, t("Consultations.Messages.requestContactedError")));
        },
    });
}