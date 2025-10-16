// libs
import { useTranslation } from "react-i18next";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    useCreateConsultationType,
    useUpdateConsultaionType,
} from "../../../../hooks/useConsultations";

/**
 * Props:
 * - typeId (optional) : id of type to edit. If absent, modal creates a new type.
 * - onClose (optional) : called after closing.
 * - onSaved (optional) : called after successful create/update.
 */
function AddTypeModal({ onClose, typeId, typeName, isFetching, fetchError }) {
    const { t } = useTranslation();

    // fetch existing data when editing

    const createMutation = useCreateConsultationType();
    const updateMutation = useUpdateConsultaionType();

    const callMutate = (mutation, payload) => {
        if (!mutation) return Promise.reject(new Error("Missing mutation"));
        if (mutation.mutateAsync) return mutation.mutateAsync(payload);
        return new Promise((resolve, reject) =>
            mutation.mutate(payload, { onSuccess: resolve, onError: reject })
        );
    };

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            if (typeId) {
                const payload = {
                    NameEn: values.nameEn,
                    NameAr: values.nameAr,
                    id: typeId,
                };
                await callMutate(updateMutation, { id: typeId, data: payload });
            } else {
                await callMutate(createMutation, values);
            }
            onClose();
        } catch (err) {
            // minimal error handling: surface message to form-level error
            setErrors({ submit: err?.message || "Failed" });
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const isMutating = createMutation?.isLoading || updateMutation?.isLoading;

    return (
        <div className="flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            <div className="w-full max-w-md">
                <Formik
                    enableReinitialize
                    initialValues={{
                        nameEn: typeName?.nameEn || "",
                        nameAr: typeName?.nameAr || "",
                    }}
                    validationSchema={Yup.object({
                        nameEn: Yup.string().min(3).required(t("English type name is required")),
                        nameAr: Yup.string().min(3).required(t("Arabic type name is required")),
                    })}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form
                            className="space-y-3"
                            onClick={(e) => e.stopPropagation()}
                            onBlur={(e) => e.stopPropagation()}
                        >
                            {/* show fetch error if any */}
                            {fetchError && (
                                <div className="text-red-600 text-sm mb-2">{t("Failed to load type data")}</div>
                            )}

                            {/* English Name */}
                            <div className="space-y-2">
                                <label htmlFor="nameEn" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    {t("Type Name in English")}
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
                                            placeholder={t("Type Name in English")}
                                            dir="ltr"
                                            disabled={isSubmitting || isMutating || isFetching}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="nameEn" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                            </div>

                            {/* Arabic Name */}
                            <div className="space-y-2">
                                <label htmlFor="nameAr" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    {t("Type Name in Arabic")}
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
                                                placeholder={t("Type Name in Arabic")}
                                                dir="rtl"
                                                disabled={isSubmitting || isMutating || isFetching}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="nameAr" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                                </div>
                            </div>

                            {/* form-level submit error */}
                            {errors.submit && <div className="text-red-600 text-sm">{errors.submit}</div>}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting || isMutating || isFetching}
                                className={`cursor-pointer w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform ${isSubmitting || isMutating || isFetching ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                                    }`}
                            >
                                {isSubmitting || isMutating || isFetching ? t("Services.Submitting...") : t("Services.Save")}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default AddTypeModal;
