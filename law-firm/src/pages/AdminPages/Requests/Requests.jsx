// hooks
import { useRequests } from "../../../hooks/useRequests";
// libs
import { useState } from 'react';
// components
import GenericTable from '../../../components/AdminComponents/Table/GenericTable';
import Headline from "../../../components/AdminComponents/Headline/Headline";
function Requests() {
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
                        ? "bg-succeededBg text-succeeded"
                        : status === "قيد الانتظار"
                            ? "bg-pendingBg text-pending"
                            : status === "قيد المراجعة"
                                ? "bg-inProgressBg text-inProgress"
                                : status === "مرفوض"
                                    ? "bg-deniedBg text-denied"
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
        <div className="min-h-screen p-4 sm:p-6 bg-gray-50 shadow-lg">
            <Headline headlineLabel="إدارة الطلبات" />

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                <button
                    onClick={() => setStatusFilter("")}
                    className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-lg hover:bg-gray-100 cursor-pointer transition-all text-xs sm:text-sm md:text-base flex-shrink-0 ${statusFilter === ""
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-white text-primary border-gray-400 hover:border-primary"
                        }`}
                >
                    الكل
                </button>
                <button
                    onClick={() => setStatusFilter("قيد الانتظار")}
                    className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-lg hover:bg-gray-100 cursor-pointer transition-all text-xs sm:text-sm md:text-base flex-shrink-0 ${statusFilter === "قيد الانتظار"
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-white text-primary border-gray-400 hover:border-primary"
                        }`}
                >
                    قيد الانتظار
                </button>
                <button
                    onClick={() => setStatusFilter("تم الحل")}
                    className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-lg hover:bg-gray-100 cursor-pointer transition-all text-xs sm:text-sm md:text-base flex-shrink-0 ${statusFilter === "تم الحل"
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-white text-primary border-gray-400 hover:border-primary"
                        }`}
                >
                    تم الحل
                </button>
                <button
                    onClick={() => setStatusFilter("قيد المراجعة")}
                    className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-lg hover:bg-gray-100 cursor-pointer transition-all text-xs sm:text-sm md:text-base flex-shrink-0 ${statusFilter === "قيد المراجعة"
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-white text-primary border-gray-400 hover:border-primary"
                        }`}
                >
                    قيد المراجعة
                </button>
            </div>

            {/* Table using GenericTableContainer */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <GenericTable
                    useDataHook={useRequests}
                    columns={tableColumns}
                    actions={tableActions}
                    perPage={5}
                    filters={{
                        statusFilter,
                    }}
                />
            </div>
        </div>
    )
}

export default Requests
