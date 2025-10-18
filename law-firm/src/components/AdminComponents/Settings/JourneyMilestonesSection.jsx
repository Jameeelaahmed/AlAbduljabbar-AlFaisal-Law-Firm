// JourneyMilestonesSection Component
import { Plus, Trash2 } from "lucide-react";
import { useTranslation } from 'react-i18next';

export const JourneyMilestonesSection = ({ formik }) => {
    const { t } = useTranslation();
    const milestones = formik.values.entitySettings.journeyMilestones;

    const addMilestone = () => {
        formik.setFieldValue('entitySettings.journeyMilestones', [
            ...milestones,
            { 
                year: new Date().getFullYear(), 
                titleEn: '', 
                titleAr: '',
                descriptionEn: '', 
                descriptionAr: '' 
            }
        ]);
    };

    const removeMilestone = (index) => {
        formik.setFieldValue(
            'entitySettings.journeyMilestones',
            milestones.filter((_, i) => i !== index)
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#003a42]">
                    {t('Settings.journeyMilestones.title')}
                </h2>
                <button
                    onClick={addMilestone}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-[#003a42] text-white rounded-lg hover:bg-[#004a52] transition-colors text-sm"
                >
                    <Plus size={16} />
                    {t('Settings.journeyMilestones.addMilestone')}
                </button>
            </div>
            
            <div className="space-y-6">
                {milestones.map((milestone, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-medium text-[#7a5a21]">
                                {t('Settings.journeyMilestones.milestone')} {index + 1}
                            </h3>
                            <button
                                onClick={() => removeMilestone(index)}
                                type="button"
                                className="text-red-500 hover:text-red-700 transition-colors"
                                aria-label={t('common.delete')}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Year */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('Settings.journeyMilestones.year')} *
                                </label>
                                <input
                                    type="number"
                                    name={`entitySettings.journeyMilestones[${index}].year`}
                                    value={milestone.year || new Date().getFullYear()}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                    required
                                    min="1900"
                                    max="2100"
                                />
                            </div>
                            
                            {/* English Title */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('Settings.journeyMilestones.titleEn')} *
                                </label>
                                <input
                                    type="text"
                                    name={`entitySettings.journeyMilestones[${index}].titleEn`}
                                    value={milestone.titleEn || ''}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                    required
                                />
                            </div>
                            
                            {/* Arabic Title */}
                            <div className="md:col-span-3 rtl">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('Settings.journeyMilestones.titleAr')} *
                                </label>
                                <input
                                    type="text"
                                    name={`entitySettings.journeyMilestones[${index}].titleAr`}
                                    value={milestone.titleAr || ''}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                    dir="rtl"
                                    required
                                />
                            </div>
                            
                            {/* English Description */}
                            <div className="md:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('Settings.journeyMilestones.descriptionEn')} *
                                </label>
                                <textarea
                                    name={`entitySettings.journeyMilestones[${index}].descriptionEn`}
                                    value={milestone.descriptionEn || ''}
                                    onChange={formik.handleChange}
                                    rows={2}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                    required
                                />
                            </div>
                            
                            {/* Arabic Description */}
                            <div className="md:col-span-3 rtl">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('Settings.journeyMilestones.descriptionAr')} *
                                </label>
                                <textarea
                                    name={`entitySettings.journeyMilestones[${index}].descriptionAr`}
                                    value={milestone.descriptionAr || ''}
                                    onChange={formik.handleChange}
                                    rows={2}
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