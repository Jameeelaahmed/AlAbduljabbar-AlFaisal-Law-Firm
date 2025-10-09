// libs
import { useRequests } from "../../../hooks/useRequests";
// components
import GenericTableContainer from "../../../components/AdminComponents/Table/GenericTableContainer";
import HeadlineContainer from "../../../components/AdminComponents/Headline/HeadlineContainer";

export default function RequestsPagePresentational({
    statusFilter,
    setStatusFilter,
    columns,
    actions
}) {

    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-50 shadow-lg">
            <HeadlineContainer headlineLabel="إدارة الطلبات" />

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
                <GenericTableContainer
                    useDataHook={useRequests}
                    columns={columns}
                    actions={actions}
                    perPage={5}
                    filters={{
                        statusFilter,
                    }}
                />
            </div>
        </div>
    );
}