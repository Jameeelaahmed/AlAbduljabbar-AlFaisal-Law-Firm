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
        <div className="p-6 bg-gray-50 shadow-lg">
            <HeadlineContainer headlineLabel="إدارة الطلبات" />
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

            {/* Table using GenericTableContainer */}
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
    );
}