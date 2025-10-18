import { useTranslation } from 'react-i18next';

export const CompanySummarySection = ({ formik }) => {
        const { t } = useTranslation();
        
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
                        <input
                            type="number"
                            name="entitySettings.companySummary.yearsOfExperience"
                            value={formik.values.entitySettings.companySummary.yearsOfExperience}
                            onChange={formik.handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('Settings.companySummary.satisfiedClients')}
                        </label>
                        <input
                            type="number"
                            name="entitySettings.companySummary.satisfiedClients"
                            value={formik.values.entitySettings.companySummary.satisfiedClients}
                            onChange={formik.handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('Settings.companySummary.finishedCases')}
                        </label>
                        <input
                            type="number"
                            name="entitySettings.companySummary.finishedCases"
                            value={formik.values.entitySettings.companySummary.finishedCases}
                            onChange={formik.handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('Settings.companySummary.successRate')}
                        </label>
                        <input
                            type="number"
                            name="entitySettings.companySummary.successRate"
                            value={formik.values.entitySettings.companySummary.successRate}
                            onChange={formik.handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                        />
                    </div>
                </div>
            </div>
        );
    };