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
            case 0: return t("Requests.Status.Pending");
            case 1: return t("Requests.Status.Contacted");
            case 2: return t("Requests.Status.Resolved");
            case 3: return t("Requests.Status.Rejected");
            default: return t("Requests.Status.Pending");
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
            header: t("Requests.RequestID"),
        },
        {
            key: "title",
            header: t("Requests.Title"),
        },
        {
            key: "description",
            header: t("Requests.Description"),
            render: (description) => (
                <span className="line-clamp-2">{description}</span>
            ),
        },
        {
            key: "createdAt",
            header: t("Requests.ReceivedDate"),
            render: (date) => new Date(date).toLocaleDateString('ar-SA'),
        },
        {
            key: "status",
            header: t("Requests.Status.label"),
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
            label: t("Requests.RequestDetails"),
            onClick: (request) => {
                navigate(`/admin/requests/${request.id}`)
            },
            className: "text-gray-500 hover:bg-gray-50",
        },
    ];

    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-50 shadow-lg">
            <Headline headlineLabel={t("Requests.Management")} />

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                <button
                    onClick={() => setStatusFilter("")}
                    className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-lg hover:bg-gray-100 cursor-pointer transition-all text-xs sm:text-sm md:text-base flex-shrink-0 ${statusFilter === ""
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-white text-primary border-gray-400 hover:border-primary"
                        }`}
                >
                    {t("Requests.Filters.all")}
                </button>
                <button
                    onClick={() => setStatusFilter("0")}
                    className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-lg hover:bg-gray-100 cursor-pointer transition-all text-xs sm:text-sm md:text-base flex-shrink-0 ${statusFilter === "0"
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-white text-primary border-gray-400 hover:border-primary"
                        }`}
                >
                    {t("Requests.Status.Pending")}
                </button>
                <button
                    onClick={() => setStatusFilter("2")}
                    className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-lg hover:bg-gray-100 cursor-pointer transition-all text-xs sm:text-sm md:text-base flex-shrink-0 ${statusFilter === "2"
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-white text-primary border-gray-400 hover:border-primary"
                        }`}
                >
                    {t("Requests.Status.Resolved")}
                </button>
                <button
                    onClick={() => setStatusFilter("1")}
                    className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-lg hover:bg-gray-100 cursor-pointer transition-all text-xs sm:text-sm md:text-base flex-shrink-0 ${statusFilter === "1"
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-white text-primary border-gray-400 hover:border-primary"
                        }`}
                >
                    {t("Requests.Status.Contacted")}
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
