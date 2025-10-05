// ========================================
// 1. RequestsPageContainer.jsx
// ========================================
import React, { useState } from "react";
import RequestsPagePresentational from "./RequestsPagePresentational";
import { useRequests } from "../../../hooks/useRequests";

export default function RequestsPageContainer() {
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("");
    const perPage = 5;

    const { data, isLoading } = useRequests({ page: currentPage, perPage });

    const requests = data?.data || [];
    const meta = data?.meta || {
        current_page: 1,
        total_pages: 1,
        per_page: perPage,
        total_records: 0,
    };

    // Filter requests by status
    const filteredRequests = statusFilter
        ? requests.filter((req) => req.status === statusFilter)
        : requests;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= meta.total_pages) {
            setCurrentPage(page);
        }
    };

    return (
        <RequestsPagePresentational
            requests={filteredRequests}
            meta={meta}
            currentPage={currentPage}
            perPage={perPage}
            handlePageChange={handlePageChange}
            isLoading={isLoading}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
        />
    );
}