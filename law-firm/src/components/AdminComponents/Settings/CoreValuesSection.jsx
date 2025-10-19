// CoreValuesSection Component
import { Plus, Trash2 } from "lucide-react";
import { ImageUpload } from './ImageUpload';
import { useTranslation } from 'react-i18next';
import { Field, FieldArray, ErrorMessage, getIn } from 'formik';

export const CoreValuesSection = ({ formik }) => {
    const { t } = useTranslation();
    const values = formik.values?.entitySettings?.coreValues || [];

    const getErrorClass = (name) => {
        const touched = getIn(formik.touched, name);
        const error = getIn(formik.errors, name);
        return touched && error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-[#003a42]';
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#003a42]">{t('Settings.coreValues.title')}</h2>
            </div>

            <FieldArray name="entitySettings.coreValues">
                {({ push, remove }) => (
                    <>
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={() => push({
                                    photoUrl: '',
                                    titleEn: '',
                                    titleAr: '',
                                    descriptionEn: '',
                                    descriptionAr: ''
                                })}
                                type="button"
                                className="flex items-center gap-2 px-4 py-2 bg-[#003a42] text-white rounded-lg hover:bg-[#004a52] transition-colors text-sm"
                            >
                                <Plus size={16} />
                                {t('Settings.coreValues.addValue')}
                            </button>
                        </div>

                        <div className="space-y-6">
                            {values.map((value, index) => {
                                const base = `entitySettings.coreValues[${index}]`;
                                return (
                                    <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-sm font-medium text-[#7a5a21]">
                                                {t('Settings.coreValues.value')} {index + 1}
                                            </h3>
                                            <button
                                                onClick={() => remove(index)}
                                                type="button"
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                                aria-label={t('common.delete')}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <ImageUpload
                                                    name={`${base}.photoUrl`}
                                                    value={value.photoUrl}
                                                    onChange={(url) => formik.setFieldValue(`${base}.photoUrl`, url)}
                                                    label={t('Settings.coreValues.photo')}
                                                />
                                                <ErrorMessage name={`${base}.photoUrl`} component="div" className="text-red-500 text-sm mt-1" />
                                            </div>

                                            {/* English Title */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('Settings.coreValues.titleEn')} *
                                                </label>
                                                <Field
                                                    type="text"
                                                    name={`${base}.titleEn`}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${base}.titleEn`)}`}
                                                />
                                                <ErrorMessage name={`${base}.titleEn`} component="div" className="text-red-500 text-sm mt-1" />
                                            </div>

                                            {/* Arabic Title */}
                                            <div className="rtl">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('Settings.coreValues.titleAr')} *
                                                </label>
                                                <Field
                                                    type="text"
                                                    name={`${base}.titleAr`}
                                                    dir="rtl"
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${base}.titleAr`)}`}
                                                />
                                                <ErrorMessage name={`${base}.titleAr`} component="div" className="text-red-500 text-sm mt-1" />
                                            </div>

                                            {/* English Description */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('Settings.coreValues.descriptionEn')} *
                                                </label>
                                                <Field
                                                    as="textarea"
                                                    rows={3}
                                                    name={`${base}.descriptionEn`}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${base}.descriptionEn`)}`}
                                                />
                                                <ErrorMessage name={`${base}.descriptionEn`} component="div" className="text-red-500 text-sm mt-1" />
                                            </div>

                                            {/* Arabic Description */}
                                            <div className="rtl">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('Settings.coreValues.descriptionAr')} *
                                                </label>
                                                <Field
                                                    as="textarea"
                                                    rows={3}
                                                    name={`${base}.descriptionAr`}
                                                    dir="rtl"
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${base}.descriptionAr`)}`}
                                                />
                                                <ErrorMessage name={`${base}.descriptionAr`} component="div" className="text-red-500 text-sm mt-1" />
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