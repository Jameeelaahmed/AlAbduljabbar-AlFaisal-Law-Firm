import React, { useMemo, useCallback, useState } from 'react'
import { FileText, Plus, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Requests({ requests = [] }) {
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const { t } = useTranslation();
    const allStatusCases = useMemo(() => [0, 1, 2, 3], []);

    // Memoized filtered requests - recalculates only when dependencies change
    const filteredRequests = useMemo(() => {
        if (selectedStatuses.length === 0) {
            return requests;
        }
        return requests.filter(r => selectedStatuses.includes(r.status));
    }, [selectedStatuses, requests]);

    const getStatusLabel = useCallback((statusCode) => {
        switch (statusCode) {
            case 0: return t("Requests.Status.Pending");
            case 1: return t("Requests.Status.Contacted");
            case 2: return t("Requests.Status.Resolved");
            case 3: return t("Requests.Status.Rejected");
            default: return t("Requests.Status.Pending");
        }
    }, [t]);

    const getStatusStyles = useCallback((statusCode) => {
        switch (statusCode) {
            case 0: return "bg-pendingBg text-pending";
            case 1: return "bg-inProgressBg text-inProgress";
            case 2: return "bg-succeededBg text-succeeded";
            case 3: return "bg-deniedBg text-denied";
            default: return "bg-gray-400 text-white";
        }
    }, []);

    const handleFilterByStatus = useCallback((status) => {
        setSelectedStatuses(prev => {
            if (prev.includes(status)) {
                // Remove status if already selected
                return prev.filter(s => s !== status);
            } else {
                // Add status if not selected
                return [...prev, status];
            }
        });
    }, []);

    const clearFilters = useCallback(() => {
        setSelectedStatuses([]);
    }, []);

    const handleRequestClick = useCallback((requestId) => {
        window.location.href = `/requests/${requestId}`;
    }, []);

    return (
        <>
            {/* Filter Badge */}
            {selectedStatuses.length > 0 && (
                <div className="mb-4 flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-600">{t("Settings.filtering")}:</span>
                    {selectedStatuses.map(status => (
                        <span
                            key={status}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(status)} flex items-center gap-1`}
                        >
                            {getStatusLabel(status)}
                            <X
                                className="w-3 h-3 cursor-pointer hover:opacity-70"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleFilterByStatus(status);
                                }}
                            />
                        </span>
                    ))}
                    <button
                        onClick={clearFilters}
                        className="text-xs text-primary hover:text-accent underline"
                    >
                        {t("Settings.clearAll")}
                    </button>
                </div>
            )}

            <div className="space-y-4">
                {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                        <div
                            key={request.id}
                            className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all duration-300 cursor-pointer group"
                            onClick={() => handleRequestClick(request.id)}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <FileText className="w-5 h-5 text-primary" />
                                        <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors">
                                            {request.title}
                                        </h3>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                        {request.description}
                                    </p>

                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <span>
                                            Submitted: {(() => {
                                                const date = new Date(request.createdAt);
                                                return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                                            })()}
                                        </span>

                                        <span>•</span>
                                        <span>ID: #{request.id}</span>
                                    </div>
                                </div>

                                <div className="ml-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(request.status)}`}
                                    >
                                        {getStatusLabel(request.status)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    /* Empty State */
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-12 h-12 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-primary mb-2">
                            {selectedStatuses.length > 0 ? t("Settings.noMatchingRequests") : t("Settings.noRequests")}
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            {selectedStatuses.length > 0
                                ? t("Settings.tryDifferentFilter")
                                : t("Settings.noRequestsSubtitle")
                            }
                        </p>
                        {selectedStatuses.length > 0 ? (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mx-auto"
                            >
                                <X className="w-5 h-5" />
                                {t("Settings.clearFilters")}
                            </button>
                        ) : (
                            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mx-auto">
                                <Plus className="w-5 h-5" />
                                {t("Settings.createYourFirstRequest")}
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Stats (if there are requests) */}
            {requests.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="text-center p-4 bg-primary/5 rounded-lg">
                            <div className="text-2xl font-bold text-primary">{requests.length}</div>
                            <div className="text-sm text-gray-600">{t("Settings.total")}</div>
                        </div>
                        {allStatusCases.map(status => {
                            const isSelected = selectedStatuses.includes(status);
                            return (
                                <div
                                    key={status}
                                    className={`text-center p-4 ${getStatusStyles(status)} rounded-lg cursor-pointer transition-all duration-300 ${isSelected ? 'ring-4 ring-primary ring-offset-2 scale-105' : 'hover:scale-105 opacity-80 hover:opacity-100'
                                        }`}
                                    onClick={() => handleFilterByStatus(status)}
                                >
                                    <div className="text-2xl font-bold">
                                        {requests.filter(r => r.status === status).length}
                                    </div>
                                    <div className="text-sm text-gray-600">{getStatusLabel(status)}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    )
}