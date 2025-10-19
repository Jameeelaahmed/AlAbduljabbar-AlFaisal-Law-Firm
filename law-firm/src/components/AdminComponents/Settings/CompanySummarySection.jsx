import { useTranslation } from 'react-i18next';
import { Field, ErrorMessage } from 'formik';

export const CompanySummarySection = ({ formik }) => {
    const { t } = useTranslation();

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-[#003a42] mb-4">
                {t('Settings.companySummary.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('Settings.companySummary.yearsOfExperience')}
                    </label>
                    <Field
                        type="number"
                        name="entitySettings.companySummary.yearsOfExperience"
                        onKeyDown={handleKeyDown}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent ${formik.touched.entitySettings?.companySummary?.yearsOfExperience &&
                            formik.errors.entitySettings?.companySummary?.yearsOfExperience
                            ? 'border-red-500'
                            : 'border-gray-300'
                            }`}
                    />
                    <ErrorMessage
                        name="entitySettings.companySummary.yearsOfExperience"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('Settings.companySummary.satisfiedClients')}
                    </label>
                    <Field
                        type="number"
                        name="entitySettings.companySummary.satisfiedClients"
                        onKeyDown={handleKeyDown}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent ${formik.touched.entitySettings?.companySummary?.satisfiedClients &&
                            formik.errors.entitySettings?.companySummary?.satisfiedClients
                            ? 'border-red-500'
                            : 'border-gray-300'
                            }`}
                    />
                    <ErrorMessage
                        name="entitySettings.companySummary.satisfiedClients"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('Settings.companySummary.finishedCases')}
                    </label>
                    <Field
                        type="number"
                        name="entitySettings.companySummary.finishedCases"
                        onKeyDown={handleKeyDown}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent ${formik.touched.entitySettings?.companySummary?.finishedCases &&
                            formik.errors.entitySettings?.companySummary?.finishedCases
                            ? 'border-red-500'
                            : 'border-gray-300'
                            }`}
                    />
                    <ErrorMessage
                        name="entitySettings.companySummary.finishedCases"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('Settings.companySummary.successRate')}
                    </label>
                    <Field
                        type="number"
                        name="entitySettings.companySummary.successRate"
                        onKeyDown={handleKeyDown}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent ${formik.touched.entitySettings?.companySummary?.successRate &&
                            formik.errors.entitySettings?.companySummary?.successRate
                            ? 'border-red-500'
                            : 'border-gray-300'
                            }`}
                    />
                    <ErrorMessage
                        name="entitySettings.companySummary.successRate"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                    />
                </div>
            </div>
        </div>
    );
};