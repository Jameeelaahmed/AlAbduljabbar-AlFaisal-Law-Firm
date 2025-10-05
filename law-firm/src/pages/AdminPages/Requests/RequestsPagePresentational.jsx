import React from "react";
import GenericTableContainer from "../../../components/AdminComponents/Table/GenericTableContainer";
import { useRequests } from "../../../hooks/useRequests";

export default function RequestsPagePresentational({
    statusFilter,
    setStatusFilter,
    columns,
    actions
}) {

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