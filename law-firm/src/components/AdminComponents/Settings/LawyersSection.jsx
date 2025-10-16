import { Plus, Trash2 } from "lucide-react";
import { ImageUpload } from './ImageUpload';

export const LawyersSection = ({ formik }) => {
    const lawyers = formik.values.lawyers;

    const addLawyer = () => {
        formik.setFieldValue('lawyers', [
            ...lawyers,
            {
                id: Date.now(),
                photoUrl: '',
                name: '',
                position: '',
                specialization: '',
                description: '',
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
                <h2 className="text-xl font-semibold text-[#003a42]">Lawyers</h2>
                <button
                    onClick={addLawyer}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-[#003a42] text-white rounded-lg hover:bg-[#004a52] transition-colors"
                >
                    <Plus size={18} />
                    Add Lawyer
                </button>
            </div>
            <div className="space-y-6">
                {lawyers.map((lawyer, index) => (
                    <div key={lawyer.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-sm font-medium text-[#7a5a21]">Lawyer {index + 1}</h3>
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
                                    label="Photo"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    name={`lawyers[${index}].name`}
                                    value={lawyer.name}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                                <input
                                    type="text"
                                    name={`lawyers[${index}].position`}
                                    value={lawyer.position}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                                <input
                                    type="text"
                                    name={`lawyers[${index}].specialization`}
                                    value={lawyer.specialization}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                                <input
                                    type="number"
                                    name={`lawyers[${index}].yearsOfExperience`}
                                    value={lawyer.yearsOfExperience}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                                <input
                                    type="text"
                                    name={`lawyers[${index}].linkedIn`}
                                    value={lawyer.linkedIn}
                                    onChange={formik.handleChange}
                                    placeholder="https://linkedin.com/in/username"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gmail</label>
                                <input
                                    type="email"
                                    name={`lawyers[${index}].gmail`}
                                    value={lawyer.gmail}
                                    onChange={formik.handleChange}
                                    placeholder="lawyer@example.com"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    name={`lawyers[${index}].description`}
                                    value={lawyer.description}
                                    onChange={formik.handleChange}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};