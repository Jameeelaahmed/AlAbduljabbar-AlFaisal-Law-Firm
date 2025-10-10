import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function GenericTable({
    useDataHook,
    columns,
    actions,
    perPage = 5,
    initialPage = 1,
    filters = {},
}) {
    const [currentPage, setCurrentPage] = useState(initialPage);

    const { data, isLoading } = useDataHook({
        page: currentPage,
        perPage,
        ...filters
    });

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
    const indexOfFirstRecord = (currentPage - 1) * perPage;
    const indexOfLastRecord = indexOfFirstRecord + items.length;

    const navigate = useNavigate();


    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters.roleFilter, filters.branchFilter, filters.search]);

    if (isLoading) {
        return <div className="text-center py-10">جاري التحميل...</div>;
    }
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
            <table className="min-w-full text-right">
                <thead>
                    <tr className="bg-gray-100">
                        {columns.map((column) => (
                            <th key={column.key} className="p-3 text-primary">
                                {column.header}
                            </th>
                        ))}
                        {actions && <th className="p-3 text-primary">الإجراءات</th>}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr
                            key={item.id || index}
                            className="border-b border-gray-300 hover:bg-gray-50 transition"
                            onClick={() => navigate(`/admin/requests/${item.id}`)}
                        >
                            {columns.map((column) => (
                                <td key={column.key} className="p-3">
                                    {column.render
                                        ? column.render(item[column.key], item)
                                        : item[column.key]}
                                </td>
                            ))}
                            {actions && (
                                <td className="p-3 flex gap-2">
                                    {actions.map((action, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => action.onClick(item)}
                                            className={`px-4 py-2 text-sm rounded-lg border-b hover:bg-gray-100 shadow-sm cursor-pointer ${action.className || "text-gray-500"
                                                }`}
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Meta info */}
            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <div>
                    عرض {indexOfFirstRecord + 1} إلى {indexOfLastRecord} من{" "}
                    {meta.total_records} سجل
                </div>

                {/* Pagination */}
                <div className="flex gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded-lg border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                        السابق
                    </button>

                    {Array.from({ length: meta.total_pages }, (_, i) => i + 1).map(
                        (page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-3 py-1 rounded-lg border ${currentPage === page
                                    ? "bg-primary text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                {page}
                            </button>
                        )
                    )}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === meta.total_pages}
                        className="px-3 py-1 rounded-lg border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                        التالي
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GenericTable
