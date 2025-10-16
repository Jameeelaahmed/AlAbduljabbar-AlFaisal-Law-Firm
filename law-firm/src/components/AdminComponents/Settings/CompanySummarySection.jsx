    export const CompanySummarySection = ({ formik }) => {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-[#003a42] mb-4">Company Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Years of Experience
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
                            Satisfied Clients
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
                            Finished Cases
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
                            Success Rate (%)
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