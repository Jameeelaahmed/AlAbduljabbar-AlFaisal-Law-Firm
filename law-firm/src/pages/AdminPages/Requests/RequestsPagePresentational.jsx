import TableComponentContainer from "../../../components/AdminComponents/Table/TableComponentContainer";
export default function RequestsPagePresentational({ requests }) {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-primary text-2xl font-bold mb-4">
                إدارة الطلبات
            </h1>

            {/* Filter buttons */}
            <div className="flex gap-2 mb-4">
                <button
                    className="px-4 py-2 border border-gray-400 rounded-lg bg-white text-primary hover:bg-gray-100 cursor-pointer"
                >
                    الكل
                </button>
                <button
                    className="px-4 py-2 border border-gray-400 rounded-lg bg-white text-primary hover:bg-gray-100 cursor-pointer"
                >
                    قيد الانتظار
                </button>
                <button
                    className="px-4 py-2 border border-gray-400 rounded-lg bg-white text-primary hover:bg-gray-100 cursor-pointer"
                >
                    تم الحل
                </button>
            </div>

            {/* Table */}
            <TableComponentContainer requests={requests} />
        </div>
    );
}
