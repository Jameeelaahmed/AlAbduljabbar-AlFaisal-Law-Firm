import { Plus, Trash2 } from 'lucide-react';

// ClientReviewsSection Component
export const ClientReviewsSection = ({ formik }) => {
    const reviews = formik.values.clientReviews;

    const addReview = () => {
        formik.setFieldValue('clientReviews', [
            ...reviews,
            {
                id: Date.now(),
                name: '',
                clientOf: '',
                review: ''
            }
        ]);
    };

    const removeReview = (index) => {
        formik.setFieldValue('clientReviews', reviews.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#003a42]">Client Reviews</h2>
                <button
                    onClick={addReview}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-[#003a42] text-white rounded-lg hover:bg-[#004a52] transition-colors"
                >
                    <Plus size={18} />
                    Add Review
                </button>
            </div>
            <div className="space-y-4">
                {reviews.map((review, index) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-sm font-medium text-[#7a5a21]">Review {index + 1}</h3>
                            <button
                                onClick={() => removeReview(index)}
                                type="button"
                                className="text-red-500 hover:text-red-700 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                                <input
                                    type="text"
                                    name={`clientReviews[${index}].name`}
                                    value={review.name}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Client Of</label>
                                <input
                                    type="text"
                                    name={`clientReviews[${index}].clientOf`}
                                    value={review.clientOf}
                                    onChange={formik.handleChange}
                                    placeholder="Lawyer name or firm"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                            <textarea
                                name={`clientReviews[${index}].review`}
                                value={review.review}
                                onChange={formik.handleChange}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};