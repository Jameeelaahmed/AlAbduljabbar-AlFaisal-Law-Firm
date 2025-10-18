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

// Helper: Map Formik values to match the new API structure
const mapToBackendDto = (values) => ({
    entitySettings: {
        companySummary: values.entitySettings.companySummary,
        journeyMilestones: values.entitySettings.journeyMilestones.map(milestone => ({
            year: milestone.year,
            titleEn: milestone.titleEn,
            titleAr: milestone.titleAr,
            descriptionEn: milestone.descriptionEn,
            descriptionAr: milestone.descriptionAr
        })),
        coreValues: values.entitySettings.coreValues.map(cv => ({
            photoUrl: cv.photoUrl,
            titleEn: cv.titleEn,
            titleAr: cv.titleAr,
            descriptionEn: cv.descriptionEn,
            descriptionAr: cv.descriptionAr
        })),
        baseOfOurSuccess: {
            headlineEn: values.entitySettings.baseOfOurSuccess.headlineEn,
            headlineAr: values.entitySettings.baseOfOurSuccess.headlineAr,
            bases: values.entitySettings.baseOfOurSuccess.bases.map(base => ({
                photoUrl: base.photoUrl,
                titleEn: base.titleEn,
                titleAr: base.titleAr,
                descriptionEn: base.descriptionEn,
                descriptionAr: base.descriptionAr
            }))
        }
    },
    lawyers: values.lawyers.map(lawyer => ({
        id: lawyer.id,
        photoUrl: lawyer.photoUrl,
        nameEn: lawyer.nameEn,
        nameAr: lawyer.nameAr,
        positionEn: lawyer.positionEn,
        positionAr: lawyer.positionAr,
        specializationEn: lawyer.specializationEn,
        specializationAr: lawyer.specializationAr,
        descriptionEn: lawyer.descriptionEn,
        descriptionAr: lawyer.descriptionAr,
        yearsOfExperience: lawyer.yearsOfExperience,
        linkedIn: lawyer.linkedIn,
        gmail: lawyer.gmail
    })),
    clientReviews: values.clientReviews.map(review => ({
        id: review.id,
        nameEn: review.nameEn,
        nameAr: review.nameAr,
        clientOfEn: review.clientOfEn,
        clientOfAr: review.clientOfAr,
        reviewEn: review.reviewEn,
        reviewAr: review.reviewAr
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
                journeyMilestones: [{
                    year: new Date().getFullYear(),
                    titleEn: '',
                    titleAr: '',
                    descriptionEn: '',
                    descriptionAr: ''
                }],
                coreValues: [{
                    photoUrl: '',
                    titleEn: '',
                    titleAr: '',
                    descriptionEn: '',
                    descriptionAr: ''
                }],
                baseOfOurSuccess: {
                    headlineEn: '',
                    headlineAr: '',
                    bases: [{
                        photoUrl: '',
                        titleEn: '',
                        titleAr: '',
                        descriptionEn: '',
                        descriptionAr: ''
                    }]
                }
            },
            lawyers: [{
                id: 0,
                photoUrl: '',
                nameEn: '',
                nameAr: '',
                positionEn: '',
                positionAr: '',
                specializationEn: '',
                specializationAr: '',
                descriptionEn: '',
                descriptionAr: '',
                yearsOfExperience: 0,
                linkedIn: '',
                gmail: ''
            }],
            clientReviews: [{
                id: 0,
                nameEn: '',
                nameAr: '',
                clientOfEn: '',
                clientOfAr: '',
                reviewEn: '',
                reviewAr: ''
            }]
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
                entitySettings: {
                    companySummary: data.entitySettings?.companySummary || {
                        yearsOfExperience: 0,
                        satisfiedClients: 0,
                        finishedCases: 0,
                        successRate: 0
                    },
                    journeyMilestones: data.entitySettings?.journeyMilestones?.length 
                        ? data.entitySettings.journeyMilestones 
                        : [{
                            year: new Date().getFullYear(),
                            titleEn: '',
                            titleAr: '',
                            descriptionEn: '',
                            descriptionAr: ''
                        }],
                    coreValues: data.entitySettings?.coreValues?.length 
                        ? data.entitySettings.coreValues 
                        : [{
                            photoUrl: '',
                            titleEn: '',
                            titleAr: '',
                            descriptionEn: '',
                            descriptionAr: ''
                        }],
                    baseOfOurSuccess: {
                        headlineEn: data.entitySettings?.baseOfOurSuccess?.headlineEn || '',
                        headlineAr: data.entitySettings?.baseOfOurSuccess?.headlineAr || '',
                        bases: data.entitySettings?.baseOfOurSuccess?.bases?.length 
                            ? data.entitySettings.baseOfOurSuccess.bases 
                            : [{
                                photoUrl: '',
                                titleEn: '',
                                titleAr: '',
                                descriptionEn: '',
                                descriptionAr: ''
                            }]
                    }
                },
                lawyers: data.lawyers?.length 
                    ? data.lawyers 
                    : [{
                        id: 0,
                        photoUrl: '',
                        nameEn: '',
                        nameAr: '',
                        positionEn: '',
                        positionAr: '',
                        specializationEn: '',
                        specializationAr: '',
                        descriptionEn: '',
                        descriptionAr: '',
                        yearsOfExperience: 0,
                        linkedIn: '',
                        gmail: ''
                    }],
                clientReviews: data.clientReviews?.length 
                    ? data.clientReviews 
                    : [{
                        id: 0,
                        nameEn: '',
                        nameAr: '',
                        clientOfEn: '',
                        clientOfAr: '',
                        reviewEn: '',
                        reviewAr: ''
                    }]
            });
        }
    }, [data]);

    // Mutation for saving
    const mutation = useMutation({
        mutationFn: async (values) => {
            // Validate required fields
            if (!values.entitySettings?.baseOfOurSuccess?.headlineEn?.trim() || 
                !values.entitySettings?.baseOfOurSuccess?.headlineAr?.trim()) {
                formik.setFieldTouched('entitySettings.baseOfOurSuccess.headlineEn', true);
                formik.setFieldTouched('entitySettings.baseOfOurSuccess.headlineAr', true);
                throw new Error('Please fill in both English and Arabic headline fields in the "Base of Our Success" section before saving.');
            }
            
            // Validate base items
            if (values.entitySettings?.baseOfOurSuccess?.bases?.some(base => 
                !base.titleEn?.trim() || !base.titleAr?.trim() || 
                !base.descriptionEn?.trim() || !base.descriptionAr?.trim()
            )) {
                throw new Error('Please fill in all required fields in the "Base of Our Success" section.');
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
