import React, { useState } from "react";
import RequestsPagePresentational from "./RequestsPagePresentational";

export default function RequestsPageContainer() {
    const [statusFilter, setStatusFilter] = useState("");

    const tableColumns = [
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
                        ? "bg-green-200 text-green-700"
                        : status === "قيد الانتظار"
                            ? "bg-yellow-100 text-yellow-700"
                            : status === "قيد المراجعة"
                                ? "bg-blue-500 text-white"
                                : status === "مرفوض"
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-400 text-white"
                        }`}
                >
                    {status}
                </span>
            ),
        },
    ];

    const tableActions = [
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
        <RequestsPagePresentational
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            columns={tableColumns}
            actions={tableActions}
        />
    );
}