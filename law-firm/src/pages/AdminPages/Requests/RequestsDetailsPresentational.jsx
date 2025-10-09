import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function RequestsDetailsPresentational({ initialRequest = null }) {
    const { requestId } = useParams();
    const navigate = useNavigate();

    // Use provided initialRequest prop if available, otherwise fallback to mock data.
    const [requestData] = useState(
        initialRequest || {
            id: requestId || 'REQ001',
            client: 'سارة الموسى',
            type: 'مراجعة مستند',
            submissionDate: '2024-01-15',
            dueDate: '2024-01-22',
            status: 'قيد التنفيذ',
            attachments: [
                { id: 1, name: 'عقد-بيع.pdf', size: '124 KB' },
                { id: 2, name: 'تفويض.png', size: '450 KB' }
            ],
            timeline: [
                { status: 'تم استلام الطلب', date: '2024-01-15', by: 'نظام' },
                { status: 'تم إسناده إلى مساعد قانوني', date: '2024-01-16', by: 'مريم' },
                { status: 'قيد التنفيذ', date: '2024-01-17', by: 'أحمد' }
            ],
            previousNotes: [
                { author: 'أحمد محمد', note: 'تم مراجعة المستند الأولي، يحتاج إلى بعض التعديلات', date: '2024-01-16', time: '10:30 ص' },
                { author: 'سارة علي', note: 'العميل طلب إضافة بند إضافي', date: '2024-01-16', time: '02:15 م' },
                { author: 'أحمد محمد', note: 'جاري العمل على التعديلات المطلوبة', date: '2024-01-17', time: '09:00 ص' }
            ]
        }
    );

    const [selectedStatus, setSelectedStatus] = useState(requestData.status);
    const [notes, setNotes] = useState('');

    const handleSaveChanges = () => {
        // Handle save logic here
        console.log('Saving changes:', { status: selectedStatus, notes });
        // You would typically make an API call here
    };

    const statusColors = {
        'قيد التنفيذ': 'bg-amber-100 text-amber-800',
        'معلق': 'bg-yellow-50 text-yellow-800',
        'مكتمل': 'bg-green-100 text-green-800',
        'ملغي': 'bg-red-100 text-red-800',
        'قيد المراجعة': 'bg-indigo-100 text-indigo-800'
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6" dir="rtl">
            <div className="max-w-7xl mx-auto mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900">تفاصيل الطلب</h1>
                        <p className="text-sm sm:text-base text-gray-600">#{requestData.id} — {requestData.client}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium ${statusColors[requestData.status] || 'bg-gray-100 text-gray-800'}`}>
                            {requestData.status}
                        </span>

                        <button
                            onClick={() => navigate('/admin/requests')}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm text-xs sm:text-sm text-gray-700 hover:bg-gray-50 w-full sm:w-auto justify-center"
                        >
                            العودة
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Left: Main details (span 2 on large) */}
                    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                        <section className="bg-white rounded-lg shadow p-4 sm:p-6 border border-gray-200">
                            <div className="flex flex-col gap-4 sm:gap-6">
                                <div className="flex-1">
                                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                            <dt className="text-xs sm:text-sm text-gray-500">العميل</dt>
                                            <dd className="mt-1 text-sm sm:text-base font-semibold text-gray-900">{requestData.client}</dd>
                                        </div>

                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                            <dt className="text-xs sm:text-sm text-gray-500">نوع الخدمة</dt>
                                            <dd className="mt-1 text-sm sm:text-base font-semibold text-gray-900">{requestData.type}</dd>
                                        </div>

                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                            <dt className="text-xs sm:text-sm text-gray-500">تاريخ الإستلام</dt>
                                            <dd className="mt-1 text-sm sm:text-base text-gray-700">{requestData.submissionDate}</dd>
                                        </div>

                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                            <dt className="text-xs sm:text-sm text-gray-500">تاريخ الإستحقاق</dt>
                                            <dd className="mt-1 text-sm sm:text-base font-semibold text-gray-900">{requestData.dueDate}</dd>
                                        </div>
                                    </dl>

                                    <div className="mt-4 sm:mt-6">
                                        <h3 className="text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">مرفقات</h3>
                                        <ul className="space-y-2">
                                            {requestData.attachments.map(att => (
                                                <li key={att.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white border border-gray-100 rounded-md p-3 gap-2 sm:gap-3">
                                                    <div className="flex items-center gap-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M8 2a2 2 0 00-2 2v10a4 4 0 108 0V6a2 2 0 00-2-2H8z" clipRule="evenodd" />
                                                        </svg>
                                                        <div>
                                                            <div className="text-xs sm:text-sm font-medium text-gray-900">{att.name}</div>
                                                            <div className="text-xs text-gray-500">{att.size}</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                                        <button className="text-xs sm:text-sm text-gray-500 hover:underline">عرض</button>
                                                        <button className="text-xs sm:text-sm text-blue-400">تحميل</button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-lg shadow p-4 sm:p-6 border border-gray-200">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">سجل الطلب</h3>
                            <div className="flow-root">
                                <ul className="-mb-8">
                                    {requestData.timeline.map((event, idx) => (
                                        <li key={idx} className="mb-6 sm:mb-8">
                                            <div className="relative pb-6 sm:pb-8">
                                                <span className="absolute -right-2 sm:-right-3 top-1 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-gray-500 rounded-full ring-2 sm:ring-4 ring-white" />
                                                <div className="ml-8 sm:ml-10 pr-3 sm:pr-4">
                                                    <p className="text-xs sm:text-sm font-semibold text-gray-900">{event.status}</p>
                                                    <p className="text-xs text-gray-500">{event.date} • بواسطة {event.by}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    </div>

                    {/* Right: Actions & Status */}
                    <aside className="space-y-4 sm:space-y-6">
                        <div className="lg:sticky lg:top-6 bg-white rounded-lg shadow p-4 sm:p-6 border border-gray-200">
                            <h4 className="text-sm sm:text-base font-medium text-gray-700 mb-3">تحديث الحالة</h4>
                            <label htmlFor="status" className="sr-only">الحالة</label>
                            <select
                                id="status"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm sm:text-base"
                            >
                                <option value="قيد التنفيذ">قيد التنفيذ</option>
                                <option value="معلق">معلق</option>
                                <option value="مكتمل">مكتمل</option>
                                <option value="ملغي">ملغي</option>
                                <option value="قيد المراجعة">قيد المراجعة</option>
                            </select>

                            <label htmlFor="notes" className="block text-xs sm:text-sm font-medium text-gray-700 mt-4">ملاحظات داخلية</label>
                            <textarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={4}
                                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none text-sm sm:text-base"
                                placeholder="أضف ملاحظة قصيرة للأعضاء..."
                            />

                            <div className="mt-4 flex flex-col gap-2">
                                <button
                                    onClick={handleSaveChanges}
                                    className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors duration-300 cursor-pointer text-sm sm:text-base"
                                >حفظ التغييرات</button>

                                <button
                                    onClick={() => { setSelectedStatus(requestData.status); setNotes(''); }}
                                    className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-xs sm:text-sm text-gray-700 hover:bg-gray-50"
                                >إلغاء</button>
                            </div>
                        </div>

                        {/* Previous Notes Card */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">الملاحظات السابقة</h2>

                            <div className="space-y-3 sm:space-y-4">
                                {requestData.previousNotes.length > 0 ? (
                                    requestData.previousNotes.map((item, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1 sm:gap-0">
                                                <span className="text-xs sm:text-sm font-semibold text-gray-900">{item.author}</span>
                                                <span className="text-xs text-gray-500">{item.date} - {item.time}</span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{item.note}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center py-4 text-sm">لا توجد ملاحظات سابقة</p>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}