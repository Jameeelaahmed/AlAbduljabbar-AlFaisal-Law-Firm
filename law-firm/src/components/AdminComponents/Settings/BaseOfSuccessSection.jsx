// BaseOfSuccessSection Component
import { Plus, Trash2 } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { useTranslation } from 'react-i18next';
import { Field, FieldArray, ErrorMessage, getIn } from 'formik';

export const BaseOfSuccessSection = ({ formik }) => {
    const { t } = useTranslation();
    const bases = formik.values?.entitySettings?.baseOfOurSuccess?.bases || [];

    const getErrorClass = (name) => {
        const touched = getIn(formik.touched, name);
        const error = getIn(formik.errors, name);
        return touched && error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-[#003a42]';
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-[#003a42] mb-6">
                {t('Settings.baseOfOurSuccess.title')}
            </h2>

            {/* English Headline */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('Settings.baseOfOurSuccess.headlineEn')} <span className="text-red-500">*</span>
                </label>
                <Field
                    type="text"
                    name="entitySettings.baseOfOurSuccess.headlineEn"
                    placeholder={t('Settings.baseOfOurSuccess.headlineEnPlaceholder')}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass('entitySettings.baseOfOurSuccess.headlineEn')}`}
                />
                <ErrorMessage name="entitySettings.baseOfOurSuccess.headlineEn" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            {/* Arabic Headline */}
            <div className="mb-6 rtl">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('Settings.baseOfOurSuccess.headlineAr')} <span className="text-red-500">*</span>
                </label>
                <Field
                    type="text"
                    name="entitySettings.baseOfOurSuccess.headlineAr"
                    placeholder={t('Settings.baseOfOurSuccess.headlineArPlaceholder')}
                    dir="rtl"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass('entitySettings.baseOfOurSuccess.headlineAr')}`}
                />
                <ErrorMessage name="entitySettings.baseOfOurSuccess.headlineAr" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <FieldArray name="entitySettings.baseOfOurSuccess.bases">
                {({ push, remove }) => (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium text-[#7a5a21]">
                                {t('Settings.baseOfOurSuccess.bases')}
                            </h3>
                            <button
                                onClick={() => push({
                                    photoUrl: '',
                                    titleEn: '',
                                    titleAr: '',
                                    descriptionEn: '',
                                    descriptionAr: ''
                                })}
                                type="button"
                                className="flex items-center gap-2 px-4 py-2 bg-[#7a5a21] text-white rounded-lg hover:bg-[#8a6a31] transition-colors text-sm"
                            >
                                <Plus size={16} />
                                {t('common.addBase')}
                            </button>
                        </div>

                        <div className="space-y-6">
                            {bases.map((base, index) => {
                                const basePath = `entitySettings.baseOfOurSuccess.bases[${index}]`;
                                return (
                                    <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                                        <div className="flex justify-between items-center mb-6">
                                            <h4 className="text-sm font-medium text-[#7a5a21]">
                                                {t('Settings.baseOfOurSuccess.photo')} {index + 1}
                                            </h4>
                                            <button
                                                onClick={() => remove(index)}
                                                type="button"
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                                aria-label={t('common.remove')}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        <div className="space-y-6">
                                            {/* Photo Upload */}
                                            <div>
                                                <ImageUpload
                                                    name={`${basePath}.photoUrl`}
                                                    value={base.photoUrl}
                                                    onChange={(url) => formik.setFieldValue(`${basePath}.photoUrl`, url)}
                                                    label={t('common.photo')}
                                                />
                                                <ErrorMessage name={`${basePath}.photoUrl`} component="div" className="text-red-500 text-sm mt-1" />
                                            </div>

                                            {/* English Title */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('common.titleEn')} *
                                                </label>
                                                <Field
                                                    type="text"
                                                    name={`${basePath}.titleEn`}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${basePath}.titleEn`)}`}
                                                />
                                                <ErrorMessage name={`${basePath}.titleEn`} component="div" className="text-red-500 text-sm mt-1" />
                                            </div>

                                            {/* Arabic Title */}
                                            <div className="rtl">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('common.titleAr')} *
                                                </label>
                                                <Field
                                                    type="text"
                                                    name={`${basePath}.titleAr`}
                                                    dir="rtl"
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${basePath}.titleAr`)}`}
                                                />
                                                <ErrorMessage name={`${basePath}.titleAr`} component="div" className="text-red-500 text-sm mt-1" />
                                            </div>

                                            {/* English Description */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('common.descriptionEn')} *
                                                </label>
                                                <Field
                                                    as="textarea"
                                                    rows={3}
                                                    name={`${basePath}.descriptionEn`}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${basePath}.descriptionEn`)}`}
                                                />
                                                <ErrorMessage name={`${basePath}.descriptionEn`} component="div" className="text-red-500 text-sm mt-1" />
                                            </div>

                                            {/* Arabic Description */}
                                            <div className="rtl">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('common.descriptionAr')} *
                                                </label>
                                                <Field
                                                    as="textarea"
                                                    rows={3}
                                                    name={`${basePath}.descriptionAr`}
                                                    dir="rtl"
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${basePath}.descriptionAr`)}`}
                                                />
                                                <ErrorMessage name={`${basePath}.descriptionAr`} component="div" className="text-red-500 text-sm mt-1" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </FieldArray>
        </div>
    );
};