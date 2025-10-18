import { Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// ClientReviewsSection Component
export const ClientReviewsSection = ({ formik }) => {
    const { t } = useTranslation();
    const reviews = formik.values.clientReviews;

    const addReview = () => {
        formik.setFieldValue('clientReviews', [
            ...reviews,
            {
                id: Date.now(),
                nameEn: '',
                nameAr: '',
                clientOfEn: '',
                clientOfAr: '',
                reviewEn: '',
                reviewAr: ''
            }
        ]);
    };

    const removeReview = (index) => {
        formik.setFieldValue('clientReviews', reviews.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#003a42]">{t('Settings.clientReviews.title')}</h2>
                <button
                    onClick={addReview}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-[#003a42] text-white rounded-lg hover:bg-[#004a52] transition-colors text-sm"
                >
                    <Plus size={16} />
                    {t('Settings.clientReviews.addReview')}
                </button>
            </div>
            <div className="space-y-4">
                {reviews.map((review, index) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-sm font-medium text-[#7a5a21]">
                                {t('Settings.clientReviews.review')} {index + 1}
                            </h3>
                            <button
                                aria-label={t('common.delete')}
                                onClick={() => removeReview(index)}
                                type="button"
                                className="text-red-500 hover:text-red-700 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            {/* English Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('Settings.clientReviews.clientNameEn')} *
                                </label>
                                <input
                                    type="text"
                                    name={`clientReviews[${index}].nameEn`}
                                    value={review.nameEn || ''}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                    placeholder={t('Settings.clientReviews.clientNameEnPlaceholder')}
                                    required
                                />
                            </div>
                            
                            {/* Arabic Name */}
                            <div className="rtl">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('Settings.clientReviews.clientNameAr')} *
                                </label>
                                <input
                                    type="text"
                                    name={`clientReviews[${index}].nameAr`}
                                    value={review.nameAr || ''}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent text-right"
                                    dir="rtl"
                                    placeholder={t('Settings.clientReviews.nameArPlaceholder')}
                                    required
                                />
                            </div>
                            
                            {/* English Client Of */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('Settings.clientReviews.clientOfEn')}
                                </label>
                                <input
                                    type="text"
                                    name={`clientReviews[${index}].clientOfEn`}
                                    value={review.clientOfEn || ''}
                                    onChange={formik.handleChange}
                                    placeholder={t('Settings.clientReviews.clientOfEnPlaceholder')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                />
                            </div>
                            
                            {/* Arabic Client Of */}
                            <div className="rtl">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('Settings.clientReviews.clientOfAr')}
                                </label>
                                <input
                                    type="text"
                                    name={`clientReviews[${index}].clientOfAr`}
                                    value={review.clientOfAr || ''}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent text-right"
                                    dir="rtl"
                                    placeholder={t('Settings.clientReviews.clientOfArPlaceholder')}
                                />
                            </div>
                        </div>
                        
                        {/* English Review */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('Settings.clientReviews.reviewEn')} *
                            </label>
                            <textarea
                                name={`clientReviews[${index}].reviewEn`}
                                value={review.reviewEn || ''}
                                onChange={formik.handleChange}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent"
                                placeholder={t('Settings.clientReviews.reviewEnPlaceholder')}
                                required
                            />
                        </div>
                        
                        {/* Arabic Review */}
                        <div className="rtl">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('Settings.clientReviews.reviewAr')} *
                            </label>
                            <textarea
                                name={`clientReviews[${index}].reviewAr`}
                                value={review.reviewAr || ''}
                                onChange={formik.handleChange}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003a42] focus:border-transparent text-right"
                                dir="rtl"
                                placeholder={t('Settings.clientReviews.reviewArPlaceholder')}
                                required
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};