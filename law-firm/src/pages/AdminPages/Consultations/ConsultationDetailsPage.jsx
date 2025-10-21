// components

// custom
import { useContactConsultation, useRejectConsultation, useResolveConsultation } from '../../../hooks/useConsultations';
import { useAddRequestNote } from '../../../hooks/useRequests';
import { useConsultation } from '../../../hooks/useConsultations'
import { useNotes } from '../../../hooks/useRequests';
// hooks
import { useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Loading from '../../../components/Common/Loading';

export default function ConsultationDetailsPage() {
    const { t } = useTranslation();
    const { consultationId: userConsultationId } = useParams();
    const navigate = useNavigate();
    console.log("ConsultationId", userConsultationId)
    // Fetch request data
    const {
        data: requestData,
        isLoading,
    } = useConsultation(userConsultationId);

    const {
        data: previousNotes,
    } = useNotes(null, userConsultationId);

    //TODO Mutations 
    const { mutate: rejectConsultation, isLoading: isRejecting } = useRejectConsultation();
    const { mutate: resolveConsultation, isLoading: isResolving } = useResolveConsultation();
    const { mutate: contactConsultation, isLoading: isContacting } = useContactConsultation();
    const { mutate: addRequestNote, isLoading: isAddingNote } = useAddRequestNote();



    //* Local States And Functions
    const [notes, setNotes] = useState('');
    // Handle adding notes
    const handleAddNote = () => {
        if (!notes.trim()) return;

        addRequestNote(
            { requestId: null, content: notes.trim(), userConsultationId },
            {
                onSuccess: () => {
                    toast.success(t("Requests.NoteAdded"));
                    setNotes('');
                },
                onError: (err) => {
                    toast.error(t("Requests.FailedNote"))
                    console.error("Failed to add note:", err);
                },
            }
        );
    };

    const getStatusLabel = useCallback((statusCode) => {
        switch (statusCode) {
            case 0: return t("Requests.Status.Pending");
            case 1: return t("Requests.Status.Contacted");
            case 2: return t("Requests.Status.Resolved");
            case 3: return t("Requests.Status.Rejected");
            default: return t("Requests.Status.Pending");
        }
    }, [t]);

    const statusColors = useMemo(
        () => ({
            0: 'bg-pendingBg text-pending',
            1: 'bg-inProgressBg text-inProgress',
            2: 'bg-succeededBg text-succeeded',
            3: 'bg-deniedBg text-denied',
        }),
        []
    );

    if (isLoading) {
        return (
            <Loading />
        );
    }

    // if (error) {
    //     return (
    //         <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex flex-col items-center justify-center gap-4" dir="rtl">
    //             <div className="text-lg text-red-600">
    //                 {error.message || t("Requests.Messages.loadError")}
    //             </div>
    //             <button
    //                 onClick={() => navigate('/admin/requests')}
    //                 className="px-4 py-2 bg-primary cursor-pointer text-white rounded-md hover:bg-primary/80"
    //             >
    //                 {t("Requests.Actions.back")}
    //             </button>
    //         </div>
    //     );
    // }

    if (!requestData) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex flex-col items-center justify-center gap-4" dir="rtl">
                <div className="text-lg text-gray-600">{t("Requests.Messages.notFound")}</div>
                <button
                    onClick={() => navigate('/admin/requests')}
                    className="px-4 py-2 bg-primary cursor-pointer text-white rounded-md hover:bg-primary/80"
                >
                    {t("Requests.Actions.back")}
                </button>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6" dir="rtl">
            <div className="max-w-7xl mx-auto mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900">{t("Consultations.ConsultationDetails")}</h1>
                        <p className="text-sm sm:text-base text-gray-600">
                            #{requestData.id} — {requestData?.userName || t("Requests.Client") + ` ${requestData.userID}`}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium ${statusColors[requestData.status] || 'bg-gray-100 text-gray-800'}`}>
                            {getStatusLabel(requestData.status)}
                        </span>

                        <button
                            onClick={() => navigate('/admin/requests')}
                            className="inline-flex items-center cursor-pointer gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm text-xs sm:text-sm text-gray-700 hover:bg-gray-50 w-full sm:w-auto justify-center"
                        >
                            {t("Requests.Actions.back")}
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

                                        {/* Consultation Title */}
                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                            <dt className="text-xs sm:text-sm text-gray-500">{t("Consultations.Title")}</dt>
                                            <dd className="mt-1 text-sm sm:text-base font-semibold text-gray-900">
                                                {requestData.title || t("Consultations.NoTitle")}
                                            </dd>
                                        </div>

                                        {/* Category */}
                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                            <dt className="text-xs sm:text-sm text-gray-500">{t("Consultations.Category")}</dt>
                                            <dd className="mt-1 text-sm sm:text-base font-semibold text-gray-900">
                                                {requestData
                                                    ? `${requestData.categoryName}`
                                                    : t("Consultations.NoCategory")}
                                            </dd>
                                        </div>

                                        {/* Consultation Type */}
                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                            <dt className="text-xs sm:text-sm text-gray-500">{t("Consultations.Type")}</dt>
                                            <dd className="mt-1 text-sm sm:text-base font-semibold text-gray-900">
                                                {requestData.consultationID
                                                    ? `${requestData.consultationName}`
                                                    : t("Consultations.NoType")}
                                            </dd>
                                        </div>

                                        {/* Created At */}
                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                            <dt className="text-xs sm:text-sm text-gray-500">{t("Consultations.ReceivedDate")}</dt>
                                            <dd className="mt-1 text-sm sm:text-base text-gray-700">
                                                {new Date(requestData.createdAt).toLocaleString()}
                                            </dd>
                                        </div>
                                        {/* Description (Large space) */}
                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-md sm:col-span-2">
                                            <dt className="text-xs sm:text-sm text-gray-500">{t("Consultations.Description")}</dt>
                                            <dd className="mt-1 text-sm sm:text-base text-gray-800 leading-relaxed whitespace-pre-line">
                                                {requestData.description || t("Consultations.NoDescription")}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Right: Actions & Status */}
                    <aside className="space-y-4 sm:space-y-6">
                        <div className="lg:sticky lg:top-6 bg-white rounded-lg shadow p-4 sm:p-6 border border-gray-200">
                            <h4 className="text-sm sm:text-base font-medium text-gray-700 mb-3">{t("Requests.Actions.updateStatus")}</h4>

                            {/* Status Action Buttons */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                                <button
                                    onClick={() => contactConsultation(userConsultationId)}
                                    disabled={isContacting || requestData.status === 1}
                                    className={`inline-flex cursor-pointer justify-center items-center px-4 py-2 rounded-md text-sm font-medium
                                                ${requestData.status === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-blue-50 text-primary/80 hover:bg-blue-100'
                                        } transition-colors duration-200`}
                                >
                                    {isContacting ? t("Requests.Actions.updating") : t("Requests.Actions.markContacted")}
                                </button>

                                <button
                                    onClick={() => resolveConsultation(userConsultationId)}
                                    disabled={isResolving || requestData.status === 2}
                                    className={`inline-flex cursor-pointer justify-center items-center px-4 py-2 rounded-md text-sm font-medium
                                                ${requestData.status === 2
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                                        } transition-colors duration-200`}
                                >
                                    {isResolving ? t("Requests.Actions.updating") : t("Requests.Actions.resolve")}
                                </button>

                                <button
                                    onClick={() => rejectConsultation(userConsultationId)}
                                    disabled={isRejecting || requestData.status === 3}
                                    className={`inline-flex cursor-pointer justify-center items-center px-4 py-2 rounded-md text-sm font-medium
                                                ${requestData.status === 3
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-red-50 text-red-600 hover:bg-red-100'
                                        } transition-colors duration-200`}
                                >
                                    {isRejecting ? t("Requests.Actions.updating") : t("Requests.Actions.reject")}
                                </button>
                            </div>

                            {/* Notes Section */}
                            <label htmlFor="notes" className="block text-xs sm:text-sm font-medium text-gray-700">{t("Requests.Notes.internal")}</label>
                            <textarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={4}
                                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none text-sm sm:text-base"
                                placeholder={t("Requests.Notes.placeholder")}
                            />

                            <div className="mt-4 flex flex-col gap-2">
                                <button
                                    onClick={handleAddNote}
                                    disabled={isAddingNote || !notes.trim()}
                                    className={`w-full cursor-pointer inline-flex justify-center items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors duration-300 text-sm sm:text-base ${(isAddingNote || !notes.trim()) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    {isAddingNote ? t("Requests.Actions.saving") : t("Requests.Actions.addNote")}
                                </button>

                                <button
                                    onClick={() => setNotes('')}
                                    disabled={isAddingNote || !notes.trim()}
                                    className={`w-full cursor-pointer inline-flex justify-center items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-xs sm:text-sm text-gray-700 hover:bg-gray-50 ${(isAddingNote || !notes.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {t("Requests.Actions.cancel")}
                                </button>
                            </div>
                        </div>

                        {/* Previous Notes Card */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">{t("Requests.Notes.previous")}</h2>

                            <div className="space-y-3 sm:space-y-4">
                                {!previousNotes || previousNotes.length === 0 ? (
                                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-sm text-gray-500">{t("Consultations.Notes.noPreviousNotes")}</p>
                                    </div>
                                ) : (
                                    previousNotes?.map((item, index) => (
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
