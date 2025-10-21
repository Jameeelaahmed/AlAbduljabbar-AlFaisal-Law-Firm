import { Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Field, FieldArray, ErrorMessage, getIn } from 'formik';

// ClientReviewsSection Component
export const ClientReviewsSection = ({ formik }) => {
    const { t } = useTranslation();
    const reviews = formik.values?.clientReviews || [];

    const getErrorClass = (name) => {
        const touched = getIn(formik.touched, name);
        const error = getIn(formik.errors, name);
        return touched && error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-[#003a42]';
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <FieldArray name="clientReviews">
                {({ push, remove }) => (
                    <div >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-primary">
                                {t('Settings.clientReviews.title')}
                            </h2>
                            <button
                                onClick={() =>
                                    push({
                                        nameEn: '',
                                        nameAr: '',
                                        clientOfEn: '',
                                        clientOfAr: '',
                                        reviewEn: '',
                                        reviewAr: ''
                                    })
                                }
                                type="button"
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#004a52] transition-colors text-sm"
                            >
                                <Plus size={16} />
                                {t('Settings.clientReviews.addReview')}
                            </button>
                        </div>

                        <div className="space-y-4">
                            {reviews.map((review, index) => {
                                const base = `clientReviews[${index}]`;
                                return (
                                    <div key={review.id || index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-sm font-medium text-[#7a5a21]">
                                                {t('Settings.clientReviews.review')} {index + 1}
                                            </h3>
                                            <button
                                                aria-label={t('common.delete')}
                                                onClick={() => remove(index)}
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
                                                    {t('Settings.clientReviews.clientNameEn')} <span className="text-red-500">*</span>
                                                </label>
                                                <Field
                                                    type="text"
                                                    name={`${base}.nameEn`}
                                                    placeholder={t('Settings.clientReviews.clientNameEnPlaceholder')}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${base}.nameEn`)}`}
                                                />
                                                <ErrorMessage name={`${base}.nameEn`} component="div" className="text-red-500 text-sm mt-1" />
                                            </div>

                                            {/* Arabic Name */}
                                            <div className="rtl">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('Settings.clientReviews.clientNameAr')} <span className="text-red-500">*</span>
                                                </label>
                                                <Field
                                                    type="text"
                                                    name={`${base}.nameAr`}
                                                    dir="rtl"
                                                    placeholder={t('Settings.clientReviews.nameArPlaceholder')}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent text-right ${getErrorClass(`${base}.nameAr`)}`}
                                                />
                                                <ErrorMessage name={`${base}.nameAr`} component="div" className="text-red-500 text-sm mt-1" />
                                            </div>

                                            {/* English Client Of */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('Settings.clientReviews.clientOfEn')}
                                                </label>
                                                <Field
                                                    type="text"
                                                    name={`${base}.clientOfEn`}
                                                    placeholder={t('Settings.clientReviews.clientOfEnPlaceholder')}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${base}.clientOfEn`)}`}
                                                />
                                                <ErrorMessage name={`${base}.clientOfEn`} component="div" className="text-red-500 text-sm mt-1" />
                                            </div>

                                            {/* Arabic Client Of */}
                                            <div className="rtl">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('Settings.clientReviews.clientOfAr')}
                                                </label>
                                                <Field
                                                    type="text"
                                                    name={`${base}.clientOfAr`}
                                                    dir="rtl"
                                                    placeholder={t('Settings.clientReviews.clientOfArPlaceholder')}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent text-right ${getErrorClass(`${base}.clientOfAr`)}`}
                                                />
                                                <ErrorMessage name={`${base}.clientOfAr`} component="div" className="text-red-500 text-sm mt-1" />
                                            </div>
                                        </div>

                                        {/* English Review */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t('Settings.clientReviews.reviewEn')} <span className="text-red-500">*</span>
                                            </label>
                                            <Field
                                                as="textarea"
                                                rows={3}
                                                name={`${base}.reviewEn`}
                                                placeholder={t('Settings.clientReviews.reviewEnPlaceholder')}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getErrorClass(`${base}.reviewEn`)}`}
                                            />
                                            <ErrorMessage name={`${base}.reviewEn`} component="div" className="text-red-500 text-sm mt-1" />
                                        </div>

                                        {/* Arabic Review */}
                                        <div className="rtl">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t('Settings.clientReviews.reviewAr')} <span className="text-red-500">*</span>
                                            </label>
                                            <Field
                                                as="textarea"
                                                rows={3}
                                                name={`${base}.reviewAr`}
                                                dir="rtl"
                                                placeholder={t('Settings.clientReviews.reviewArPlaceholder')}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent text-right ${getErrorClass(`${base}.reviewAr`)}`}
                                            />
                                            <ErrorMessage name={`${base}.reviewAr`} component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </FieldArray>
        </div>
    );
};