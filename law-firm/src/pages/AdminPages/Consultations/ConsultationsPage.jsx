// components 
import GenericTable from "../../../components/AdminComponents/Table/GenericTable";
import Headline from "../../../components/AdminComponents/Headline/Headline";
// hooks
import { useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useConsultations } from "../../../hooks/useConsultations";


export default function ConsultationsPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState("");

    const getStatusLabel = useCallback((statusCode) => {
        switch (statusCode) {
            case 0: return t("Requests.Status.Pending");
            case 1: return t("Requests.Status.Contacted");
            case 2: return t("Requests.Status.Resolved");
            case 3: return t("Requests.Status.Rejected");
            default: return t("Requests.Status.Pending");
        }
    }, [t]);

    const getStatusStyles = useCallback((statusCode) => {
        switch (statusCode) {
            case 0: return "bg-pendingBg text-pending";
            case 1: return "bg-inProgressBg text-inProgress";
            case 2: return "bg-succeededBg text-succeeded";
            case 3: return "bg-deniedBg text-denied";
            default: return "bg-gray-400 text-white";
        }
    }, []);

    const tableColumns = useMemo(
        () => [
            {
                key: "id",
                header: t("Consultations.ConsultationID"),
            },
            {
                key: "title",
                header: t("Consultations.Title"),
            },
            {
                key: "description",
                header: t("Consultations.Description"),
                render: (description) => (
                    <span className="line-clamp-2">{description}</span>
                ),
            },
            {
                key: "userID",
                header: t("Consultations.User"),
            },
            {
                key: "consultationID",
                header: t("Consultations.Type"),
            },
            {
                key: "categoryID",
                header: t("Consultations.Category"),
            },
            {
                key: "createdAt",
                header: t("Requests.ReceivedDate"),
                render: (date) => new Date(date).toLocaleDateString("ar-SA"),
            },
            {
                key: "status",
                header: t("Requests.Status.label"),
                render: (status) => (
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(
                            status
                        )}`}
                    >
                        {getStatusLabel(status)}
                    </span>
                ),
            },
        ],
        [t]
    );

    const tableActions = useMemo(
        () => [
            {
                label: t("Consultations.ConsultationDetails"),
                onClick: (consultation) => navigate(`/admin/law-consultations/${consultation.id}`),
                className: "text-gray-500 hover:bg-gray-50",
            },
        ],
        [t, navigate]
    );
    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-50 shadow-lg">
            <Headline headlineLabel={t("Consultations.Management")} />

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                <button
                    onClick={() => setStatusFilter("")}
                    className={`px-3 py-2 sm:px-4  sm:py-2 border rounded-lg hover:bg-gray-100 cursor-pointer transition-all text-xs sm:text-sm md:text-base flex-shrink-0 ${statusFilter === ""
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
                <button
                    onClick={() => setStatusFilter("3")}
                    className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-lg hover:bg-gray-100 cursor-pointer transition-all text-xs sm:text-sm md:text-base flex-shrink-0 ${statusFilter === "3"
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-white text-primary border-gray-400 hover:border-primary"
                        }`}
                >
                    {t("Requests.Status.Rejected")}
                </button>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <GenericTable
                    useDataHook={useConsultations}
                    columns={tableColumns}
                    actions={tableActions}
                    url="/admin/law-consultations"
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
