import React, { useState } from 'react';
import { User, Mail, Shield, Calendar, Phone, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useChangePassword } from '../../../hooks/useChangePassword';
import { useUserInfo } from '../../../hooks/useUserInfo';
import Security from '../../ClientPages/Profile/Security';
import Loading from '../../../components/Common/Loading';

export default function AdminProfile() {
    const { t } = useTranslation();
    const changePasswordMutation = useChangePassword();
    const [activeTab, setActiveTab] = useState('profile');
    const { data: user, isLoading } = useUserInfo();

    if (isLoading) {
        return <Loading />;
    }

    return (
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

                {/* Profile Tab Content */}
                {activeTab === 'profile' && (
                    <div className="max-w-2xl mx-auto">
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
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="text-primary font-medium truncate">{user?.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <Phone className="w-5 h-5 text-primary shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-600">Mobile Number</p>
                                        <p className="text-primary font-medium">{user?.mobileNumber || 'Not provided'}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <MessageSquare className="w-5 h-5 text-primary shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-600">WhatsApp Number</p>
                                        <p className="text-primary font-medium">{user?.whatsAppNumber || user?.mobileNumber || 'Not provided'}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <Shield className="w-5 h-5 text-primary shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-600">Role</p>
                                        <p className="text-primary font-medium capitalize">{user?.role?.toLowerCase()}</p>
                                    </div>
                                </div>

                                {user?.createdAt && (
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <Calendar className="w-5 h-5 text-primary shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-600">Member Since</p>
                                            <p className="text-primary font-medium">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Security Tab Content */}
                {activeTab === 'security' && (
                    <Security
                        changePasswordMutation={changePasswordMutation}
                    />
                )}
            </div>
        </div>
    );
}
