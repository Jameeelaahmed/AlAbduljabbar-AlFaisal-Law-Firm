import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllUserConsultations, getConsultationById } from "../api/consultations";
import { useQueryClient } from "@tanstack/react-query";
import { rejectConsultation, contactConsultation, resolveConsultation } from "../api/consultations";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";


export function useConsultations({ pageIndex = 1, pageSize = 5 } = {}) {
    return useQuery({
        queryKey: ["consultations", { pageIndex, pageSize }],
        queryFn: getAllUserConsultations,
        keepPreviousData: true,
    });
}

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