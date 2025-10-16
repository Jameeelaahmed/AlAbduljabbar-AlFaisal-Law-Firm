// components
import { CompanySummarySection } from '../../../components/AdminComponents/Settings/CompanySummarySection';
import { JourneyMilestonesSection } from '../../../components/AdminComponents/Settings/JourneyMilestonesSection'
import { CoreValuesSection } from '../../../components/AdminComponents/Settings/CoreValuesSection'
import { BaseOfSuccessSection } from '../../../components/AdminComponents/Settings/BaseOfSuccessSection'
import { LawyersSection } from '../../../components/AdminComponents/Settings/LawyersSection'
import { ClientReviewsSection } from '../../../components/AdminComponents/Settings/ClientReviewsSection'
//
import React, { useState } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useFormik, FormikProvider } from "formik";
import { AlertCircle, Save } from "lucide-react";
import api from '../../../api/axiosInstance'
import { uploadPendingImages } from '../../../utils/imageUploadHelper';
import { useUnsavedChanges, useBlockNavigation } from '../../../hooks/useUnsavedChanges';
import { toast } from 'react-toastify';
// Main SettingsPage Component
export default function SettingsPage() {
    const queryClient = useQueryClient();
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    
    // Warn about unsaved changes
    useUnsavedChanges(hasUnsavedChanges);
    useBlockNavigation(hasUnsavedChanges);

    // Fetch homepage data
    const { data, isLoading, error } = useQuery({
        queryKey: ['homepage'],
        queryFn: async () => {
            const { data: response } = await api.get('/api/Homepage');
            console.log(response)
            if (!response.isSuccess) throw new Error('Failed to fetch data');
            return response.data;
        }
    });

    // Update mutation
    const mutation = useMutation({
        mutationFn: async (values) => {
            // Validate required fields
            if (!values.entitySettings?.baseOfOurSuccess?.Headline || values.entitySettings.baseOfOurSuccess.Headline.trim() === '') {
                // Mark field as touched to show error
                formik.setFieldTouched('entitySettings.baseOfOurSuccess.Headline', true);
                throw new Error('Please fill in the Headline field in the "Base of Our Success" section before saving.');
            }
            
            // First, upload all pending images
            await uploadPendingImages(values, formik.setFieldValue);
            
            // Then submit the form with image URLs wrapped in dto
            const response = await api.put('/api/Homepage', { dto: values });
            if (!response.data.isSuccess) {
                const errorMsg = response.data.error?.description || 'Failed to update data';
                throw new Error(errorMsg);
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

    // Initialize Formik
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
                    Headline: '',
                    bases: []
                }
            },
            lawyers: [],
            clientReviews: []
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            mutation.mutate(values);
        }
    });
    
    // Track form changes
    React.useEffect(() => {
        if (formik.dirty) {
            setHasUnsavedChanges(true);
        }
    }, [formik.dirty, formik.values]);

    // Update formik values when data is fetched
    React.useEffect(() => {
        if (data) {
            // Ensure baseOfOurSuccess has headline field
            const updatedData = {
                ...data,
                entitySettings: {
                    ...data.entitySettings,
                    baseOfOurSuccess: {
                        Headline: data.entitySettings?.baseOfOurSuccess?.Headline || '',
                        bases: data.entitySettings?.baseOfOurSuccess?.bases || []
                    }
                }
            };
            formik.setValues(updatedData);
        }
    }, [data]);

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

    return (
        <FormikProvider value={formik}>
            <div className="min-h-screen bg-[#f4f5f3]">
                {/* Header */}
                <div className="bg-[#003a42] text-white shadow-lg sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold">Homepage Settings</h1>
                                <p className="text-gray-300 text-sm mt-1">Manage your website content</p>
                            </div>
                            <button
                                onClick={formik.handleSubmit}
                                disabled={mutation.isLoading}
                                type="button"
                                className="flex items-center gap-2 px-6 py-3 bg-[#006b63] text-white rounded-lg hover:bg-[#007b73] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md"
                            >
                                {mutation.isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={20} />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Success/Error Messages */}
                {mutation.isSuccess && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                            <CheckCircle className="text-green-600" size={24} />
                            <p className="text-green-800 font-medium">Settings saved successfully!</p>
                        </div>
                    </div>
                )}

                {mutation.isError && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                            <AlertCircle className="text-red-600" size={24} />
                            <p className="text-red-800 font-medium">Failed to save settings. Please try again.</p>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <form onSubmit={formik.handleSubmit} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="space-y-8">
                        {/* Company Summary */}
                        <CompanySummarySection formik={formik} />

                        {/* Journey Milestones */}
                        <JourneyMilestonesSection formik={formik} />

                        {/* Core Values */}
                        <CoreValuesSection formik={formik} />

                        {/* Base of Success */}
                        <BaseOfSuccessSection formik={formik} />

                        {/* Lawyers */}
                        <LawyersSection formik={formik} />

                        {/* Client Reviews */}
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
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={20} />
                                        Save All Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Footer Spacer */}
                <div className="h-16"></div>
            </div>
        </FormikProvider>
    );
}