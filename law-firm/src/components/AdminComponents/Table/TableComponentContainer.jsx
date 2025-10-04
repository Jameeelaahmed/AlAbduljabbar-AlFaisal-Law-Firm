import React, { useState } from "react";
import TableComponentPresentational from "./TableComponentPresentational";
import { useRequests } from "../../../hooks/useRequests";

export default function TableComponentContainer() {
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 5;

    const { data, isLoading } = useRequests({ page: currentPage, perPage });

    const requests = data?.data || [];
    const meta = data?.meta || {
        current_page: 1,
        total_pages: 1,
        per_page: perPage,
        total_records: 0,
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= meta.total_pages) {
            setCurrentPage(page);
        }
    };

    return (
        <TableComponentPresentational
            requests={requests}
            meta={meta}
            currentPage={currentPage}
            perPage={perPage}
            handlePageChange={handlePageChange}
            loading={isLoading}
        />
    );
}
