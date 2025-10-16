import React, { useState, useCallback, memo, useMemo } from 'react';
import { useAllCategories } from '../../../hooks/useCategories';
import { useGetAllConsultationTypes, useCreateConsultationRequest } from '../../../hooks/useConsultations';
import { useTranslation } from 'react-i18next';
const ConsultationTypesGrid = memo(function ConsultationTypesGrid({ types, onSelect }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {types?.filter(t => t.isAvailable).map((type) => (
                <button
                    key={type.id}
                    onClick={() => onSelect(type.id)}
                    className="p-6 border-2 border-primary/10 rounded-xl hover:border-accent hover:shadow-md transition-all duration-200 text-left group"
                >
                    <h3 className="font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                        {type.name}
                    </h3>
                </button>
            ))}
        </div>
    );
});

const CategoriesGrid = memo(function CategoriesGrid({ categories, selectedCategoryId, onChoose }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories?.map((categoryData) => (
                <button
                    key={categoryData.id}
                    type="button"
                    onClick={() => onChoose(categoryData.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${selectedCategoryId === categoryData.id
                        ? 'border-accent bg-text/5'
                        : 'border-text/10 hover:border-[#006b63]/50'
                        }`}
                >
                    <span className={`font-medium ${selectedCategoryId === categoryData.id ? 'text-accent' : 'text-primary'}`}>
                        {categoryData.name}
                    </span>
                </button>
            ))}
        </div>
    );
});

const ConsultationPage = () => {
    const [formData, setFormData] = useState({
        consultationType: '',
        lawType: '',
        title: '',
        description: '',
        categoryId: ''
    });
    const { t } = useTranslation()
    const { data: categoriesData } = useAllCategories();
    const { data: consultationTypes } = useGetAllConsultationTypes();
    const { mutate: createConsultation, isLoading: isCreating, error: createError } = useCreateConsultationRequest();

    const [activeStep, setActiveStep] = useState(0);

    const goBack = useCallback(() => {
        setActiveStep((s) => Math.max(0, s - 1));
    }, []);

    const goNext = useCallback(() => {
        setActiveStep((s) => s + 1);
    }, []);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, [setFormData]);

    const handleConsultationTypeSelect = useCallback((typeId) => {
        setFormData(prev => ({ ...prev, consultationType: typeId }));
        setActiveStep(1);
    }, [setFormData, setActiveStep]);

    const handleChooseCategory = useCallback((categoryId) => {
        setFormData(prev => ({ ...prev, categoryId }));
        setActiveStep(2);
    }, [setFormData, setActiveStep]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const payload = {
            title: formData.title,
            description: formData.description,
            consultationID: Number(formData.consultationType),
            categoryID: Number(formData.categoryId)
        };
        createConsultation(payload, {
            onSuccess: () => {
                setFormData({
                    consultationType: '',
                    lawType: '',
                    title: '',
                    description: '',
                    categoryId: ''
                });
                setActiveStep(0);
            }
        });
    }, [formData, createConsultation, setFormData, setActiveStep]);

    const selectedConsultationTypeName = useMemo(() => {
        if (!consultationTypes || !formData.consultationType) return '';
        const found = consultationTypes.find(ct => String(ct.id) === String(formData.consultationType));
        return found?.name || String(formData.consultationType);
    }, [consultationTypes, formData.consultationType]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f4f5f3] to-[#e8e9e7] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto mt-20">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#003a42] mb-6">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-[#003a42] mb-4 font-serif">
                        {t("Legal Consultation Request")}
                    </h1>
                    <p className="text-lg text-[#1f1f1f] max-w-2xl mx-auto opacity-80">
                        {t("Begin your legal journey with our expert team. Select your consultation type and provide case details below.")}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Progress Sidebar */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-sm border border-primary/10 p-6 sticky top-8">
                            <h3 className="font-serif font-bold text-primary mb-6 text-lg">{t("Consultation Steps")}</h3>
                            <div className="space-y-4">
                                {[t('Consultation Type'), t('Legal Area'), t('Case Details')].map((step, index) => (
                                    <div key={step} className="flex items-center space-x-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${index === activeStep
                                            ? 'bg-accent border-accent text-white'
                                            : index < activeStep
                                                ? 'bg-secondary border-secondary text-white'
                                                : 'border-primary/30 text-primary/50'
                                            }`}>
                                            {index < activeStep ? '✓' : index + 1}
                                        </div>
                                        <span className={`font-medium ${index === activeStep ? 'text-primary' : 'text-text/60'
                                            }`}>
                                            {step}
                                        </span>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* Main Form Content */}
                    <div className="lg:col-span-9">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {/* Step 1: Consultation Type Selection */}
                            {activeStep === 0 && (
                                <div className="p-8">
                                    <h2 className="text-2xl font-serif font-bold text-primary mb-2">{t("Select Consultation Type")}</h2>
                                    <p className="text-text/70 mb-8">{t("Choose the type of consultation that best fits your needs")}</p>

                                    <ConsultationTypesGrid types={consultationTypes} onSelect={handleConsultationTypeSelect} />
                                </div>
                            )}

                            {/* Step 2 & 3: Form Inputs */}
                            {(activeStep === 1 || activeStep === 2) && (
                                <form onSubmit={handleSubmit} className="p-8">
                                    {/* Selected Consultation Type Display */}
                                    {formData.consultationType && (
                                        <div className="mb-6 p-4 bg-bg rounded-lg border border-text/20">
                                            <p className="text-sm text-secondary">
                                                <span className="font-semibold">{t("Selected:")}</span> {selectedConsultationTypeName || formData.consultationType}
                                            </p>
                                        </div>
                                    )}


                                    <div className="space-y-8">
                                        {/* Law Type Selection */}
                                        {activeStep >= 1 && (
                                            <div>
                                                <label htmlFor="lawType" className="block text-lg font-serif font-bold text-primary mb-4">
                                                    {t("Area of Law *")}
                                                </label>
                                                <CategoriesGrid categories={categoriesData} selectedCategoryId={formData.categoryId} onChoose={handleChooseCategory} />
                                            </div>
                                        )}

                                        {/* Case Details */}
                                        {activeStep >= 2 && (
                                            <div className="space-y-6">
                                                <div>
                                                    <label htmlFor="title" className="block text-lg font-serif font-bold text-primary mb-3">
                                                        {t("Case Title *")}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="title"
                                                        name="title"
                                                        value={formData.title}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder={t("e.g., Employment Contract Dispute")}
                                                        className="w-full px-4 py-3 border-2 border-text/10 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="description" className="block text-lg font-serif font-bold text-[#003a42] mb-3">
                                                        {t("Case Description *")}
                                                    </label>
                                                    <textarea
                                                        id="description"
                                                        name="description"
                                                        rows={6}
                                                        value={formData.description}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder={t("Please describe your legal situation in detail...")}
                                                        className="w-full px-4 py-3 border-2 border-primary/10 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 resize-none"
                                                    />
                                                </div>

                                                {/* Back button visible on steps 1 and 2 */}
                                            </div>

                                        )}
                                        {/* Navigation Buttons */}
                                        <div className="flex justify-between pt-6">
                                            {activeStep > 0 && (
                                                <div className="mb-6">
                                                    <button
                                                        type="button"
                                                        onClick={goBack}
                                                        className="px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-200 font-semibold"
                                                    >
                                                        {t("Back")}
                                                    </button>
                                                </div>
                                            )}
                                            {/* Next on steps 0 and 1, Submit on final step (2) */}
                                            {activeStep < 2 ? (
                                                <button
                                                    type="button"
                                                    onClick={goNext}
                                                    disabled={
                                                        (activeStep === 0 && !formData.consultationType) ||
                                                        (activeStep === 1 && !formData.categoryId)
                                                    }
                                                    className="px-8 py-3 bg-accent text-white rounded-lg hover:bg-accent transition-colors duration-200 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {t("Next")}
                                                </button>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    disabled={isCreating}
                                                    className="px-8 py-3 bg-accent text-white rounded-lg hover:bg-accent transition-colors duration-200 font-semibold shadow-lg disabled:opacity-50"
                                                >
                                                    {isCreating ? t('Submitting...') : t('Submit Request')}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Trust Indicators */}
                        {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#003a42]/5">
                                <div className="text-accent font-bold text-lg">24h</div>
                                <div className="text-sm text-text/70">Response Time</div>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#003a42]/5">
                                <div className="text-accent font-bold text-lg">100%</div>
                                <div className="text-sm text-text/70">Confidential</div>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#003a42]/5">
                                <div className="text-accent font-bold text-lg">Free</div>
                                <div className="text-sm text-text/70">Initial Assessment</div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultationPage;