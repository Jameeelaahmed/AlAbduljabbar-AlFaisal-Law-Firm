import React, { useState, useCallback, memo, useMemo } from 'react';
import { Check, BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';
import { useAllCategories } from '../../../hooks/useCategories';
import { useGetAllConsultationTypes, useCreateConsultationRequest } from '../../../hooks/useConsultations';
import { useTranslation } from 'react-i18next';

const ConsultationTypesGrid = memo(function ConsultationTypesGrid({ types, onSelect }) {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {types?.filter(t => t.isAvailable).map((type) => (
                <button
                    key={type.id}
                    onClick={() => onSelect(type.id)}
                    className="p-6 border-2 border-primary/10 rounded-xl hover:border-accent hover:shadow-lg transition-all duration-300 ltr:text-left rtl:text-right group bg-white hover:bg-accent/5 transform hover:-translate-y-1"
                >
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                            <Check className="w-6 h-6 text-accent" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-primary mb-2 group-hover:text-accent transition-colors text-lg">
                                {type.name}
                            </h3>
                            <p className="text-text/60 text-sm group-hover:text-text/80">
                                {t('Get expert advice for your legal matters')}
                            </p>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
});

const CategoriesGrid = memo(function CategoriesGrid({ categories, selectedCategoryId, onChoose }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories?.map((categoryData) => (
                <button
                    key={categoryData.id}
                    type="button"
                    onClick={() => onChoose(categoryData.id)}
                    className={`p-6 rounded-xl border-2 ltr:text-left rtl:text-right transition-all duration-300 transform hover:-translate-y-0.5 ${selectedCategoryId === categoryData.id
                        ? 'border-accent bg-accent/5 shadow-md scale-[1.02]'
                        : 'border-text/10 hover:border-accent/50 bg-white hover:shadow-md'
                        }`}
                >
                    <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${selectedCategoryId === categoryData.id ? 'bg-accent' : 'bg-text/30'
                            }`} />
                        <span className={`font-semibold text-lg ${selectedCategoryId === categoryData.id ? 'text-accent' : 'text-primary'
                            }`}>
                            {categoryData.name}
                        </span>
                    </div>
                </button>
            ))}
        </div>
    );
});

const StepIndicator = memo(function StepIndicator({ steps, currentStep }) {
    return (
        <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
                {steps.map((step, index) => (
                    <React.Fragment key={step}>
                        <div className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-semibold border-2 transition-all duration-300 ${index === currentStep
                                ? 'bg-accent border-accent text-white shadow-lg scale-110'
                                : index < currentStep
                                    ? 'bg-secondary border-secondary text-white'
                                    : 'border-primary/20 text-primary/40 bg-white'
                                }`}>
                                {index < currentStep ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    index + 1
                                )}
                            </div>
                            <span className={`mt-2 text-sm font-medium hidden sm:block ${index === currentStep ? 'text-accent' : 'text-text/60'
                                }`}>
                                {step}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`w-16 h-1 rounded-full transition-all duration-300 ${index < currentStep ? 'bg-secondary' : 'bg-text/20'
                                }`} />
                        )}
                    </React.Fragment>
                ))}
            </div>
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
    const { t } = useTranslation();
    const { data: categoriesData } = useAllCategories();
    const { data: consultationTypes } = useGetAllConsultationTypes();
    const { mutate: createConsultation, isLoading: isCreating } = useCreateConsultationRequest();

    const [activeStep, setActiveStep] = useState(0);

    const steps = [t('Consultation Type'), t('Legal Area'), t('Case Details')];

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

    const isStepValid = useMemo(() => {
        switch (activeStep) {
            case 0: return formData.consultationType;
            case 1: return formData.categoryId;
            case 2: return formData.title && formData.description;
            default: return false;
        }
    }, [activeStep, formData]);

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
            {/* Hero header (same style as Contact Us hero) */}
            <section className="bg-primary text-white pt-28 pb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {t("Legal Consultation Request")}
                    </h1>
                    <p className="text-xl max-w-2xl mx-auto">
                        {t("Begin your legal journey with our expert team. Select your consultation type and provide case details below.")}
                    </p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Step Indicator */}
                <StepIndicator steps={steps} currentStep={activeStep} />
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-primary/10">
                    {/* Step 1: Consultation Type Selection */}
                    {activeStep === 0 && (
                        <div className="p-10">
                            <div className="mb-8">
                                <h2 className="text-3xl font-serif font-bold text-primary mb-3">{t("Select Consultation Type")}</h2>
                                <p className="text-text/70 text-lg">{t("Choose the type of consultation that best fits your needs")}</p>
                            </div>

                            <ConsultationTypesGrid types={consultationTypes} onSelect={handleConsultationTypeSelect} />
                        </div>
                    )}

                    {/* Step 2 & 3: Form Inputs */}
                    {(activeStep === 1 || activeStep === 2) && (
                        <form onSubmit={handleSubmit} className="p-10">
                            {/* Selected Consultation Type Display */}
                            {formData.consultationType && (
                                <div className="mb-8 p-6 ltr:bg-linear-to-r rtl:bg-linear-to-l from-accent/5 to-accent/10 rounded-xl border border-accent/20">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                                            <Check className="w-4 h-4 text-accent" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-secondary font-semibold">
                                                {t("Selected consultation type:")} <span className="text-accent">{selectedConsultationTypeName || formData.consultationType}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-10">
                                {/* Law Type Selection */}
                                {activeStep >= 1 && (
                                    <div>
                                        <div className="mb-8">
                                            <h2 className="text-3xl font-serif font-bold text-primary mb-3">{t("Area of Law")}</h2>
                                            <p className="text-text/70 text-lg">{t("Select the legal area that matches your case")}</p>
                                        </div>
                                        <CategoriesGrid
                                            categories={categoriesData}
                                            selectedCategoryId={formData.categoryId}
                                            onChoose={handleChooseCategory}
                                        />
                                    </div>
                                )}

                                {/* Case Details */}
                                {activeStep >= 2 && (
                                    <div className="space-y-8">
                                        <div>
                                            <h2 className="text-3xl font-serif font-bold text-primary mb-8">{t("Case Details")}</h2>

                                            <div className="space-y-6">
                                                <div>
                                                    <label htmlFor="title" className="block text-lg font-semibold text-primary mb-3">
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
                                                        className="w-full px-4 py-4 border-2 border-text/10 rounded-xl focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-200 text-lg"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="description" className="block text-lg font-semibold text-primary mb-3">
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
                                                        className="w-full px-4 py-4 border-2 border-text/10 rounded-xl focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-200 resize-none text-lg leading-relaxed"
                                                    />
                                                    <p className="text-sm text-text/60 mt-2">
                                                        {t("Please include relevant dates, parties involved, and specific legal concerns")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex justify-between items-center pt-8 border-t border-primary/10">
                                    {activeStep > 0 && (
                                        <button
                                            type="button"
                                            onClick={goBack}
                                            className="px-8 py-4 border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-200 font-semibold text-lg flex items-center space-x-2"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                            <span>{t("Back")}</span>
                                        </button>
                                    )}

                                    {activeStep < 2 ? (
                                        <button
                                            type="button"
                                            onClick={goNext}
                                            disabled={!isStepValid}
                                            className="px-10 py-4 bg-accent text-white rounded-xl hover:bg-accent/90 transition-all duration-200 font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transform hover:scale-105 ltr:ml-auto rtl:mr-auto flex items-center space-x-2"
                                        >
                                            <span>{t("Continue")}</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={isCreating || !isStepValid}
                                            className="px-12 py-4 ltr:bg-linear-to-r rtl:bg-linear-to-l from-accent to-accent/90 text-white rounded-xl hover:from-accent/90 hover:to-accent/80 transition-all duration-200 font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transform hover:scale-105 ltr:ml-auto rtl:mr-auto flex items-center space-x-2"
                                        >
                                            {isCreating ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    <span>{t('Submitting...')}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>{t('Submit Request')}</span>
                                                    <ArrowRight className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConsultationPage;