import React from "react";
import GenericTablePresentational from "../../../components/AdminComponents/Table/GenericTablePresentational";

export default function RequestsPagePresentational({
    requests,
    meta,
    currentPage,
    perPage,
    handlePageChange,
    isLoading,
    statusFilter,
    setStatusFilter,
}) {
    // Define columns for requests table
    const columns = [
        {
            key: "id",
            header: "رقم الطلب",
        },
        {
            key: "customer",
            header: "اسم العميل",
        },
        {
            key: "branch",
            header: "الفرع",
        },
        {
            key: "status",
            header: "الحالة",
            render: (status) => (
                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${status === "تم الحل"
                        ? "bg-green-200 text-green-700 "
                        : status === "قيد الانتظار"
                            ? "bg-yellow-100 text-yellow-700 d"
                            : status === "قيد المراجعة"
                                ? "bg-blue-500 text-white"
                                : status === "مرفوض"
                                    ? "bg-red-500 text-whit"
                                    : "bg-gray-400 text-white"
                        }`}
                >
                    {status}
                </span>
            ),
        },
    ];

    // Define actions for requests table
    const actions = [
        {
            label: "تحديث الحالة",
            onClick: (request) => {
                console.log("Update status for:", request);
                // Add your status update logic here
            },
            className: "text-gray-500 hover:bg-gray-50",
        },
        {
            label: "إضافة ملاحظة",
            onClick: (request) => {
                console.log("Add note for:", request);
                // Add your note logic here
            },
            className: "text-gray-500 hover:bg-gray-50",
        },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-primary text-2xl font-bold mb-4">إدارة الطلبات</h1>

            {/* Filter buttons */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setStatusFilter("")}
                    className={`px-4 py-2 border rounded-lg hover:bg-gray-100 cursor-pointer ${statusFilter === ""
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-primary border-gray-400"
                        }`}
                >
                    الكل
                </button>
                <button
                    onClick={() => setStatusFilter("قيد الانتظار")}
                    className={`px-4 py-2 border rounded-lg hover:bg-gray-100 cursor-pointer ${statusFilter === "قيد الانتظار"
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-primary border-gray-400"
                        }`}
                >
                    قيد الانتظار
                </button>
                <button
                    onClick={() => setStatusFilter("تم الحل")}
                    className={`px-4 py-2 border rounded-lg hover:bg-gray-100 cursor-pointer ${statusFilter === "تم الحل"
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-primary border-gray-400"
                        }`}
                >
                    تم الحل
                </button>
                <button
                    onClick={() => setStatusFilter("قيد المراجعة")}
                    className={`px-4 py-2 border rounded-lg hover:bg-gray-100 cursor-pointer ${statusFilter === "قيد المراجعة"
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-primary border-gray-400"
                        }`}
                >
                    قيد المراجعة
                </button>
            </div>

            {/* Table using Generic Component */}
            <GenericTablePresentational
                items={requests}
                columns={columns}
                actions={actions}
                meta={meta}
                currentPage={currentPage}
                perPage={perPage}
                handlePageChange={handlePageChange}
                loading={isLoading}
            />
        </div>
    );
}