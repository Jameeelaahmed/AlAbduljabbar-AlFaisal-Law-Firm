// JourneyMilestonesSection Component
import { Plus, Trash2 } from "lucide-react";

export const JourneyMilestonesSection = ({ formik }) => {
    const milestones = formik.values.entitySettings.journeyMilestones;

    const addMilestone = () => {
        formik.setFieldValue('entitySettings.journeyMilestones', [
            ...milestones,
            { year: new Date().getFullYear(), title: '', description: '' }
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
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#003a42]">Journey Milestones</h2>
                <button
                    onClick={addMilestone}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-[#003a42] text-white rounded-lg hover:bg-[#004a52] transition-colors"
                >
                    <Plus size={18} />
                    Add Milestone
                </button>
            </div>
            <div className="space-y-4">
                {milestones.map((milestone, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-sm font-medium text-[#7a5a21]">Milestone {index + 1}</h3>
                            <button
                                onClick={() => removeMilestone(index)}
                                type="button"
                                className="text-red-500 hover:text-red-700 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                                <input
                                    type="number"
                                    name={`entitySettings.journeyMilestones[${index}].year`}
                                    value={milestone.year}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    name={`entitySettings.journeyMilestones[${index}].title`}
                                    value={milestone.title}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                name={`entitySettings.journeyMilestones[${index}].description`}
                                value={milestone.description}
                                onChange={formik.handleChange}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};