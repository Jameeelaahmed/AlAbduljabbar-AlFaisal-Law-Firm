import { Plus, Trash2 } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { ImageUpload } from './ImageUpload';

export const LawyersSection = ({ formik }) => {
    const { t } = useTranslation();
    const lawyers = formik.values.lawyers;

    const addLawyer = () => {
        formik.setFieldValue('lawyers', [
            ...lawyers,
            {
                id: Date.now(),
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
            }
        ]);
    };

    const removeLawyer = (index) => {
        formik.setFieldValue('lawyers', lawyers.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#003a42]">{t('Settings.lawyers.title')}</h2>
                <button
                    onClick={addLawyer}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-[#003a42] text-white rounded-lg hover:bg-[#004a52] transition-colors"
                >
                    <Plus size={18} />
                    {t('Settings.lawyers.addLawyer')}
                </button>
            </div>
            <div className="space-y-6">
                {lawyers.map((lawyer, index) => (
                    <div key={lawyer.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-sm font-medium text-[#7a5a21]">{t('Settings.lawyers.lawyer')} {index + 1}</h3>
                            <button
                                onClick={() => removeLawyer(index)}
                                type="button"
                                className="text-red-500 hover:text-red-700 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <ImageUpload
                                    name={`lawyers[${index}].photoUrl`}
                                    value={lawyer.photoUrl}
                                    onChange={(url) => formik.setFieldValue(`lawyers[${index}].photoUrl`, url)}
                                    label={t('Settings.lawyers.photo')}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('Settings.lawyers.nameEn')}</label>
                                <input
                                    type="text"
                                    name={`lawyers[${index}].nameEn`}
                                    value={lawyer.nameEn || ''}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                    placeholder={t('Settings.lawyers.nameEnPlaceholder')}
                                />
                                {formik.touched.lawyers?.[index]?.nameEn && formik.errors.lawyers?.[index]?.nameEn && (
                                    <p className="mt-1 text-sm text-red-600">{formik.errors.lawyers[index].nameEn}</p>
                                )}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('Settings.lawyers.nameAr')}</label>
                                <input
                                    type="text"
                                    name={`lawyers[${index}].nameAr`}
                                    value={lawyer.nameAr || ''}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent text-right"
                                    dir="rtl"
                                    placeholder={t('Settings.lawyers.nameArPlaceholder')}
                                />
                                {formik.touched.lawyers?.[index]?.nameAr && formik.errors.lawyers?.[index]?.nameAr && (
                                    <p className="mt-1 text-sm text-red-600">{formik.errors.lawyers[index].nameAr}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('Settings.lawyers.positionEn')}</label>
                                <input
                                    type="text"
                                    name={`lawyers[${index}].positionEn`}
                                    value={lawyer.positionEn || ''}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                    placeholder={t('Settings.lawyers.positionEnPlaceholder')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('Settings.lawyers.positionAr')}</label>
                                <input
                                    type="text"
                                    name={`lawyers[${index}].positionAr`}
                                    value={lawyer.positionAr || ''}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent text-right"
                                    dir="rtl"
                                    placeholder={t('Settings.lawyers.positionArPlaceholder')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('Settings.lawyers.specializationEn')}</label>
                                <input
                                    type="text"
                                    name={`lawyers[${index}].specializationEn`}
                                    value={lawyer.specializationEn || ''}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                    placeholder={t('Settings.lawyers.specializationEnPlaceholder')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('Settings.lawyers.specializationAr')}</label>
                                <input
                                    type="text"
                                    name={`lawyers[${index}].specializationAr`}
                                    value={lawyer.specializationAr || ''}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent text-right"
                                    dir="rtl"
                                    placeholder={t('Settings.lawyers.specializationArPlaceholder')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('Settings.lawyers.yearsOfExperience')}</label>
                                <input
                                    type="number"
                                    name={`lawyers[${index}].yearsOfExperience`}
                                    value={lawyer.yearsOfExperience}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                    placeholder={t('Settings.lawyers.yearsOfExperiencePlaceholder')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('Settings.lawyers.linkedIn')} {t('url')}</label>
                                <input
                                    type="text"
                                    name={`lawyers[${index}].linkedIn`}
                                    value={lawyer.linkedIn}
                                    onChange={formik.handleChange}
                                    placeholder={t('Settings.lawyers.linkedInPlaceholder')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('Settings.lawyers.gmail')} {t('email')}</label>
                                <input
                                    type="email"
                                    name={`lawyers[${index}].gmail`}
                                    value={lawyer.gmail}
                                    onChange={formik.handleChange}
                                    placeholder={t('Settings.lawyers.gmailPlaceholder')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('Settings.lawyers.descriptionEn')}</label>
                                <textarea
                                    name={`lawyers[${index}].descriptionEn`}
                                    value={lawyer.descriptionEn || ''}
                                    onChange={formik.handleChange}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                    placeholder={t('Settings.lawyers.descriptionEnPlaceholder')}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('Settings.lawyers.descriptionAr')}</label>
                                <textarea
                                    name={`lawyers[${index}].descriptionAr`}
                                    value={lawyer.descriptionAr || ''}
                                    onChange={formik.handleChange}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent text-right"
                                    dir="rtl"
                                    placeholder={t('Settings.lawyers.descriptionArPlaceholder')}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};