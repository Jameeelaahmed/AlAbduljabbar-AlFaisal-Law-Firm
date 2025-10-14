import React from 'react';
import { useForgotPassword } from '../../hooks/useForgotPassword';
import { Mail, ArrowLeft } from 'lucide-react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import authImg from '../../assets/AuthPics/auth.jpg';

export default function ForgetPasswordPage() {
    const { t } = useTranslation();
    const forgotPasswordMutation = useForgotPassword();

    return (
        <div
            className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${authImg})` }}
        >
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            <div className="z-30 bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-primary mb-2">
                        {t('ForgetPassword.title')}
                    </h2>
                    <p className="text-secondary text-sm">
                        {t('ForgetPassword.subtitle')}
                    </p>
                </div>

                {/* Form */}
                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email(t('ForgetPassword.emailInvalid'))
                            .required(t('ForgetPassword.emailRequired')),
                    })}
                    onSubmit={(values) => forgotPasswordMutation.mutate(values.email)}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className="space-y-4">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    <Mail className="w-4 h-4 text-secondary" />
                                    {t('ForgetPassword.email')}
                                </label>
                                <Field name="email">
                                    {({ field }) => (
                                        <input
                                            {...field}
                                            type="email"
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.email && touched.email
                                                ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                                : 'border-gray-300 focus:ring-primary focus:border-primary'
                                                }`}
                                            placeholder={t('ForgetPassword.emailPlaceholder')}
                                            dir="ltr"
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform ${isSubmitting
                                    ? 'bg-primary cursor-not-allowed'
                                    : 'bg-primary hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                                    }`}
                            >
                                {forgotPasswordMutation.isPending ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        {t('ForgetPassword.sending')}
                                    </div>
                                ) : (
                                    t('ForgetPassword.sendCode')
                                )}
                            </button>
                        </Form>
                    )}
                </Formik>

                {/* Back to Login */}
                <div className="text-center mt-6">
                    <Link
                        to="/login"
                        className="flex items-center justify-center gap-2 text-sm text-primary hover:text-secondary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t('ForgetPassword.backToLogin')}
                    </Link>
                </div>
            </div>
        </div>
    );
}
