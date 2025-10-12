import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRequest, useUpdateRequestStatus, useAddRequestNote } from '../../../hooks/useRequests';
import { useUserById } from '../../../hooks/useUsers';
import { useServiceById } from '../../../hooks/useServices';

function RequestsDetails({ initialRequest = null }) {
    const { requestId } = useParams();
    const navigate = useNavigate();

    // Fetch request data
    const {
        data: requestData,
        isLoading,
        error
    } = useRequest(requestId);

    // Fetch related data
    const { data: userData } = useUserById(requestData?.userID);
    const { data: serviceData } = useServiceById(requestData?.serviceID);
    console.log("user", userData)
    console.log("service", serviceData)
    // Mutations
    const { mutate: updateStatus, isLoading: isUpdatingStatus } = useUpdateRequestStatus();
    const { mutate: addNote, isLoading: isAddingNote } = useAddRequestNote();

    const [selectedStatus, setSelectedStatus] = useState(requestData?.status ?? null);
    const [notes, setNotes] = useState('');

    // Update selected status when data changes
    useEffect(() => {
        if (requestData?.status !== undefined) {
            setSelectedStatus(requestData.status);
        }
    }, [requestData?.status]);

    const handleSaveChanges = () => {
        if (selectedStatus !== requestData?.status) {
            updateStatus({ id: requestId, status: selectedStatus });
        }

        if (notes.trim()) {
            addNote({ requestId, note: notes });
            setNotes('');
        }
    };

    const getStatusLabel = (statusCode) => {
        switch (statusCode) {
            case 0: return "قيد الانتظار";
            case 1: return "قيد المراجعة";
            case 2: return "تم الحل";
            case 3: return "مرفوض";
            default: return "غير معروف";
        }
    };
    const statusColors = {
        0: 'bg-pendingBg text-pending',
        1: 'bg-inProgressBg text-inProgress',
        2: 'bg-succeededBg text-succeeded',
        3: 'bg-deniedBg text-denied',
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex items-center justify-center" dir="rtl">
                <div className="text-lg text-gray-600">جاري التحميل...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex flex-col items-center justify-center gap-4" dir="rtl">
                <div className="text-lg text-red-600">
                    {error.message || "حدث خطأ أثناء تحميل البيانات"}
                </div>
                <button
                    onClick={() => navigate('/admin/requests')}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
                >
                    العودة للطلبات
                </button>
            </div>
        );
    }

    if (!requestData) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex flex-col items-center justify-center gap-4" dir="rtl">
                <div className="text-lg text-gray-600">لم يتم العثور على الطلب</div>
                <button
                    onClick={() => navigate('/admin/requests')}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
                >
                    العودة للطلبات
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6" dir="rtl">
            <div className="max-w-7xl mx-auto mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900">تفاصيل الطلب</h1>
                        <p className="text-sm sm:text-base text-gray-600">
                            #{requestData.id} — {userData?.fullName || `عميل ${requestData.userID}`}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium ${statusColors[requestData.status] || 'bg-gray-100 text-gray-800'}`}>
                            {getStatusLabel(requestData.status)}
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
                                            <dd className="mt-1 text-sm sm:text-base font-semibold text-gray-900">
                                                {userData?.fullName || `عميل ${requestData.userID}`}
                                            </dd>
                                        </div>

                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                            <dt className="text-xs sm:text-sm text-gray-500">نوع الخدمة</dt>
                                            <dd className="mt-1 text-sm sm:text-base font-semibold text-gray-900">
                                                {serviceData?.name || `خدمة ${requestData.serviceID}`}
                                            </dd>
                                        </div>

                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                            <dt className="text-xs sm:text-sm text-gray-500">تاريخ الإستلام</dt>
                                            <dd className="mt-1 text-sm sm:text-base text-gray-700">{new Date(requestData.createdAt).toLocaleString()}</dd>
                                        </div>

                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                            <dt className="text-xs sm:text-sm text-gray-500">تاريخ الإستحقاق</dt>
                                            <dd className="mt-1 text-sm sm:text-base font-semibold text-gray-900">{requestData.dueDate}</dd>
                                        </div>
                                    </dl>

                                    <div className="mt-4 sm:mt-6">
                                        <h3 className="text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">مرفقات</h3>
                                        {!requestData.attachments || requestData.attachments.length === 0 ? (
                                            <div className="bg-gray-50 rounded-lg p-4 text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                </svg>
                                                <p className="text-sm text-gray-500">لا توجد مرفقات لهذا الطلب</p>
                                            </div>
                                        ) : (
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
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-lg shadow p-4 sm:p-6 border border-gray-200">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">سجل الطلب</h3>
                            <div className="flow-root">
                                {!requestData.timeline || requestData.timeline.length === 0 ? (
                                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-sm text-gray-500">لا يوجد سجل للطلب حتى الآن</p>
                                    </div>
                                ) : (
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
                                )}
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
                                <option value={0}>قيد الانتظار</option>
                                <option value={1}>قيد المراجعة</option>
                                <option value={2}>تم الحل</option>
                                <option value={3}>مرفوض</option>
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
                                    disabled={isUpdatingStatus || isAddingNote}
                                    className={`w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors duration-300 text-sm sm:text-base ${(isUpdatingStatus || isAddingNote) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    {isUpdatingStatus || isAddingNote ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                                </button>

                                <button
                                    onClick={() => {
                                        setSelectedStatus(requestData.status);
                                        setNotes('');
                                    }}
                                    disabled={isUpdatingStatus || isAddingNote}
                                    className={`w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-xs sm:text-sm text-gray-700 hover:bg-gray-50 ${(isUpdatingStatus || isAddingNote) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >إلغاء</button>
                            </div>
                        </div>

                        {/* Previous Notes Card */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">الملاحظات السابقة</h2>

                            <div className="space-y-3 sm:space-y-4">
                                {!requestData.previousNotes || requestData.previousNotes.length === 0 ? (
                                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-sm text-gray-500">لا توجد ملاحظات سابقة لهذا الطلب</p>
                                    </div>
                                ) : (
                                    requestData.previousNotes.map((item, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1 sm:gap-0">
                                                <span className="text-xs sm:text-sm font-semibold text-gray-900">{item.author}</span>
                                                <span className="text-xs text-gray-500">{item.date} - {item.time}</span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{item.note}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default RequestsDetails
