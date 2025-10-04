import React from "react";

export default function TableComponentPresentational({
  requests,
  meta,
  currentPage,
  perPage,
  handlePageChange,
  loading,
}) {
  const indexOfFirstRecord = (currentPage - 1) * perPage;
  const indexOfLastRecord = indexOfFirstRecord + requests.length;

  if (loading) {
    return <div className="text-center py-10">جاري التحميل...</div>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
      <table className="min-w-full text-right">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-primary">رقم الطلب</th>
            <th className="p-3 text-primary">اسم العميل</th>
            <th className="p-3 text-primary">الفرع</th>
            <th className="p-3 text-primary">الحالة</th>
            <th className="p-3 text-primary">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr
              key={req.id}
              className="border-b border-gray-300 hover:bg-gray-50 transition"
            >
              <td className="p-3">{req.id}</td>
              <td className="p-3">{req.customer}</td>
              <td className="p-3">{req.branch}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${req.status === "تم الحل"
                      ? "bg-green-500 text-white dark:bg-green-700 dark:text-white"
                      : req.status === "قيد الانتظار"
                        ? "bg-yellow-500 text-white dark:bg-yellow-700 dark:text-white"
                        : req.status === "قيد المراجعة"
                          ? "bg-blue-500 text-white dark:bg-blue-700 dark:text-white"
                          : req.status === "مرفوض"
                            ? "bg-red-500 text-white dark:bg-red-700 dark:text-white"
                            : "bg-gray-400 text-white dark:bg-gray-600 dark:text-white"
                    }`}
                >
                  {req.status}
                </span>

              </td>

              <td className="p-3 flex gap-2">
                <button className="text-gray-500 px-4 py-2 text-sm rounded-lg border-b hover:bg-gray-100 shadow-sm cursor-pointer">
                  تحديث الحالة
                </button>
                <button className="text-gray-500 px-2.5 py-1 text-sm rounded-lg border-b hover:bg-gray-100 shadow-sm cursor-pointer">
                  إضافة ملاحظة
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Meta info */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <div>
          عرض {indexOfFirstRecord + 1} إلى {indexOfLastRecord} من{" "}
          {meta.total_records} سجل
        </div>

        {/* Pagination */}
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            السابق
          </button>

          {Array.from({ length: meta.total_pages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-lg border ${currentPage === page
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === meta.total_pages}
            className="px-3 py-1 rounded-lg border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  );
}
