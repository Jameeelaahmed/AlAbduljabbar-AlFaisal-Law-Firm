import React, { useState } from "react";
import GenericTablePresentational from "./GenericTablePresentational";

export default function GenericTableContainer({
    useDataHook,
    columns,
    actions,
    perPage = 5,
    initialPage = 1,
}) {
    const [currentPage, setCurrentPage] = useState(initialPage);

    const { data, isLoading } = useDataHook({ page: currentPage, perPage });

    const items = data?.data || [];
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
        <GenericTablePresentational
            items={items}
            columns={columns}
            actions={actions}
            meta={meta}
            currentPage={currentPage}
            perPage={perPage}
            handlePageChange={handlePageChange}
            loading={isLoading}
        />
    );
}