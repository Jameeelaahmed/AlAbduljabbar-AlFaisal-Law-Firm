import { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    useRequest,
    useNotes,
    useRejectRequest,
    useResolveRequest,
    useContactRequest
} from '../../../hooks/useRequests';
import { useUserById } from '../../../hooks/useUsers';
import { useServiceById } from '../../../hooks/useServices';
import { useTranslation } from 'react-i18next';
import { getFileTypeAndName, handleDownload } from '../../../utils/documents';
import { useAddRequestNote } from '../../../hooks/useRequests';
import { toast } from 'react-toastify';

function RequestsDetails() {
    const { t } = useTranslation();
    const { requestId } = useParams();
    const navigate = useNavigate();

    // Fetch request data
    const {
        data: requestData,
        isLoading,
        error
    } = useRequest(requestId);

    const {
        data: previousNotes,
        isLoading: isFetchingNotes,
        error: notesError
    } = useNotes(requestId);


    const attachments = [
        requestData?.photo1url,
        requestData?.photo2url,
        requestData?.photo3url,
        requestData?.photo4url
    ].filter(Boolean);

    // Fetch related data
    const { data: userData } = useUserById(requestData?.userID);
    const { data: serviceData } = useServiceById(requestData?.serviceID);

    // Status update mutations
    const { mutate: rejectRequest, isLoading: isRejecting } = useRejectRequest();
    const { mutate: resolveRequest, isLoading: isResolving } = useResolveRequest();
    const { mutate: contactRequest, isLoading: isContacting } = useContactRequest();
    const { mutate: addRequestNote, isLoading: isAddingNote } = useAddRequestNote();

    // Notes state
    const [notes, setNotes] = useState('');

    // Handle adding notes
    const handleAddNote = () => {
        if (!notes.trim()) return;

        addRequestNote(
            { requestId, content: notes.trim(), consultationId: null },
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

    // Default timeline data for new requests or when API timeline is not available
    const defaultTimeline = [
        {
            status: getStatusLabel(0),
            date: new Date(requestData?.createdAt).toLocaleDateString('ar-SA'),
            time: new Date(requestData?.createdAt).toLocaleTimeString('ar-SA'),
            by: t("Requests.Timeline.system")
        },
        {
            status: getStatusLabel(1),
            date: new Date(requestData?.createdAt).toLocaleDateString('ar-SA'),
            time: new Date(new Date(requestData?.createdAt).getTime() + 1800000).toLocaleTimeString('ar-SA'), // 30 minutes later
            by: t("Requests.Team.reviewTeam")
        },
        {
            status: getStatusLabel(2),
            date: new Date(requestData?.createdAt).toLocaleDateString('ar-SA'),
            time: new Date(new Date(requestData?.createdAt).getTime() + 3600000).toLocaleTimeString('ar-SA'), // 1 hour later
            by: t("Requests.Team.supervisor")
        }
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex items-center justify-center" dir="rtl">
                <div className="text-lg text-gray-600">{t("Requests.Messages.loading")}</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex flex-col items-center justify-center gap-4" dir="rtl">
                <div className="text-lg text-red-600">
                    {error.message || t("Requests.Messages.loadError")}
                </div>
                <button
                    onClick={() => navigate('/admin/requests')}
                    className="px-4 py-2 bg-primary cursor-pointer text-white rounded-md hover:bg-primary/80"
                >
                    {t("Requests.Actions.back")}
                </button>
            </div>
        );
    }

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
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900">{t("Requests.RequestDetails")}</h1>
                        <p className="text-sm sm:text-base text-gray-600">
                            #{requestData.id} — {userData?.fullName || t("Requests.Client") + ` ${requestData.userID}`}
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
                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                            <dt className="text-xs sm:text-sm text-gray-500">{t("Requests.Client")}</dt>
                                            <dd className="mt-1 text-sm sm:text-base font-semibold text-gray-900">
                                                {userData?.fullName || t("Requests.Client") + ` ${requestData.userID}`}
                                            </dd>
                                        </div>

                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                            <dt className="text-xs sm:text-sm text-gray-500">{t("Requests.ServiceType")}</dt>
                                            <dd className="mt-1 text-sm sm:text-base font-semibold text-gray-900">
                                                {serviceData?.name || t("Requests.ServiceType") + ` ${requestData.serviceID}`}
                                            </dd>
                                        </div>

                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                            <dt className="text-xs sm:text-sm text-gray-500">{t("Requests.ReceivedDate")}</dt>
                                            <dd className="mt-1 text-sm sm:text-base text-gray-700">{new Date(requestData.createdAt).toLocaleString()}</dd>
                                        </div>

                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                            <dt className="text-xs sm:text-sm text-gray-500">{t("Requests.DueDate")}</dt>
                                            <dd className="mt-1 text-sm sm:text-base font-semibold text-gray-900">{requestData.dueDate}</dd>
                                        </div>
                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-md sm:col-span-2">
                                            <dt className="text-xs sm:text-sm text-gray-500">{t("Consultations.Description")}</dt>
                                            <dd className="mt-1 text-sm sm:text-base text-gray-800 leading-relaxed whitespace-pre-line">
                                                {requestData.description || t("Consultations.NoDescription")}
                                            </dd>
                                        </div>
                                    </dl>

                                    <div className="mt-4 sm:mt-6">
                                        <h3 className="text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">{t("Requests.Attachments.title")}</h3>
                                        {!attachments || attachments.length === 0 ? (
                                            <div className="bg-gray-50 rounded-lg p-4 text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                </svg>
                                                <p className="text-sm text-gray-500">{t("Requests.Attachments.noAttachments")}</p>
                                            </div>
                                        ) : (
                                            <ul className="space-y-2">
                                                {attachments.map((fileUrl, index) => {
                                                    const { fileType, fileName } = getFileTypeAndName(fileUrl, index);

                                                    return (
                                                        <li
                                                            key={index}
                                                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white border border-gray-100 rounded-md p-3 gap-2 sm:gap-3"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M8 2a2 2 0 00-2 2v10a4 4 0 108 0V6a2 2 0 00-2-2H8z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                                <div>
                                                                    <div className="text-xs sm:text-sm font-medium text-gray-900">
                                                                        {fileName}
                                                                    </div>
                                                                    <div className="text-xs text-gray-500">{fileType}</div>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-2 self-end sm:self-auto">
                                                                <button
                                                                    onClick={() => handleDownload(fileUrl, fileName)}
                                                                    className="text-xs cursor-pointer sm:text-sm text-blue-400 hover:underline"
                                                                >
                                                                    {t("Requests.Attachments.download")}
                                                                </button>
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            </ul>


                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-lg shadow p-4 sm:p-6 border border-gray-200">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{t("Requests.Timeline.title")}</h3>
                            <div className="flow-root">
                                <ul className="-mb-8">
                                    {(requestData.timeline?.length > 0 ? requestData.timeline : defaultTimeline).map((event, idx) => (
                                        <li key={idx} className="mb-6 sm:mb-8">
                                            <div className="relative pb-6 sm:pb-8">
                                                <span className={`absolute -right-2 sm:-right-3 top-1 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full ring-2 sm:ring-4 ring-white ${idx === 0 ? 'bg-primary' : 'bg-gray-500'}`} />
                                                <div className="ml-8 sm:ml-10 pr-3 sm:pr-4">
                                                    <p className="text-xs sm:text-sm font-semibold text-gray-900">{event.status}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {event.date} {event.time ? `${event.time} •` : '•'} {t("Requests.Timeline.by")} {event.by}
                                                    </p>
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
                            <h4 className="text-sm sm:text-base font-medium text-gray-700 mb-3">{t("Requests.Actions.updateStatus")}</h4>

                            {/* Status Action Buttons */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                                <button
                                    onClick={() => contactRequest(requestId)}
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
                                    onClick={() => resolveRequest(requestId)}
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
                                    onClick={() => rejectRequest(requestId)}
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
                                {!previousNotes?.data || previousNotes?.data.length === 0 ? (
                                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-sm text-gray-500">{t("Requests.Notes.noPreviousNotes")}</p>
                                    </div>
                                ) : (
                                    previousNotes?.data?.map((item, index) => (
                                        <div
                                            key={item.id}
                                            className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    {item.userPhoto ? (
                                                        <img
                                                            src={item.userPhoto}
                                                            alt={item.userName}
                                                            className="w-8 h-8 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs">
                                                            {item.userName?.[0] ?? "?"}
                                                        </div>
                                                    )}
                                                    <span className="text-sm font-semibold text-gray-900">{item.userName}</span>
                                                </div>
                                                <span className="text-xs text-gray-500">
                                                    {new Date(item.createdAt).toLocaleDateString()} •{" "}
                                                    {new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                </span>
                                            </div>

                                            <p className="text-sm text-gray-700 leading-relaxed">{item.content}</p>
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
