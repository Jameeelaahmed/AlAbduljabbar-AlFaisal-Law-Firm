import React, { useState } from 'react';
import { User, Mail, Shield, Calendar, Plus, Phone, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useChangePassword } from '../../../hooks/useChangePassword';
import { useRequestsByUserId } from '../../../hooks/useRequests';
import Security from './Security';
import Requests from './requests';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../../hooks/useUserInfo';
import Loading from '../../../components/Common/Loading';

export default function Profile() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const changePasswordMutation = useChangePassword();
    const [activeTab, setActiveTab] = useState('profile');
    const { data: user, isLoading } = useUserInfo();
    const isNotClient = user?.role !== "User";
    const { data: requests } = useRequestsByUserId({
        userId: user?.id,
        pageIndex: 1,
        pageSize: 5
    });
    console.log("user", user)
    if (isLoading) {
        return <Loading />
    }
    return (
        <>
            <div className="min-h-screen bg-bg p-4 md:p-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mt-20 mb-4 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <h1 className="text-3xl font-bold text-primary">{t('Settings.title')}</h1>
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
                                // Non-client layout (Admin / Customer Service)
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
                                            <p className="text-gray-600 text-center mt-1">{user.role} #{user.id}</p>
                                            {user.branchName && (
                                                <p className="text-gray-500 text-sm mt-1">{user.branchName}</p>
                                            )}
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                                <div className="min-w-0">
                                                    <p className="text-sm text-gray-600">{t("Email")}</p>
                                                    <p className="text-primary font-medium truncate">{user.email}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0">
                                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                                </svg>
                                                <div>
                                                    <p className="text-sm text-gray-600">{t("Mobile Number")}</p>
                                                    <p className="text-primary font-medium">{user.mobileNumber || 'Not provided'}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0">
                                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                                </svg>
                                                <div>
                                                    <p className="text-sm text-gray-600">{t("WhatsApp Number")}</p>
                                                    <p className="text-primary font-medium">{user.whatsAppNumber || user.mobileNumber || 'Not provided'}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <Shield className="w-5 h-5 text-primary shrink-0" />
                                                <div>
                                                    <p className="text-sm text-gray-600">{t("Role")}</p>
                                                    <p className="text-primary font-medium capitalize">{user.role?.toLowerCase()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Left Column - Profile Info */}
                                    <div className="lg:col-span-1 space-y-6">
                                        {/* Profile Card */}
                                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                                            {/* Profile Info */}
                                            <div className="flex flex-col items-center mb-6">
                                                <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                                    {user?.profilePicture ? (
                                                        <img
                                                            src={user.profilePicture}
                                                            alt={user.name}
                                                            className="w-32 h-32 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <User className="w-16 h-16 text-primary" />
                                                    )}
                                                </div>
                                                <h2 className="text-2xl font-bold text-primary text-center">{user?.name}</h2>
                                                <p className="text-gray-600 text-center mt-1">
                                                    {user?.role} #{user?.id}
                                                </p>
                                                {user?.branchName && (
                                                    <p className="text-gray-500 text-sm mt-1">{user.branchName}</p>
                                                )}
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                    <Mail className="w-5 h-5 text-primary shrink-0" />
                                                    <div className="min-w-0">
                                                        <p className="text-sm text-gray-600">{t("Email")}</p>
                                                        <p className="text-primary font-medium truncate">{user.email}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0">
                                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-sm text-gray-600">{t("Mobile Number")}</p>
                                                        <p className="text-primary font-medium">{user.mobileNumber || 'Not provided'}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0">
                                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-sm text-gray-600">{t("WhatsApp Number")}</p>
                                                        <p className="text-primary font-medium">{user.whatsAppNumber || user.mobileNumber || 'Not provided'}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                    <Shield className="w-5 h-5 text-primary shrink-0" />
                                                    <div>
                                                        <p className="text-sm text-gray-600">{t("Role")}</p>
                                                        <p className="text-primary font-medium capitalize">{user.role?.toLowerCase()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column - Requests */}
                                    <div className="lg:col-span-2">
                                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                                            {/* Requests Header */}
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                                                <div>
                                                    <h2 className="text-2xl font-bold text-primary">{t("Settings.MyRequests")}</h2>
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
                        <Security changePasswordMutation={changePasswordMutation} />
                    )}
                </div>
            </div>
        </>
    );
}