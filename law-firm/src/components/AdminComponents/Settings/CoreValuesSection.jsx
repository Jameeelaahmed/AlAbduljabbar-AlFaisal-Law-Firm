// CoreValuesSection Component
import { Plus, Trash2 } from "lucide-react";
import { ImageUpload } from './ImageUpload';

export const CoreValuesSection = ({ formik }) => {
    const values = formik.values.entitySettings.coreValues;

    const addValue = () => {
        formik.setFieldValue('entitySettings.coreValues', [
            ...values,
            { photoUrl: '', title: '', description: '' }
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
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#003a42]">Core Values</h2>
                <button
                    onClick={addValue}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-[#003a42] text-white rounded-lg hover:bg-[#004a52] transition-colors"
                >
                    <Plus size={18} />
                    Add Value
                </button>
            </div>
            <div className="space-y-4">
                {values.map((value, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-sm font-medium text-[#7a5a21]">Value {index + 1}</h3>
                            <button
                                onClick={() => removeValue(index)}
                                type="button"
                                className="text-red-500 hover:text-red-700 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <ImageUpload
                                    name={`entitySettings.coreValues[${index}].photoUrl`}
                                    value={value.photoUrl}
                                    onChange={(url) => formik.setFieldValue(`entitySettings.coreValues[${index}].photoUrl`, url)}
                                    label="Photo"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    name={`entitySettings.coreValues[${index}].title`}
                                    value={value.title}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    name={`entitySettings.coreValues[${index}].description`}
                                    value={value.description}
                                    onChange={formik.handleChange}
                                    rows={3}
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