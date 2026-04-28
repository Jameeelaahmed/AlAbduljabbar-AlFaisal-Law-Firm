import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchRequests,
    getRequestById,
    createRequest,
    updateRequest,
    deleteRequest,
    getRequestForUpdate,
    rejectRequest,
    resolveRequest,
    contactRequest,
    addRequestNote,
    getRequestTimeline,
    getRequestStats,
    fetchRequestsByBranch,
    fetchRequestsByUserId,
    getALLNotes
} from "../api/requests";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "../api/apiError";

// Hook for fetching requests list with pagination and filters
export function useRequests({ pageIndex = 1, pageSize = 5, status = null, enabled = true } = {}) {
    return useQuery({
        queryKey: ["requests", { pageIndex, pageSize, status }],
        queryFn: fetchRequests,
        keepPreviousData: true,
        enabled,
    });
}
export function useRequestsByUserId({ userId = null, pageIndex = 1, pageSize = 5, enabled = true } = {}) {
    return useQuery({
        queryKey: ["requests", { userId, pageIndex, pageSize }],
        queryFn: fetchRequestsByUserId,
        keepPreviousData: true,
        enabled: enabled && !!userId,
    });
}
export function useRequestsByBranch({ pageIndex = 1, pageSize = 5, status = null, branchId = null, enabled = true } = {}) {
    return useQuery({
        queryKey: ["requests", { pageIndex, pageSize, status, branchId }],
        queryFn: fetchRequestsByBranch,
        keepPreviousData: true,
        enabled: enabled && !!branchId,
    });
}
export function useRequestsByRole({ pageIndex = 1, pageSize = 5, status = null } = {}) {
    const { user } = useAuthStore();
    const isCustomerService = user?.lastRole === "CustomerService";

    const branchQuery = useRequestsByBranch({
        pageIndex,
        pageSize,
        status,
        branchId: user?.branchId,
        enabled: isCustomerService,
    });

    const allQuery = useRequests({
        pageIndex,
        pageSize,
        status,
        enabled: !isCustomerService,
    });

    return isCustomerService ? branchQuery : allQuery;
}

// Hook for fetching a single request's details
export function useRequest(requestId) {
    return useQuery({
        queryKey: ["request", requestId],
        queryFn: () => getRequestById(requestId),
        enabled: !!requestId,
    });
}

// Hook for creating a new request
export function useCreateRequest() {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: createRequest,
        onSuccess: () => {
            queryClient.invalidateQueries(["requests"]);
            toast.success(t("Requests.CreateSuccess"));
        },
        onError: (err) => {
            toast.error(getErrorMessage(err, t("Requests.CreateError")));
        },
    });
}

// Hook for updating a request
export function useUpdateRequest() {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: updateRequest,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["requests"]);
            queryClient.invalidateQueries(["request", variables.id]);
            toast.success(t("Requests.UpdateSuccess"));
        },
        onError: (err) => {
            toast.error(getErrorMessage(err, t("Requests.UpdateError")));
        },
    });
}

// Hook for getting request data for update form
export function useGetRequestForUpdate(requestId) {
    return useQuery({
        queryKey: ["request", requestId, "update"],
        queryFn: () => getRequestForUpdate(requestId),
        enabled: !!requestId,
    });
}

// Hook for deleting a request
export function useDeleteRequest() {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: deleteRequest,
        onSuccess: () => {
            queryClient.invalidateQueries(["requests"]);
            toast.success(t("Requests.DeleteSuccess"));
        },
        onError: (err) => {
            toast.error(getErrorMessage(err, t("Requests.DeleteError")));
        },
    });
}

// Hook for rejecting a request
export function useRejectRequest() {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: rejectRequest,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["requests"]);
            queryClient.invalidateQueries(["request", variables]);
            toast.success(t("Requests.Messages.requestRejectedSuccess"));
        },
        onError: (err) => {
            toast.error(getErrorMessage(err, t("Requests.Messages.requestRejectedError")));
        },
    });
}

// Hook for resolving a request
export function useResolveRequest() {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: resolveRequest,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["requests"]);
            queryClient.invalidateQueries(["request", variables]);
            toast.success(t("Requests.Messages.requestResolvedSuccess"));
        },
        onError: (err) => {
            toast.error(getErrorMessage(err, t("Requests.Messages.requestResolvedError")));
        },
    });
}

// Hook for marking a request as contacted
export function useContactRequest() {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: contactRequest,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["requests"]);
            queryClient.invalidateQueries(["request", variables]);
            toast.success(t("Requests.Messages.requestContactedSuccess"));
        },
        onError: (err) => {
            toast.error(getErrorMessage(err, t("Requests.Messages.requestContactedError")));
        },
    });
}

// Hook for adding notes to a request
export function useAddRequestNote() {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: addRequestNote,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["request", variables.requestId]);
            queryClient.invalidateQueries(["request", variables.requestId, "timeline"]);
            toast.success(t("Requests.NoteAddedSuccess"));
        },
        onError: (err) => {
            toast.error(getErrorMessage(err, t("Requests.NoteAddedError")));
        },
    });
}

export function useNotes(requestId, consultationId) {
    return useQuery({
        queryKey: ["notes", { requestId, consultationId, pageIndex: 1, pageSize: 5 }],
        queryFn: getALLNotes,
        enabled: !!requestId,
    });
}

// Hook for fetching request timeline
export function useRequestTimeline(requestId) {
    return useQuery({
        queryKey: ["request", requestId, "timeline"],
        queryFn: () => getRequestTimeline(requestId),
        enabled: !!requestId,
    });
}

// Hook for fetching request statistics
export function useRequestStats(params) {
    return useQuery({
        queryKey: ["requests", "stats", params],
        queryFn: () => getRequestStats(params),
    });
}
