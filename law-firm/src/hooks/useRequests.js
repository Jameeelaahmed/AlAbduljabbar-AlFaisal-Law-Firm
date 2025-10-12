import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchRequests,
    getRequestById,
    createRequest,
    updateRequest,
    deleteRequest,
    getRequestForUpdate,
    updateRequestStatus,
    addRequestNote,
    getRequestTimeline,
    getRequestStats
} from "../api/requests";

import { toast } from "react-toastify";

// Hook for fetching requests list with pagination and filters
export function useRequests({ searchTerm = "", pageIndex = 1, pageSize = 5, status = null, branchId = null } = {}) {
    return useQuery({
        queryKey: ["requests", { searchTerm, pageIndex, pageSize, status, branchId }],
        queryFn: fetchRequests,
        keepPreviousData: true,
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
            toast.success("✅ Category created successfully!");
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

// Hook for updating request status
export function useUpdateRequestStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateRequestStatus,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["requests"]);
            queryClient.invalidateQueries(["request", variables.id]);
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
