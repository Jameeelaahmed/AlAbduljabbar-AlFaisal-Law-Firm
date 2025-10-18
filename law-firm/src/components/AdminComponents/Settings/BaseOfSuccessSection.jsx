// BaseOfSuccessSection Component
import { Plus, Trash2 } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { useTranslation } from 'react-i18next';

export const BaseOfSuccessSection = ({ formik }) => {
    const { t } = useTranslation();
    const bases = formik.values.entitySettings.baseOfOurSuccess.bases;

    const addBase = () => {
        formik.setFieldValue('entitySettings.baseOfOurSuccess.bases', [
            ...bases,
            { 
                photoUrl: '', 
                titleEn: '', 
                titleAr: '',
                descriptionEn: '', 
                descriptionAr: '' 
            }
        ]);
    };

    const removeBase = (index) => {
        formik.setFieldValue(
            'entitySettings.baseOfOurSuccess.bases',
            bases.filter((_, i) => i !== index)
        );
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
                <input
                    type="text"
                    name="entitySettings.baseOfOurSuccess.headlineEn"
                    value={formik.values.entitySettings.baseOfOurSuccess.headlineEn || ''}
                    onChange={formik.handleChange}
                    placeholder={t('Settings.baseOfOurSuccess.headlineEnPlaceholder')}
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent ${
                        formik.touched.entitySettings?.baseOfOurSuccess?.headlineEn && 
                        !formik.values.entitySettings.baseOfOurSuccess.headlineEn
                            ? 'border-red-500'
                            : 'border-gray-300'
                    }`}
                />
                {formik.touched.entitySettings?.baseOfOurSuccess?.headlineEn && 
                    !formik.values.entitySettings.baseOfOurSuccess.headlineEn && (
                        <p className="mt-1 text-sm text-red-500">
                            {t('validation.required', { field: t('Settings.baseOfOurSuccess.headlineEn') })}
                        </p>
                    )}
            </div>
            
            {/* Arabic Headline */}
            <div className="mb-6 rtl">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('Settings.baseOfOurSuccess.headlineAr')} <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="entitySettings.baseOfOurSuccess.headlineAr"
                    value={formik.values.entitySettings.baseOfOurSuccess.headlineAr || ''}
                    onChange={formik.handleChange}
                    placeholder={t('Settings.baseOfOurSuccess.headlineArPlaceholder')}
                    required
                    dir="rtl"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent ${
                        formik.touched.entitySettings?.baseOfOurSuccess?.headlineAr && 
                        !formik.values.entitySettings.baseOfOurSuccess.headlineAr
                            ? 'border-red-500'
                            : 'border-gray-300'
                    }`}
                />
                {formik.touched.entitySettings?.baseOfOurSuccess?.headlineAr && 
                    !formik.values.entitySettings.baseOfOurSuccess.headlineAr && (
                        <p className="mt-1 text-sm text-red-500" dir="rtl">
                            {t('validation.required', { field: t('Settings.baseOfOurSuccess.headlineAr') })}
                        </p>
                    )}
            </div>
            
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-[#7a5a21]">
                    {t('Settings.baseOfOurSuccess.bases')}
                </h3>
                <button
                    onClick={addBase}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-[#7a5a21] text-white rounded-lg hover:bg-[#8a6a31] transition-colors text-sm"
                >
                    <Plus size={16} />
                    {t('common.addBase')}
                </button>
            </div>
            
            <div className="space-y-6">
                {bases.map((base, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-sm font-medium text-[#7a5a21]">
                                {t('Settings.baseOfOurSuccess.photo')} {index + 1}
                            </h4>
                            <button
                                onClick={() => removeBase(index)}
                                type="button"
                                className="text-red-500 hover:text-red-700 transition-colors"
                                aria-label={t('common.remove')}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        
                        <div className="space-y-6">
                            {/* Photo Upload */}
                            <ImageUpload
                                name={`entitySettings.baseOfOurSuccess.bases[${index}].photoUrl`}
                                value={base.photoUrl}
                                onChange={(url) => formik.setFieldValue(
                                    `entitySettings.baseOfOurSuccess.bases[${index}].photoUrl`, 
                                    url
                                )}
                                label={t('common.photo')}
                            />
                            
                            {/* English Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('common.delete')} *
                                </label>
                                <input
                                    type="text"
                                    name={`entitySettings.baseOfOurSuccess.bases[${index}].titleEn`}
                                    value={base.titleEn || ''}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                    required
                                />
                            </div>
                            
                            {/* Arabic Title */}
                            <div className="rtl">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('common.titleAr')} *
                                </label>
                                <input
                                    type="text"
                                    name={`entitySettings.baseOfOurSuccess.bases[${index}].titleAr`}
                                    value={base.titleAr || ''}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                    dir="rtl"
                                    required
                                />
                            </div>
                            
                            {/* English Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('common.descriptionEn')} *
                                </label>
                                <textarea
                                    name={`entitySettings.baseOfOurSuccess.bases[${index}].descriptionEn`}
                                    value={base.descriptionEn || ''}
                                    onChange={formik.handleChange}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                    required
                                />
                            </div>
                            
                            {/* Arabic Description */}
                            <div className="rtl">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('common.descriptionAr')} *
                                </label>
                                <textarea
                                    name={`entitySettings.baseOfOurSuccess.bases[${index}].descriptionAr`}
                                    value={base.descriptionAr || ''}
                                    onChange={formik.handleChange}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                    dir="rtl"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};