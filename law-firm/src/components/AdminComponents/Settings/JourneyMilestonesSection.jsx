// JourneyMilestonesSection Component
import { Plus, Trash2 } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { Field, FieldArray, ErrorMessage, getIn } from 'formik';

export const JourneyMilestonesSection = ({ formik }) => {
    const { t } = useTranslation();
    const milestones = formik.values.entitySettings.journeyMilestones;

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
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#003a42]">
                    {t('Settings.journeyMilestones.title')}
                </h2>
                {/* Add milestone handled by FieldArray below */}
            </div>

            <FieldArray name="entitySettings.journeyMilestones">
                {({ push, remove }) => (
                    <>
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={() =>
                                    push({
                                        year: new Date().getFullYear(),
                                        titleEn: '',
                                        titleAr: '',
                                        descriptionEn: '',
                                        descriptionAr: ''
                                    })
                                }
                                type="button"
                                className="flex items-center gap-2 px-4 py-2 bg-[#003a42] text-white rounded-lg hover:bg-[#004a52] transition-colors text-sm"
                            >
                                <Plus size={16} />
                                {t('Settings.journeyMilestones.addMilestone')}
                            </button>
                        </div>

                        <div className="space-y-6">
                            {milestones.map((_, index) => {
                                const base = `entitySettings.journeyMilestones[${index}]`;
                                return (
                                    <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-sm font-medium text-[#7a5a21]">
                                                {t('Settings.journeyMilestones.milestone')} {index + 1}
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

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {/* Year */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('Settings.journeyMilestones.year')} *
                                                </label>
                                                <Field
                                                    type="number"
                                                    name={`${base}.year`}
                                                    min="1900"
                                                    max="2100"
                                                    onKeyDown={handleKeyDown}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${base}.year`)}`}
                                                />
                                                <ErrorMessage name={`${base}.year`} component="div" className="text-red-500 text-sm mt-1" />
                                            </div>

                                            {/* English Title */}
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('Settings.journeyMilestones.titleEn')} *
                                                </label>
                                                <Field
                                                    type="text"
                                                    name={`${base}.titleEn`}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${base}.titleEn`)}`}
                                                />
                                                <ErrorMessage name={`${base}.titleEn`} component="div" className="text-red-500 text-sm mt-1" />
                                            </div>

                                            {/* Arabic Title */}
                                            <div className="md:col-span-3 rtl">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('Settings.journeyMilestones.titleAr')} *
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
                                            <div className="md:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('Settings.journeyMilestones.descriptionEn')} *
                                                </label>
                                                <Field
                                                    as="textarea"
                                                    rows={2}
                                                    name={`${base}.descriptionEn`}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${base}.descriptionEn`)}`}
                                                />
                                                <ErrorMessage name={`${base}.descriptionEn`} component="div" className="text-red-500 text-sm mt-1" />
                                            </div>

                                            {/* Arabic Description */}
                                            <div className="md:col-span-3 rtl">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('Settings.journeyMilestones.descriptionAr')} *
                                                </label>
                                                <Field
                                                    as="textarea"
                                                    rows={2}
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