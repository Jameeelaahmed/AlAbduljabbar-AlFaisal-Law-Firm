import React, { useState } from 'react';
import { User, Mail, Shield, Calendar, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useChangePassword } from '../../../hooks/useChangePassword';
import { useAuthStore } from '../../../store/useAuthStore';
import { useRequestsByUserId } from '../../../hooks/useRequests';
import Security from './security';
import Requests from './requests';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const changePasswordMutation = useChangePassword();
    const [activeTab, setActiveTab] = useState('profile');

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

    const user = useAuthStore().user;
    const isNotClient = user?.lastRole !== "User";
    const { data: requests } = useRequestsByUserId({ userId: user.id, pageIndex: 1, pageSize: 5 });
    return (
        <>
            <div className="min-h-screen bg-bg p-4 md:p-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mt-20 mb-4 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <h1 className="text-3xl font-bold text-primary">{t('Settings.title')}</h1>
                        <p className="text-gray-600 mt-2">{t("Settings.subTitle")}</p>
                    </div>

                    {/* Tabs */}
                    <div className="mb-6 bg-white rounded-2xl shadow-lg border border-gray-200 p-2">
                        <div className="flex space-x-1">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'profile'
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                                    }`}
                            >
                                {t('Settings.profile')}
                            </button>
                            <button
                                onClick={() => setActiveTab('security')}
                                className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'security'
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                                    }`}
                            >
                                {t('Settings.security')}
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'profile' && (
                        <>
                            {isNotClient ? (
                                // 🧱 Non-client layout (Admin / Customer Service)
                                <div className="max-w-2xl mx-auto">
                                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                                        {/* Profile Info for Admin / Customer Service */}
                                        <div className="flex flex-col items-center mb-6">
                                            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                                {user.profilePicture ? (
                                                    <img
                                                        src={user.profilePicture}
                                                        alt={user.name}
                                                        className="w-32 h-32 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <User className="w-16 h-16 text-primary" />
                                                )}
                                            </div>
                                            <h2 className="text-2xl font-bold text-primary text-center">{user.name}</h2>
                                            <p className="text-gray-600 text-center mt-1">{user.lastRole}#${user.id}</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <Mail className="w-5 h-5 text-primary" />
                                                <div>
                                                    <p className="text-sm text-gray-600">Email</p>
                                                    <p className="text-primary font-medium">{user.email}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <Shield className="w-5 h-5 text-primary" />
                                                <div>
                                                    <p className="text-sm text-gray-600">Role</p>
                                                    <p className="text-primary font-medium">{user.lastRole}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <Calendar className="w-5 h-5 text-primary" />
                                                <div>
                                                    <p className="text-sm text-gray-600">Member since</p>
                                                    <p className="text-primary font-medium">{user.joinDate}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="w-full mt-6 px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Left Column - Profile Info */}
                                    <div className="lg:col-span-1 space-y-6">
                                        {/* Profile Card */}
                                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                                            {/* Profile Picture */}
                                            <div className="flex flex-col items-center mb-6">
                                                <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                                    {user.profilePicture ? (
                                                        <img
                                                            src={user.profilePicture}
                                                            alt={user.name}
                                                            className="w-32 h-32 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <User className="w-16 h-16 text-primary" />
                                                    )}
                                                </div>
                                                <h2 className="text-2xl font-bold text-primary text-center">{user.name}</h2>
                                                <p className="text-gray-600 text-center mt-1">{user.lastRole}#{user.id}</p>
                                            </div>

                                            {/* User Details */}
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                    <Mail className="w-5 h-5 text-primary" />
                                                    <div>
                                                        <p className="text-sm text-gray-600">Email</p>
                                                        <p className="text-primary font-medium">{user.email}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                    <Shield className="w-5 h-5 text-primary" />
                                                    <div>
                                                        <p className="text-sm text-gray-600">Role</p>
                                                        <p className="text-primary font-medium">{user.lastRole}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                    <Calendar className="w-5 h-5 text-primary" />
                                                    <div>
                                                        <p className="text-sm text-gray-600">Member since</p>
                                                        <p className="text-primary font-medium">{user.joinDate}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Edit Profile Button */}
                                            {/* //TODO
                                    <button className="w-full mt-6 px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                        Edit Profile
                                    </button>
                                    //TODO */}
                                        </div>
                                    </div>

                                    {/* Right Column - Requests */}
                                    <div className="lg:col-span-2">
                                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                                            {/* Requests Header */}
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                                                <div>
                                                    <h2 className="text-2xl font-bold text-primary">{t("Settings.MyRequests")}</h2>
                                                    <p className="text-gray-600 mt-1">{t("Settings.MyRequestsSubTitle")}</p>
                                                </div>
                                                {requests && requests?.data.length > 0 ? (
                                                    <button
                                                        onClick={() => navigate("/servicespage")}
                                                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mt-4 sm:mt-0">
                                                        <Plus className="w-5 h-5" />
                                                        {t("Settings.newRequest")}
                                                    </button>
                                                ) : null}
                                            </div>
                                            <Requests requests={requests?.data} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                    {/* Security Tab Content */}
                    {activeTab === 'security' && (
                        <Security changePasswordMutation={changePasswordMutation} getStatusLabel={getStatusLabel} getStatusStyles={getStatusStyles} />
                    )}
                </div>
            </div>
        </>
    );
}