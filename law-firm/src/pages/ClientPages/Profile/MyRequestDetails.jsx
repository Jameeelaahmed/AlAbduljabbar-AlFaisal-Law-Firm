import { useParams, Link } from 'react-router-dom';
import { useRequest, useNotes } from '../../../hooks/useRequests';
import { ArrowLeft, Calendar, Clock, FileText, MessageSquare, User, Mail, Phone, Download, AlertCircle, Clock as ClockIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Loading from '../../../components/Common/Loading';
import { getFileTypeAndName, handleDownload } from '../../../utils/documents';

// Helper function to get status label with translation
const getStatusLabel = (status, t) => {
  const statusMap = {
    0: t('ClientRequests.status.pending'),
    1: t('ClientRequests.status.contacted'),
    2: t('ClientRequests.status.resolved'),
    3: t('ClientRequests.status.rejected'),
  };
  return statusMap[status] || t('ClientRequests.status.unknown');
};

export default function MyRequestDetails() {
    const { t } = useTranslation();
    const { requestId } = useParams();
    const { data: request, isLoading, error } = useRequest(requestId);
    
    console.log(request)
    // Fetch previous notes
    const { 
        data: previousNotes, 
        isLoading: isFetchingNotes, 
        error: notesError 
    } = useNotes(requestId, null); // null for consultationId as it's not needed here

    // Get document attachments
    const attachments = [
        request?.photo1url,
        request?.photo2url,
        request?.photo3url,
        request?.photo4url
    ].filter(Boolean);

    const getStatusStyles = (status) => {
        switch (status) {
            case 0: return 'bg-pendingBg text-pending';
            case 1: return 'bg-inProgressBg text-inProgress';
            case 2: return 'bg-succeededBg text-succeeded';
            case 3: return 'bg-deniedBg text-denied';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Status label is now handled by the helper function

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loading />
            </div>
        );
    }

    if (!request) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="text-center py-12">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                        {t('Requests.requestNotFound')}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {t('Requests.requestNotFoundDescription')}
                    </p>
                    <div className="mt-6">
                        <Link
                            to="/profile/requests"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {t('Common.backToRequests')}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-5 md:p-8 mt-8 md:mt-12">
            {/* Header with back button and request info */}
            <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                    <Link 
                        to="/profile/requests" 
                        className="inline-flex items-center text-primary hover:text-primary-dark"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        {t('ClientRequests.backToRequests')}
                    </Link>
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ${getStatusStyles(request.status)}`}>
                        {getStatusLabel(request.status, t)}
                    </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {t('ClientRequests.requestDetails')} #{request.id}
                </h1>
                <p className="text-sm text-gray-500 mb-6">
                    {t('ClientRequests.requestedOn')} {formatDate(request.createdAt)}
                </p>

                {/* Request Summary */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-10 border border-gray-100">
                    <div className="space-y-4">
                        {/* Title */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                {request.title || t('Common.notProvided')}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {t('ClientRequests.requestedBy')}: {request.userName || t('Common.notProvided')}
                            </p>
                        </div>

                        {/* Description */}
                        <div className="border-t border-gray-100 pt-4">
                            <h4 className="text-sm font-medium text-gray-500 mb-1">
                                {t('ClientRequests.description')}
                            </h4>
                            <p className="text-gray-700 whitespace-pre-line">
                                {request.description || t('Common.notProvided')}
                            </p>
                        </div>

                        {/* Meta Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">
                                    {t('ClientRequests.requestedOn')}
                                </h4>
                                <p className="text-gray-900">
                                    {formatDate(request.createdAt)}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">
                                    {t('ClientRequests.notes')}
                                </h4>
                                <p className="text-gray-900">
                                    {request.notesCount || 0}
                                </p>
                            </div>
                        </div>

                        {/* Admin Note (if exists) */}
                        {request.note && (
                            <div className="mt-4 p-3 bg-yellow-50 border-r-4 border-yellow-400 rounded">
                                <div className="flex">
                                    <div>
                                        <h4 className="text-sm font-medium text-yellow-800">
                                            {t('ClientRequests.adminNote')}
                                        </h4>
                                        <p className="text-sm text-yellow-700 mt-1">
                                            {request.note}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Documents Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-10 border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                        {t('ClientRequests.attachments.title')} 
                        {attachments.length > 0 && (
                            <span className="text-sm text-gray-500 ml-2">({attachments.length})</span>
                        )}
                    </h3>
                    
                    {attachments.length === 0 ? (
                        <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-lg">
                            <FileText className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">{t('ClientRequests.attachments.noAttachments')}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {attachments.map((fileUrl, index) => {
                                const { fileType, fileName } = getFileTypeAndName(fileUrl, index);
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gray-50 rounded">
                                                <FileText className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
                                                    {fileName}
                                                </p>
                                                <p className="text-xs text-gray-500">{fileType}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDownload(fileUrl, fileName)}
                                            className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                                            title={t('ClientRequests.attachments.download')}
                                        >
                                            <Download className="h-4 w-4" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Previous Notes Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-50 p-2 rounded-lg">
                            <MessageSquare className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">
                            {t('ClientRequests.notesSection')}
                        </h3>
                        {!isFetchingNotes && previousNotes?.data?.length > 0 && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {previousNotes.data.length} {previousNotes.data.length === 1 ? t('ClientRequests.note') : t('ClientRequests.notesPlural')}
                            </span>
                        )}
                    </div>

                    {isFetchingNotes ? (
                        <div className="flex justify-center py-8">
                            <Loading size="medium" />
                        </div>
                    ) : !previousNotes?.data?.length ? (
                        <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
                            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                            <h4 className="text-base font-medium text-gray-700 mb-1">
                                {t('ClientRequests.noNotesYet')}
                            </h4>
                            <p className="text-sm text-gray-500 max-w-md mx-auto">
                                {t('ClientRequests.noNotesDescription')}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {previousNotes.data.map((note) => (
                                <div 
                                    key={note.id} 
                                    className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                                            <MessageSquare className="h-4 w-4 text-gray-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                                <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                                    <User className="h-3.5 w-3.5 text-gray-400" />
                                                    {note.userName || t('ClientRequests.anonymous')}
                                                </h4>
                                                <span className="text-xs text-gray-500 flex items-center bg-white px-2 py-1 rounded-full border border-gray-100 w-fit">
                                                    <ClockIcon className="h-3 w-3 mr-1 text-gray-400" />
                                                    {new Date(note.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg border border-gray-100">
                                                <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                                                    {note.content}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
