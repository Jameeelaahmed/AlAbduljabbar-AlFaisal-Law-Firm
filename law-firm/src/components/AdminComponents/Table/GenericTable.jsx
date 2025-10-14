import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function GenericTable({ useDataHook, columns, actions, pageSize = 5, initialPage = 1, filters = {} }) {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [lastPageReached, setLastPageReached] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();
    // Fetch data from hook
    const { data, isLoading, isError, error } = useDataHook({
        searchTerm: filters.search || "",
        branchId: filters.branch || null,
        role: filters.role || null,
        status: filters.status || null,
        pageIndex: currentPage,
        pageSize,
    });


    const items = data?.data || [];
    const currentItemCount = items.length;
    const indexOfFirstRecord = (currentPage - 1) * pageSize;
    const indexOfLastRecord = indexOfFirstRecord + currentItemCount;

    // Determine if next page exists
    const canGoNext = currentItemCount === pageSize;

    // Update lastPageReached whenever items or page change
    useEffect(() => {
        setLastPageReached(!canGoNext);
    }, [currentItemCount, pageSize]);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((p) => p - 1);
    };

    const handleNext = () => {
        if (!lastPageReached) setCurrentPage((p) => p + 1);
    };

    if (isLoading) return <div className="text-center py-10">جاري التحميل...</div>;
    if (isError) return <div className="text-center text-red-600 py-10">خطأ: {error?.message || "فشل تحميل البيانات"}</div>;

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
            <table className="min-w-full text-right">
                <thead>
                    <tr className="bg-gray-100">
                        {columns.map((col) => (
                            <th key={col.key} className="p-3 text-primary">{col.header}</th>
                        ))}
                        {actions && <th className="p-3 text-primary">الإجراءات</th>}
                    </tr>
                </thead>
                <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center p-6">
                                {t("Requests.Messages.noContent")}
                            </td>
                        </tr>
                    ) : (
                        items.map((item, idx) => (
                            <tr
                                key={item.id || idx}
                                className="border-b border-gray-300 hover:bg-gray-50 transition cursor-pointer"
                                onClick={() => navigate(`/admin/requests/${item.id}`)}
                            >
                                {columns.map((col) => (
                                    <td key={col.key} className="p-3">
                                        {col.render ? col.render(item[col.key], item) : item[col.key]}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="p-3 flex gap-2">
                                        {actions.map((action, i) => (
                                            <button
                                                key={i}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    action.onClick(item, e);
                                                }}
                                                className={`px-4 py-2 text-sm rounded-lg border hover:bg-gray-100 shadow-sm cursor-pointer ${action.className || "text-gray-500"}`}
                                            >
                                                {action.label}
                                            </button>
                                        ))}
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <div>
                    عرض {indexOfFirstRecord + 1} إلى {indexOfLastRecord} من {indexOfFirstRecord + currentItemCount} سجل
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded-lg border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                        السابق
                    </button>
                    <span className="px-3 py-1">{currentPage}</span>
                    <button
                        onClick={handleNext}
                        disabled={lastPageReached || currentItemCount === 0}
                        className="px-3 py-1 rounded-lg border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                        التالي
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GenericTable;
