// CoreValuesSection Component
import { Plus, Trash2 } from "lucide-react";
import { ImageUpload } from './ImageUpload';
import { useTranslation } from 'react-i18next';

export const CoreValuesSection = ({ formik }) => {
    const { t } = useTranslation();
    const values = formik.values.entitySettings.coreValues;

    const addValue = () => {
        formik.setFieldValue('entitySettings.coreValues', [
            ...values,
            { 
                photoUrl: '', 
                titleEn: '', 
                titleAr: '',
                descriptionEn: '', 
                descriptionAr: '' 
            }
        ]);
    };

    const removeValue = (index) => {
        formik.setFieldValue(
            'entitySettings.coreValues',
            values.filter((_, i) => i !== index)
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#003a42]">{t('Settings.coreValues.title')}</h2>
                <button
                    onClick={addValue}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-[#003a42] text-white rounded-lg hover:bg-[#004a52] transition-colors text-sm"
                >
                    <Plus size={16} />
                    {t('Settings.coreValues.addValue')}
                </button>
            </div>
            <div className="space-y-6">
                {values.map((value, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-medium text-[#7a5a21]">
                                {t('Settings.coreValues.value')} {index + 1}
                            </h3>
                            <button
                                onClick={() => removeValue(index)}
                                type="button"
                                className="text-red-500 hover:text-red-700 transition-colors"
                                aria-label={t('common.delete')}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <div className="space-y-6">
                            <ImageUpload
                                name={`entitySettings.coreValues[${index}].photoUrl`}
                                value={value.photoUrl}
                                onChange={(url) => formik.setFieldValue(`entitySettings.coreValues[${index}].photoUrl`, url)}
                                label={t('Settings.coreValues.photo')}
                            />
                            
                            {/* English Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('Settings.coreValues.titleEn')} *
                                </label>
                                <input
                                    type="text"
                                    name={`entitySettings.coreValues[${index}].titleEn`}
                                    value={value.titleEn || ''}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                    required
                                />
                            </div>
                            
                            {/* Arabic Title */}
                            <div className="rtl">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('Settings.coreValues.titleAr')} *
                                </label>
                                <input
                                    type="text"
                                    name={`entitySettings.coreValues[${index}].titleAr`}
                                    value={value.titleAr || ''}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                    dir="rtl"
                                    required
                                />
                            </div>
                            
                            {/* English Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('Settings.coreValues.descriptionEn')} *
                                </label>
                                <textarea
                                    name={`entitySettings.coreValues[${index}].descriptionEn`}
                                    value={value.descriptionEn || ''}
                                    onChange={formik.handleChange}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                    required
                                />
                            </div>
                            
                            {/* Arabic Description */}
                            <div className="rtl">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('Settings.coreValues.descriptionAr')} *
                                </label>
                                <textarea
                                    name={`entitySettings.coreValues[${index}].descriptionAr`}
                                    value={value.descriptionAr || ''}
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