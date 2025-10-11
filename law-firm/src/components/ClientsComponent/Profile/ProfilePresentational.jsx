import React from 'react'

export default function ProfilePresentational({ user = null }) {
  // Fallback mock user if no prop provided
  const u = user || {
    id: 'C-1001',
    name: 'سارة الموسى',
    email: 'sarah@example.com',
    phone: '+966 5X XXX XXXX',
    city: 'الرياض',
    joined: '2023-09-01',
    avatarUrl: null,
    requests: [
      { id: 'REQ-101', title: 'مراجعة عقد بيع', date: '2024-01-15', status: 'مكتمل' },
      { id: 'REQ-154', title: 'صياغة توكيل رسمي', date: '2024-02-10', status: 'قيد التنفيذ' }
    ]
  }

  const statusBadge = (status) => {
    switch (status) {
      case 'مكتمل':
        return 'bg-green-100 text-green-800';
      case 'قيد التنفيذ':
        return 'bg-amber-100 text-amber-800';
      case 'معلق':
        return 'bg-yellow-50 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar + basic info */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center overflow-hidden">
                {u.avatarUrl ? (
                  <img src={u.avatarUrl} alt={u.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl text-amber-700 font-semibold">{u.name.split(' ').slice(0,2).map(n=>n[0]).join('')}</span>
                )}
              </div>

              <div className="flex-1 text-right">
                <h2 className="text-2xl font-bold text-gray-900">{u.name}</h2>
                <p className="text-sm text-gray-500">عضو منذ {u.joined}</p>
                <div className="mt-3 flex items-center gap-3">
                  <a href={`mailto:${u.email}`} className="text-sm text-gray-700 hover:underline">{u.email}</a>
                  <span className="text-gray-300">•</span>
                  <a href={`tel:${u.phone}`} className="text-sm text-gray-700 hover:underline">{u.phone}</a>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="w-full md:w-auto flex items-center gap-3">
              <button className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-md shadow-sm">تحديث الملف</button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50">مراسلة العميل</button>
            </div>
          </div>

          <div className="border-t border-gray-100 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column - profile details */}
            <div className="col-span-2 space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-2">معلومات الاتصال</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  <div><span className="text-gray-500">البريد الإلكتروني: </span><span className="font-medium">{u.email}</span></div>
                  <div><span className="text-gray-500">الجوال: </span><span className="font-medium">{u.phone}</span></div>
                  <div><span className="text-gray-500">المدينة: </span><span className="font-medium">{u.city}</span></div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-md border border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-3">طلبات حديثة</h3>
                <ul className="divide-y divide-gray-100">
                  {u.requests.map(r => (
                    <li key={r.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{r.title}</div>
                        <div className="text-xs text-gray-500">{r.date}</div>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${statusBadge(r.status)}`}>{r.status}</span>
                        <a href={`/client/requests/${r.id}`} className="text-sm text-amber-700 hover:underline">عرض</a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right column - stats and notes */}
            <aside className="space-y-4">
              <div className="bg-white p-4 rounded-md border border-gray-100 text-center">
                <div className="text-sm text-gray-500">إجمالي الطلبات</div>
                <div className="text-2xl font-bold text-gray-900">{u.requests.length}</div>
              </div>

              <div className="bg-white p-4 rounded-md border border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-2">ملاحظات داخلية</h4>
                <p className="text-sm text-gray-600">لا توجد ملاحظات حالياً.</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
