import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import { useGetServiceForUpdate, useUpdateService } from "../../../../hooks/useServices";

function UpdateService({ selectedServiceId, onClose, setSelectedServiceId }) {
    const { t } = useTranslation();

    const { data: serviceInitialData } = useGetServiceForUpdate(selectedServiceId)
    const { mutateAsync: updateService, isLoading: isUpdating } = useUpdateService(selectedServiceId);
    console.log(serviceInitialData);

    return (
        <div className="flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            <div className="w-full max-w-md">
                <Formik
                    enableReinitialize
                    initialValues={{
                        nameEn: serviceInitialData?.nameEn ?? "",
                        nameAr: serviceInitialData?.nameAr ?? "",
                        descriptionEn: serviceInitialData?.descriptionEn ?? "",
                        descriptionAr: serviceInitialData?.descriptionAr ?? "",
                        categoryId: serviceInitialData?.categoryId ?? "",
                    }}
                    validationSchema={Yup.object({
                        nameEn: Yup.string().min(3).required(t("Services.English name is required")),
                        nameAr: Yup.string().min(3).required(t("Services.Arabic name is required")),
                        descriptionEn: Yup.string().min(5).required(t("Services.English description is required")),
                        descriptionAr: Yup.string().min(5).required(t("Services.Arabic description is required")),
                        categoryId: Yup.number().required(t("Services.Category is required")).typeError(t("Services.Select a category")),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            // Convert categoryId to number if needed
                            const payload = { ...values, categoryId: values.categoryId };
                            await updateService({ id: selectedServiceId, data: payload });
                            setSelectedServiceId(null)
                            onClose();
                        } catch (err) {
                            console.log(values.categoryId);
                            onClose()
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
                            <div className="flex gap-2">
                                <div className="space-y-2 w-1/2">
                                    <label htmlFor="nameEn" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                        {t("Services.Service Name in English")}
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
                                                placeholder={t("Services.Service Name in English is required")}
                                                dir="ltr"
                                                disabled={isSubmitting}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="nameEn" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                                </div>

                                {/* Arabic Name */}
                                <div className="space-y-2 w-1/2">
                                    <label htmlFor="nameAr" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                        {t("Services.Service Name in Arabic")}
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
                                                    placeholder={t("Services.Service Name in Arabic is required")}
                                                    dir="rtl"
                                                    disabled={isSubmitting}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage name="nameAr" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                                    </div>
                                </div>
                            </div>

                            {/* English Description */}
                            <div className="space-y-2">
                                <label htmlFor="descriptionEn" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    {t("Services.Description in English")}
                                </label>
                                <Field name="descriptionEn">
                                    {({ field }) => (
                                        <textarea
                                            {...field}
                                            onClick={(e) => e.stopPropagation()}
                                            onBlur={(e) => {
                                                e.stopPropagation();
                                                field.onBlur && field.onBlur(e);
                                            }}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.descriptionEn && touched.descriptionEn ? "border-red-300 focus:ring-red-200 bg-red-50" : "border-gray-300 focus:ring-primary focus:border-primary"
                                                }`}
                                            placeholder={t("Services.Description in English")}
                                            rows={4}
                                            dir="ltr"
                                            disabled={isSubmitting}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="descriptionEn" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                            </div>

                            {/* Arabic Description */}
                            <div className="space-y-2">
                                <label htmlFor="descriptionAr" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    {t("Services.Description in Arabic")}
                                </label>
                                <Field name="descriptionAr">
                                    {({ field }) => (
                                        <textarea
                                            {...field}
                                            onClick={(e) => e.stopPropagation()}
                                            onBlur={(e) => {
                                                e.stopPropagation();
                                                field.onBlur && field.onBlur(e);
                                            }}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.descriptionAr && touched.descriptionAr ? "border-red-300 focus:ring-red-200 bg-red-50" : "border-gray-300 focus:ring-primary focus:border-primary"
                                                }`}
                                            placeholder={t("Services.Description in Arabic")}
                                            rows={4}
                                            dir="rtl"
                                            disabled={isSubmitting}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="descriptionAr" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting || isUpdating}
                                className={`cursor-pointer w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                                    }`}
                            >
                                {isSubmitting ? t("Services.Submitting...") : t("Services.Save")}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default UpdateService
