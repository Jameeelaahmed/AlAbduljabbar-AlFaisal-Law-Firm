import { Plus, Trash2 } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { Field, FieldArray, ErrorMessage, getIn } from 'formik';
import { ImageUpload } from './ImageUpload';

export const LawyersSection = ({ formik }) => {
    const { t } = useTranslation();
    const lawyers = formik.values?.lawyers || [];

    const getErrorClass = (name) => {
        const touched = getIn(formik.touched, name);
        const error = getIn(formik.errors, name);
        return touched && error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-[#003a42]';
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#003a42]">{t('Settings.lawyers.title')}</h2>
                <FieldArray name="lawyers">
                    {({ push }) => (
                        <button
                            onClick={() =>
                                push({
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
                                })
                            }
                            type="button"
                            className="flex items-center gap-2 px-4 py-2 bg-[#003a42] text-white rounded-lg hover:bg-[#004a52] transition-colors"
                        >
                            <Plus size={18} />
                            {t('Settings.lawyers.addLawyer')}
                        </button>
                    )}
                </FieldArray>
            </div>

            <FieldArray name="lawyers">
                {({ remove }) => (
                    <div className="space-y-6">
                        {lawyers.map((lawyer, index) => {
                            const base = `lawyers[${index}]`;
                            return (
                                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-sm font-medium text-[#7a5a21]">
                                            {t('Settings.lawyers.lawyer')} {index + 1}
                                        </h3>
                                        <button
                                            onClick={() => remove(index)}
                                            type="button"
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <ImageUpload
                                                name={`${base}.photoUrl`}
                                                value={lawyer.photoUrl}
                                                onChange={(url) => formik.setFieldValue(`${base}.photoUrl`, url)}
                                                label={t('Settings.lawyers.photo')}
                                            />
                                            <ErrorMessage name={`${base}.photoUrl`} component="p" className="mt-1 text-sm text-red-600" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t('Settings.lawyers.nameEn')}
                                            </label>
                                            <Field
                                                type="text"
                                                name={`${base}.nameEn`}
                                                placeholder={t('Settings.lawyers.nameEnPlaceholder')}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${base}.nameEn`)}`}
                                            />
                                            <ErrorMessage name={`${base}.nameEn`} component="p" className="mt-1 text-sm text-red-600" />
                                        </div>

                                        <div className="md:col-span-2 rtl">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t('Settings.lawyers.nameAr')}
                                            </label>
                                            <Field
                                                type="text"
                                                name={`${base}.nameAr`}
                                                dir="rtl"
                                                placeholder={t('Settings.lawyers.nameArPlaceholder')}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent text-right ${getErrorClass(`${base}.nameAr`)}`}
                                            />
                                            <ErrorMessage name={`${base}.nameAr`} component="p" className="mt-1 text-sm text-red-600" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t('Settings.lawyers.positionEn')}
                                            </label>
                                            <Field
                                                type="text"
                                                name={`${base}.positionEn`}
                                                placeholder={t('Settings.lawyers.positionEnPlaceholder')}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${base}.positionEn`)}`}
                                            />
                                            <ErrorMessage name={`${base}.positionEn`} component="p" className="mt-1 text-sm text-red-600" />
                                        </div>

                                        <div className="rtl">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t('Settings.lawyers.positionAr')}
                                            </label>
                                            <Field
                                                type="text"
                                                name={`${base}.positionAr`}
                                                dir="rtl"
                                                placeholder={t('Settings.lawyers.positionArPlaceholder')}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent text-right ${getErrorClass(`${base}.positionAr`)}`}
                                            />
                                            <ErrorMessage name={`${base}.positionAr`} component="p" className="mt-1 text-sm text-red-600" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t('Settings.lawyers.specializationEn')}
                                            </label>
                                            <Field
                                                type="text"
                                                name={`${base}.specializationEn`}
                                                placeholder={t('Settings.lawyers.specializationEnPlaceholder')}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${base}.specializationEn`)}`}
                                            />
                                            <ErrorMessage name={`${base}.specializationEn`} component="p" className="mt-1 text-sm text-red-600" />
                                        </div>

                                        <div className="rtl">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t('Settings.lawyers.specializationAr')}
                                            </label>
                                            <Field
                                                type="text"
                                                name={`${base}.specializationAr`}
                                                dir="rtl"
                                                placeholder={t('Settings.lawyers.specializationArPlaceholder')}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent text-right ${getErrorClass(`${base}.specializationAr`)}`}
                                            />
                                            <ErrorMessage name={`${base}.specializationAr`} component="p" className="mt-1 text-sm text-red-600" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t('Settings.lawyers.yearsOfExperience')}
                                            </label>
                                            <Field
                                                type="number"
                                                name={`${base}.yearsOfExperience`}
                                                min="0"
                                                step="1"
                                                onKeyDown={handleKeyDown}
                                                placeholder={t('Settings.lawyers.yearsOfExperiencePlaceholder')}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${base}.yearsOfExperience`)}`}
                                            />
                                            <ErrorMessage name={`${base}.yearsOfExperience`} component="p" className="mt-1 text-sm text-red-600" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t('Settings.lawyers.linkedIn')} {t('url')}
                                            </label>
                                            <Field
                                                type="text"
                                                name={`${base}.linkedIn`}
                                                placeholder={t('Settings.lawyers.linkedInPlaceholder')}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${base}.linkedIn`)}`}
                                            />
                                            <ErrorMessage name={`${base}.linkedIn`} component="p" className="mt-1 text-sm text-red-600" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t('Settings.lawyers.gmail')} {t('email')}
                                            </label>
                                            <Field
                                                type="email"
                                                name={`${base}.gmail`}
                                                placeholder={t('Settings.lawyers.gmailPlaceholder')}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${base}.gmail`)}`}
                                            />
                                            <ErrorMessage name={`${base}.gmail`} component="p" className="mt-1 text-sm text-red-600" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t('Settings.lawyers.descriptionEn')}
                                            </label>
                                            <Field
                                                as="textarea"
                                                rows={3}
                                                name={`${base}.descriptionEn`}
                                                placeholder={t('Settings.lawyers.descriptionEnPlaceholder')}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${base}.descriptionEn`)}`}
                                            />
                                            <ErrorMessage name={`${base}.descriptionEn`} component="p" className="mt-1 text-sm text-red-600" />
                                        </div>

                                        <div className="md:col-span-2 rtl">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t('Settings.lawyers.descriptionAr')}
                                            </label>
                                            <Field
                                                as="textarea"
                                                rows={3}
                                                name={`${base}.descriptionAr`}
                                                dir="rtl"
                                                placeholder={t('Settings.lawyers.descriptionArPlaceholder')}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent text-right ${getErrorClass(`${base}.descriptionAr`)}`}
                                            />
                                            <ErrorMessage name={`${base}.descriptionAr`} component="p" className="mt-1 text-sm text-red-600" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </FieldArray>
        </div>
    );
};