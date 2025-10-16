// components
import { CompanySummarySection } from '../../../components/AdminComponents/Settings/CompanySummarySection';
import { JourneyMilestonesSection } from '../../../components/AdminComponents/Settings/JourneyMilestonesSection';
import { CoreValuesSection } from '../../../components/AdminComponents/Settings/CoreValuesSection';
import { BaseOfSuccessSection } from '../../../components/AdminComponents/Settings/BaseOfSuccessSection';
import { LawyersSection } from '../../../components/AdminComponents/Settings/LawyersSection';
import { ClientReviewsSection } from '../../../components/AdminComponents/Settings/ClientReviewsSection';
import SliderSection from '../../../components/AdminComponents/Settings/SliderSection';
import { useTranslation } from 'react-i18next';

//
import React, { useState, useEffect } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useFormik, FormikProvider } from "formik";
import { AlertCircle, Save, CheckCircle } from "lucide-react";
import api from '../../../api/axiosInstance';
import { uploadPendingImages } from '../../../utils/imageUploadHelper';
import { useUnsavedChanges, useBlockNavigation } from '../../../hooks/useUnsavedChanges';
import { toast } from 'react-toastify';

// Helper: Map Formik lowercase keys to backend PascalCase
const mapToBackendDto = (values) => ({
    EntitySettings: {
        CompanySummary: values.entitySettings.companySummary,
        JourneyMilestones: values.entitySettings.journeyMilestones,
        CoreValues: values.entitySettings.coreValues.map(cv => ({
            PhotoUrl: cv.photoUrl,
            Title: cv.title,
            Description: cv.description
        })),
        BaseOfOurSuccess: {
            Headline: values.entitySettings.baseOfOurSuccess.headline,
            Bases: values.entitySettings.baseOfOurSuccess.bases.map(base => ({
                PhotoUrl: base.photoUrl,
                Title: base.title,
                Description: base.description
            }))
        }
    },
    Lawyers: values.lawyers.map(l => ({
        Id: l.id,
        PhotoUrl: l.photoUrl,
        Name: l.name,
        Position: l.position,
        Specialization: l.specialization,
        Description: l.description,
        YearsOfExperience: l.yearsOfExperience,
        LinkedIn: l.linkedIn,
        Gmail: l.gmail
    })),
    ClientReviews: values.clientReviews.map(c => ({
        Id: c.id,
        Name: c.name,
        ClientOf: c.clientOf,
        Review: c.review
    }))
});

// Main SettingsPage Component
export default function SettingsPage() {
    const queryClient = useQueryClient();
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [activeTab, setActiveTab] = useState('settings');
    const { t } = useTranslation();

    useUnsavedChanges(hasUnsavedChanges);
    useBlockNavigation(hasUnsavedChanges);

    // Fetch homepage data
    const { data, isLoading, error } = useQuery({
        queryKey: ['homepage'],
        queryFn: async () => {
            const { data: response } = await api.get('/api/Homepage');
            if (!response.isSuccess) throw new Error('Failed to fetch data');
            return response.data;
        }
    });

    // Formik
    const formik = useFormik({
        initialValues: {
            entitySettings: {
                companySummary: {
                    yearsOfExperience: 0,
                    satisfiedClients: 0,
                    finishedCases: 0,
                    successRate: 0
                },
                journeyMilestones: [],
                coreValues: [],
                baseOfOurSuccess: {
                    headline: '',
                    bases: []
                }
            },
            lawyers: [],
            clientReviews: []
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            mutation.mutate(values);
        }
    });

    // Track unsaved changes
    useEffect(() => {
        if (formik.dirty) setHasUnsavedChanges(true);
    }, [formik.dirty, formik.values]);

    // Populate Formik when data is fetched
    useEffect(() => {
        if (data) {
            formik.setValues({
                ...data,
                entitySettings: {
                    ...data.entitySettings,
                    baseOfOurSuccess: {
                        headline: data.entitySettings?.baseOfOurSuccess?.headline || '',
                        bases: data.entitySettings?.baseOfOurSuccess?.bases || []
                    }
                }
            });
        }
    }, [data]);

    // Mutation for saving
    const mutation = useMutation({
        mutationFn: async (values) => {
            // Validate required headline
            if (!values.entitySettings?.baseOfOurSuccess?.headline?.trim()) {
                formik.setFieldTouched('entitySettings.baseOfOurSuccess.headline', true);
                throw new Error('Please fill in the headline field in the "Base of Our Success" section before saving.');
            }

            // Upload images first
            await uploadPendingImages(values, formik.setFieldValue);

            // Map to backend DTO
            const dto = mapToBackendDto(values);

            // Submit directly (no extra { dto })
            const response = await api.put('/api/Homepage', dto);

            if (!response.data.isSuccess) {
                throw new Error(response.data.error?.description || 'Failed to update data');
            }

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['homepage']);
            setHasUnsavedChanges(false);
            toast.success('Settings saved successfully!');
        },
        onError: (error) => {
            console.error('Save error:', error);
            toast.error(error.message || 'Failed to save settings');
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#f4f5f3] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#003a42] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading settings...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#f4f5f3] flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                    <div className="flex items-center gap-3 text-red-600 mb-4">
                        <AlertCircle size={24} />
                        <h2 className="text-xl font-semibold">Error Loading Data</h2>
                    </div>
                    <p className="text-gray-600">{error.message}</p>
                </div>
            </div>
        );
    }

    // Tab content based on active tab
    const renderTabContent = () => {
        if (activeTab === 'settings') {
            return (
                <form onSubmit={formik.handleSubmit} className="space-y-8">
                    <CompanySummarySection formik={formik} />
                    <JourneyMilestonesSection formik={formik} />
                    <CoreValuesSection formik={formik} />
                    <BaseOfSuccessSection formik={formik} />
                    <LawyersSection formik={formik} />
                    <ClientReviewsSection formik={formik} />

                    {/* Bottom Save Button */}
                    <div className="flex justify-end pt-6 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={mutation.isLoading}
                            className="flex items-center gap-2 px-8 py-3 bg-[#003a42] text-white rounded-lg hover:bg-[#004a52] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg"
                        >
                            {mutation.isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    {t('common.saving')}...
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    {t('common.saveAllChanges')}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            );
        } else if (activeTab === 'sliders') {
            return <SliderSection />;
        }
        return null;
    };

    return (
        <FormikProvider value={formik}>
            <div className="min-h-screen bg-[#f4f5f3]">
                {/* Header */}
                <div className="bg-[#003a42] text-white shadow-lg sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div>
                                <h1 className="text-2xl font-bold">{t('Settings.title')}</h1>
                                <p className="text-gray-300 text-sm mt-1">{t('Settings.subTitle')}</p>
                            </div>
                            {activeTab === 'settings' && (
                                <button
                                    onClick={() => formik.submitForm()}
                                    disabled={mutation.isLoading}
                                    type="button"
                                    className="flex items-center gap-2 px-6 py-3 bg-[#006b63] text-white rounded-lg hover:bg-[#007b73] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md"
                                >
                                    {mutation.isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            {t('common.saving')}...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={20} />
                                            {t('common.saveChanges')}
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                        
                        {/* Tabs */}
                        <div className="flex border-b border-[#006b63]">
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`px-4 py-3 font-medium text-sm ${
                                    activeTab === 'settings'
                                        ? 'bg-[#006b63] text-white'
                                        : 'text-gray-200 hover:bg-[#005a54]'
                                }`}
                            >
                                {t('Settings.title')}
                            </button>
                            <button
                                onClick={() => setActiveTab('sliders')}
                                className={`px-4 py-3 font-medium text-sm ${
                                    activeTab === 'sliders'
                                        ? 'bg-[#006b63] text-white'
                                        : 'text-gray-200 hover:bg-[#005a54]'
                                }`}
                            >
                                {t('slider.manageSlider')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                {mutation.isSuccess && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                            <CheckCircle className="text-green-600" size={24} />
                            <p className="text-green-800 font-medium">
                                {activeTab === 'settings' 
                                    ? t('settings.savedSuccess') 
                                    : t('slider.savedSuccess')}
                            </p>
                        </div>
                    </div>
                )}
                {mutation.isError && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                            <AlertCircle className="text-red-600" size={24} />
                            <p className="text-red-800 font-medium">
                                {mutation.error.message || t('error.generic')}
                            </p>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {renderTabContent()}
                </div>

                <div className="h-16"></div>
            </div>
        </FormikProvider>
    );
}
