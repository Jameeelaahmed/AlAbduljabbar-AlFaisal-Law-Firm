// libs
import { useTranslation } from "react-i18next";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCreateFaqCategory, useUpdateFaqCategory, useFaqForUpdateFaqCategory } from "../../../../hooks/useFAQ";

function FAQCategory({ onClose, faqCategoryId }) {

    const { t } = useTranslation();

    const createFAQCategoryMutation = useCreateFaqCategory();
    const updateFAQCategoryMutation = useUpdateFaqCategory();
    const { data: facCatDataForUpdate } = useFaqForUpdateFaqCategory(faqCategoryId);

    // helper to call either mutateAsync or mutate with callbacks
    const callMutate = (mutation, payload) => {
        if (!mutation) return Promise.reject(new Error("Missing mutation"));
        if (mutation.mutateAsync) return mutation.mutateAsync(payload);
        return new Promise((resolve, reject) =>
            mutation.mutate(payload, { onSuccess: resolve, onError: reject })
        );
    };

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            if (faqCategoryId) {
                const payload = {
                    NameEn: values.nameEn,
                    NameAr: values.nameAr,
                    id: faqCategoryId,
                };
                // update hook expects { id, data } (adjust if your hook signature differs)
                await callMutate(updateFAQCategoryMutation, { id: faqCategoryId, data: payload });
            } else {
                // create expects the form values shape
                await callMutate(createFAQCategoryMutation, values);
            }
            onClose();
        } catch (err) {
            console.error("FAQCategory save error:", err);
            setErrors({ submit: err?.message || t("An error occurred") });
        } finally {
            setSubmitting(false);
        }
    };

    const isMutating = createFAQCategoryMutation?.isLoading || updateFAQCategoryMutation?.isLoading;

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Formik
                    enableReinitialize
                    initialValues={{
                        nameEn: facCatDataForUpdate?.nameEn ?? '',
                        nameAr: facCatDataForUpdate?.nameAr ?? ''
                    }}
                    validationSchema={Yup.object({
                        nameEn: Yup.string().min(3).required(t('Services.English name is required')),
                        nameAr: Yup.string().min(3).required(t('Services.Arabic name is required')),
                    })}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className="space-y-3">
                            {/* English Name */}
                            <div className="space-y-2">
                                <label htmlFor="nameEn" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    {t("FAQ Category Name in English")}
                                </label>
                                <Field name="nameEn">
                                    {({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.nameEn && touched.nameEn
                                                ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                                : 'border-gray-300 focus:ring-primary focus:border-primary'
                                                }`}
                                            placeholder={t("Add Category.Category Name in English is required")}
                                            dir="ltr"
                                            disabled={isSubmitting || isMutating}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="nameEn" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                            </div>

                            {/* Arabic Name */}
                            <div className="space-y-2">
                                <label htmlFor="nameAr" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    {t("FAQ Category Name in Arabic")}
                                </label>
                                <div className="relative">
                                    <Field name="nameAr">
                                        {({ field }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.nameAr && touched.nameAr
                                                    ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                                    : 'border-gray-300 focus:ring-primary focus:border-primary'
                                                    }`}
                                                placeholder={t("Add Category.Category Name in Arabic is required")}
                                                dir="rtl"
                                                disabled={isSubmitting || isMutating}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="nameAr" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                                </div>
                            </div>

                            {/* form-level submit error */}
                            <div>
                                {errors.submit && <div className="text-red-600 text-sm">{errors.submit}</div>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting || isMutating}
                                className={`cursor-pointer w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform ${isSubmitting || isMutating
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-primary hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                                    }`}
                            >
                                {isSubmitting || isMutating ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        {t("Services.Submitting...")}
                                    </div>
                                ) : (
                                    isMutating ? t("Services.Update Category") : t("Services.Submit Category")
                                )}
                            </button>

                            {/* Error Display */}
                            {(createFAQCategoryMutation.isError || updateFAQCategoryMutation.isError) && (
                                <div className="text-red-500 text-sm text-center mt-2">
                                    {createFAQCategoryMutation.error?.response?.data?.message
                                        || updateFAQCategoryMutation.error?.response?.data?.message
                                        || t('حدث خطأ')}
                                </div>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default FAQCategory;
