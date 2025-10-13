import React from "react";
import { useTranslation } from "react-i18next";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useCreateUser } from "../../../../hooks/useUsers";

export default function AddUser({ onSuccess, onFailure }) {
    const { t } = useTranslation();
    const { mutateAsync: createUser, isLoading } = useCreateUser();

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                <Formik
                    initialValues={{
                        fullNameEn: "",
                        fullNameAr: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        role: "Admin",
                        mobileNumber: "",
                        whatsAppNumber: "",
                        branchId: 1,
                    }}
                    validationSchema={Yup.object({
                        fullNameEn: Yup.string().min(3).required(t("English name is required")),
                        fullNameAr: Yup.string().min(3).required(t("Arabic name is required")),
                        email: Yup.string().email().required(t("Email is required")),
                        password: Yup.string()
                            .min(6, t("Password must be at least 6 characters"))
                            .required(t("Password is required")),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], t("Passwords must match"))
                            .required(t("Confirm password is required")),
                        role: Yup.string().required(t("Role is required")),
                        mobileNumber: Yup.string().required(t("Mobile number is required")),
                        whatsAppNumber: Yup.string().required(t("WhatsApp number is required")),
                        branchId: Yup.number().required(t("Branch is required")),
                    })}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        try {
                            await createUser(values);
                            toast.success(t("Users.User created successfully"));
                            resetForm();
                            onSuccess?.();
                        } catch (err) {
                            toast.error(err?.response?.data?.message || t("Users.Failed to create user"));
                            console.error("Create user failed:", err);
                            onFailure?.();
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField name="fullNameAr" label={t("Users.Name in Arabic")} dir="rtl" errors={errors} touched={touched} disabled={isSubmitting || isLoading} />
                                <FormField name="fullNameEn" label={t("Users.Name in English")} dir="ltr" errors={errors} touched={touched} disabled={isSubmitting || isLoading} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField name="email" label={t("Users.Email")} type="email" errors={errors} touched={touched} disabled={isSubmitting || isLoading} />
                                <FormField name="mobileNumber" label={t("Users.Mobile Number")} errors={errors} touched={touched} disabled={isSubmitting || isLoading} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField name="password" label={t("Users.Password")} type="password" errors={errors} touched={touched} disabled={isSubmitting || isLoading} />
                                <FormField name="confirmPassword" label={t("Users.Confirm Password")} type="password" errors={errors} touched={touched} disabled={isSubmitting || isLoading} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-primary">{t("Users.Branch")}</label>
                                    <Field
                                        as="select"
                                        name="branchId"
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.branchId && touched.branchId
                                            ? "border-red-300 focus:ring-red-200 bg-red-50"
                                            : "border-gray-300 focus:ring-primary focus:border-primary"
                                            }`}
                                        disabled={isSubmitting || isLoading}
                                    >
                                        <option value="1">{t("Users.Saudi Arabia Branch")}</option>
                                        <option value="2">{t("Users.Egypt Branch")}</option>
                                    </Field>
                                    <ErrorMessage name="branchId" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-primary">{t("Users.Role")}</label>
                                    <Field
                                        as="select"
                                        name="role"
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.role && touched.role
                                            ? "border-red-300 focus:ring-red-200 bg-red-50"
                                            : "border-gray-300 focus:ring-primary focus:border-primary"
                                            }`}
                                        disabled={isSubmitting || isLoading}
                                    >
                                        <option value="Admin">{t("Users.Admin")}</option>
                                        <option value="CustomerService">{t("Users.Support")}</option>
                                        <option value="User">{t("Users.Client")}</option>
                                    </Field>
                                    <ErrorMessage name="role" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField name="whatsAppNumber" label={t("Users.WhatsApp Number")} errors={errors} touched={touched} disabled={isSubmitting || isLoading} />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || isLoading}
                                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform ${isSubmitting || isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"}`}
                            >
                                {isSubmitting || isLoading ? t("Users.Submitting...") : t("Users.Save")}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

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
