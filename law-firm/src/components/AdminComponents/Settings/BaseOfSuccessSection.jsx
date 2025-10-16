// BaseOfSuccessSection Component
import { Plus, Trash2 } from 'lucide-react';
import { ImageUpload } from './ImageUpload';

export const BaseOfSuccessSection = ({ formik }) => {
    const bases = formik.values.entitySettings.baseOfOurSuccess.bases;

    const addBase = () => {
        formik.setFieldValue('entitySettings.baseOfOurSuccess.bases', [
            ...bases,
            { photoUrl: '', title: '', description: '' }
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
            <h2 className="text-xl font-semibold text-[#003a42] mb-4">Base of Our Success</h2>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    headline <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="entitySettings.baseOfOurSuccess.headline"
                    value={formik.values.entitySettings.baseOfOurSuccess.headline}
                    onChange={formik.handleChange}
                    placeholder="Enter headline for base of success section"
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent ${formik.touched.entitySettings?.baseOfOurSuccess?.headline && !formik.values.entitySettings.baseOfOurSuccess.headline
                        ? 'border-red-500'
                        : 'border-gray-300'
                        }`}
                />
                {formik.touched.entitySettings?.baseOfOurSuccess?.headline && !formik.values.entitySettings.baseOfOurSuccess.headline && (
                    <p className="mt-1 text-sm text-red-500">headline is required</p>
                )}
            </div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-[#7a5a21]">Success Bases</h3>
                <button
                    onClick={addBase}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-[#7a5a21] text-white rounded-lg hover:bg-[#8a6a31] transition-colors"
                >
                    <Plus size={18} />
                    Add Base
                </button>
            </div>
            <div className="space-y-4">
                {bases.map((base, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="text-sm font-medium text-[#7a5a21]">Base {index + 1}</h4>
                            <button
                                onClick={() => removeBase(index)}
                                type="button"
                                className="text-red-500 hover:text-red-700 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <ImageUpload
                                    name={`entitySettings.baseOfOurSuccess.bases[${index}].photoUrl`}
                                    value={base.photoUrl}
                                    onChange={(url) => formik.setFieldValue(`entitySettings.baseOfOurSuccess.bases[${index}].photoUrl`, url)}
                                    label="Photo"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    name={`entitySettings.baseOfOurSuccess.bases[${index}].title`}
                                    value={base.title}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    name={`entitySettings.baseOfOurSuccess.bases[${index}].description`}
                                    value={base.description}
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