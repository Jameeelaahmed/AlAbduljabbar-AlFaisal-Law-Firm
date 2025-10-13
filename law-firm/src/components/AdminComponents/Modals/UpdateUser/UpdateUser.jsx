import { useTranslation } from "react-i18next";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useGetUserForUpdate, useUpdateUser } from "../../../../hooks/useUsers";

function UpdateUser({ userId, onSuccess, onFailure }) {
    const { t } = useTranslation();
    const { data: user, isLoading } = useGetUserForUpdate(userId);
    const { mutateAsync: updateUser, isLoading: isUpdating } = useUpdateUser();

    if (isLoading || !user) return <div className="text-center p-6">جاري التحميل...</div>;

    return (
        <div className="flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            <div className="w-full max-w-lg">
                <Formik
                    enableReinitialize
                    initialValues={{
                        FullNameEn: user.fullNameEn || "",
                        FullNameAr: user.fullNameAr || "",
                        email: user.email || "",
                        role: user.role || "Admin",
                        mobileNumber: user.mobileNumber || "",
                        whatsAppNumber: user.whatsAppNumber || "",
                    }}
                    validationSchema={Yup.object({
                        FullNameEn: Yup.string().min(3).required(t("English name is required")),
                        FullNameAr: Yup.string().min(3).required(t("Arabic name is required")),
                        email: Yup.string().email().required(t("Email is required")),
                        role: Yup.string().required(t("Role is required")),
                        mobileNumber: Yup.string().required(t("Mobile number is required")),
                        whatsAppNumber: Yup.string().required(t("WhatsApp number is required")),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        try {
                            console.log(userId, values);
                            await updateUser({ id: userId, data: values });
                            toast.success(t("Users.User updated successfully"));
                            onSuccess?.();
                        } catch (err) {
                            toast.error(err?.response?.data?.message || t("Users.Failed to update user"));
                            console.error("Update user failed:", err);
                            onFailure?.();

                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className="space-y-4" onClick={(e) => e.stopPropagation()} onBlur={(e) => e.stopPropagation()}>
                            <FormField name="FullNameAr" label={t("Users.Name in Arabic")} dir="rtl" errors={errors} touched={touched} disabled={isSubmitting || isUpdating} />
                            <FormField name="FullNameEn" label={t("Users.Name in English")} dir="ltr" errors={errors} touched={touched} disabled={isSubmitting || isUpdating} />
                            <FormField name="email" label={t("Users.Email")} type="email" errors={errors} touched={touched} disabled={isSubmitting || isUpdating} />
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-primary">{t("Users.Role")}</label>
                                <Field
                                    as="select"
                                    name="role"
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.role && touched.role
                                        ? "border-red-300 focus:ring-red-200 bg-red-50"
                                        : "border-gray-300 focus:ring-primary focus:border-primary"
                                        }`}
                                    disabled={isSubmitting || isUpdating}
                                >
                                    <option value="Admin">{t("Users.Admin")}</option>
                                    <option value="Support">{t("Users.Support")}</option>
                                    <option value="Client">{t("Users.Client")}</option>
                                </Field>


                                <ErrorMessage name="role" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                            </div>
                            <FormField name="mobileNumber" label={t("Users.Mobile Number")} errors={errors} touched={touched} disabled={isSubmitting || isUpdating} />
                            <FormField name="whatsAppNumber" label={t("Users.WhatsApp Number")} errors={errors} touched={touched} disabled={isSubmitting || isUpdating} />

                            <button type="submit" disabled={isSubmitting || isUpdating} className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform ${isSubmitting || isUpdating ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"}`}>
                                {isSubmitting || isUpdating ? t("Users.Submitting...") : t("Users.Save")}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default UpdateUser;

function FormField({ name, label, placeholder, type = "text", dir = "auto", errors, touched, disabled }) {
    return (
        <div className="space-y-2">
            <label htmlFor={name} className="text-sm font-semibold text-primary">{label}</label>
            <Field name={name}>
                {({ field }) => (
                    <input {...field} id={name} type={type} placeholder={placeholder} dir={dir} disabled={disabled} className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors[name] && touched[name] ? "border-red-300 focus:ring-red-200 bg-red-50" : "border-gray-300 focus:ring-primary focus:border-primary"}`} />
                )}
            </Field>
            <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1 font-medium" />
        </div>
    );
}
