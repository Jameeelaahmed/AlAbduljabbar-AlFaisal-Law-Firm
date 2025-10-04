import React from 'react'

export default function TableComponentPresentational({ requests }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
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
                  className={`px-3 py-1 rounded-full text-white text-sm ${req.status === "تم الحل"
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                    }`}
                >
                  {req.status}
                </span>
              </td>
              <td className="p-3 flex gap-2">
                <button className="text-secondary px-2.5 py-1 text-sm rounded-lg border-b hover:bg-gray-100 shadow-sm cursor-pointer">
                  تحديث الحالة
                </button>
                <button className="text-secondary px-2.5 py-1 text-sm rounded-lg border-b hover:bg-gray-100 shadow-sm cursor-pointer">
                  إضافة ملاحظة
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}