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
    fetchRequestsByBranch
} from "../api/requests";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-toastify";

// Hook for fetching requests list with pagination and filters
export function useRequests({ pageIndex = 1, pageSize = 5, status = null } = {}) {
    return useQuery({
        queryKey: ["requests", { pageIndex, pageSize, status }],
        queryFn: fetchRequests,
        keepPreviousData: true,
    });
}
export function useRequestsByBranch({ pageIndex = 1, pageSize = 5, status = null } = {}) {
    return useQuery({
        queryKey: ["requests", { pageIndex, pageSize, status }],
        queryFn: fetchRequestsByBranch,
        keepPreviousData: true,
    });
}
export function useRequestsByRole({ pageIndex = 1, pageSize = 5, status = null } = {}) {
    const { user } = useAuthStore();
    const isCustomerService = user?.lastRole === "CustomerService";

    if (isCustomerService) {
        return useRequestsByBranch({
            pageIndex,
            pageSize,
            status,
            branchId: user?.branchId,
        });
    }

    return useRequests({
        pageIndex,
        pageSize,
        status,
    });
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

    return useMutation({
        mutationFn: createRequest,
        onSuccess: () => {
            queryClient.invalidateQueries(["requests"]);
            toast.success("✅ Request created successfully!");
        },
    });
}

// Hook for updating a request
export function useUpdateRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateRequest,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["requests"]);
            queryClient.invalidateQueries(["request", variables.id]);
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

    return useMutation({
        mutationFn: deleteRequest,
        onSuccess: () => {
            queryClient.invalidateQueries(["requests"]);
        },
    });
}

// Hook for rejecting a request
export function useRejectRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: rejectRequest,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["requests"]);
            queryClient.invalidateQueries(["request", variables]);
            toast.success("Request rejected successfully");
        },
    });
}

// Hook for resolving a request
export function useResolveRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: resolveRequest,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["requests"]);
            queryClient.invalidateQueries(["request", variables]);
            toast.success("Request resolved successfully");
        },
    });
}

// Hook for marking a request as contacted
export function useContactRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: contactRequest,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["requests"]);
            queryClient.invalidateQueries(["request", variables]);
            toast.success("Request marked as contacted");
        },
    });
}

// Hook for adding notes to a request
export function useAddRequestNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addRequestNote,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["request", variables.requestId]);
            queryClient.invalidateQueries(["request", variables.requestId, "timeline"]);
        },
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
