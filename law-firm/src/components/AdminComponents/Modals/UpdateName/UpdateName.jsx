// libs
import { useTranslation } from "react-i18next";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useUpdateCategory } from "../../../../hooks/useCategories";
import { useGetCategoryForUpdate } from "../../../../hooks/useCategories";
function UpdateName({ categoryId, onSuccess }) {
    const { t } = useTranslation();
    const { mutateAsync: updateCategory, isLoading: isUpdating } = useUpdateCategory();

    const { data } = useGetCategoryForUpdate(categoryId);

    return (
        <div className="flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            <div className="w-full max-w-md">
                <Formik
                    enableReinitialize
                    initialValues={{
                        nameEn: data?.nameEn || "",
                        nameAr: data?.nameAr || "",
                    }}
                    validationSchema={Yup.object({
                        nameEn: Yup.string().min(3).required(t("Services.English name is required")),
                        nameAr: Yup.string().min(3).required(t("Services.Arabic name is required")),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        try {
                            const payload = {
                                NameEn: values.nameEn,
                                NameAr: values.nameAr,
                                branchId: data?.branchId,
                            };

                            await updateCategory({ id: categoryId, data: payload });

                            toast.success(t("Services.Category updated successfully"));
                            if (typeof onSuccess === "function") onSuccess();
                        } catch (err) {
                            toast.error(err?.response?.data?.message || t("Services.Failed to update category"));
                            console.error("Update category failed:", err);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form
                            className="space-y-3"
                            onClick={(e) => e.stopPropagation()}
                            onBlur={(e) => e.stopPropagation()}
                        >
                            {/* English Name */}
                            <div className="space-y-2">
                                <label htmlFor="nameEn" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    {t("Services.Category Name in English")}
                                </label>
                                <Field name="nameEn">
                                    {({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            onClick={(e) => e.stopPropagation()}
                                            onBlur={(e) => {
                                                e.stopPropagation();
                                                field.onBlur && field.onBlur(e);
                                            }}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.nameEn && touched.nameEn ? "border-red-300 focus:ring-red-200 bg-red-50" : "border-gray-300 focus:ring-primary focus:border-primary"
                                                }`}
                                            placeholder={t("Add Category.Category Name in English is required")}
                                            dir="ltr"
                                            disabled={isSubmitting || isUpdating}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="nameEn" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                            </div>

                            {/* Arabic Name */}
                            <div className="space-y-2">
                                <label htmlFor="nameAr" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    {t("Services.Category Name in Arabic")}
                                </label>
                                <div className="relative">
                                    <Field name="nameAr">
                                        {({ field }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                onClick={(e) => e.stopPropagation()}
                                                onBlur={(e) => {
                                                    e.stopPropagation();
                                                    field.onBlur && field.onBlur(e);
                                                }}
                                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.nameAr && touched.nameAr ? "border-red-300 focus:ring-red-200 bg-red-50" : "border-gray-300 focus:ring-primary focus:border-primary"
                                                    }`}
                                                placeholder={t("Add Category.Category Name in Arabic is required")}
                                                dir="rtl"
                                                disabled={isSubmitting || isUpdating}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="nameAr" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting || isUpdating}
                                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform ${isSubmitting || isUpdating ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                                    }`}
                            >
                                {isSubmitting || isUpdating ? t("Services.Submitting...") : t("Services.Save")}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default UpdateName;
