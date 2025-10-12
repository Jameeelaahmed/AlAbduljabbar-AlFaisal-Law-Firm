// hooks
import { useRequests } from "../../../hooks/useRequests";
// libs
import { useState } from 'react';
// components
import GenericTable from '../../../components/AdminComponents/Table/GenericTable';
import Headline from "../../../components/AdminComponents/Headline/Headline";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
function Requests() {
    const { t } = useTranslation();
    const navigate = useNavigate()
    const [statusFilter, setStatusFilter] = useState("");

    const getStatusLabel = (statusCode) => {
        switch (statusCode) {
            case 0: return "قيد الانتظار";
            case 1: return "قيد المراجعة";
            case 2: return "تم الحل";
            case 3: return "مرفوض";
            default: return "غير معروف";
        }
    };

    const getStatusStyles = (statusCode) => {
        switch (statusCode) {
            case 0: return "bg-pendingBg text-pending";
            case 1: return "bg-inProgressBg text-inProgress";
            case 2: return "bg-succeededBg text-succeeded";
            case 3: return "bg-deniedBg text-denied";
            default: return "bg-gray-400 text-white";
        }
    };

    const tableColumns = [
        {
            key: "id",
            header: "رقم الطلب",
        },
        {
            key: "title",
            header: "العنوان",
        },
        {
            key: "description",
            header: "الوصف",
            render: (description) => (
                <span className="line-clamp-2">{description}</span>
            ),
        },
        {
            key: "createdAt",
            header: "تاريخ الإنشاء",
            render: (date) => new Date(date).toLocaleDateString('ar-SA'),
        },
        {
            key: "status",
            header: "الحالة",
            render: (status) => (
                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(status)}`}
                >
                    {getStatusLabel(status)}
                </span>
            ),
        },
    ];

    const tableActions = [
        {
            label: t("Requests.Request Details"),
            onClick: (request) => {
                navigate(`/admin/requests/${request.id}`)
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
                    onClick={() => setStatusFilter("0")}
                    className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-lg hover:bg-gray-100 cursor-pointer transition-all text-xs sm:text-sm md:text-base flex-shrink-0 ${statusFilter === "0"
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-white text-primary border-gray-400 hover:border-primary"
                        }`}
                >
                    قيد الانتظار
                </button>
                <button
                    onClick={() => setStatusFilter("2")}
                    className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-lg hover:bg-gray-100 cursor-pointer transition-all text-xs sm:text-sm md:text-base flex-shrink-0 ${statusFilter === "2"
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-white text-primary border-gray-400 hover:border-primary"
                        }`}
                >
                    تم الحل
                </button>
                <button
                    onClick={() => setStatusFilter("1")}
                    className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-lg hover:bg-gray-100 cursor-pointer transition-all text-xs sm:text-sm md:text-base flex-shrink-0 ${statusFilter === "1"
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-white text-primary border-gray-400 hover:border-primary"
                        }`}
                >
                    قيد المراجعة
                </button>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <GenericTable
                    useDataHook={useRequests}
                    columns={tableColumns}
                    actions={tableActions}
                    pageSize={5}
                    initialPage={1}
                    filters={{
                        status: statusFilter || null
                    }}
                />
            </div>
        </div>
    )
}

export default Requests
