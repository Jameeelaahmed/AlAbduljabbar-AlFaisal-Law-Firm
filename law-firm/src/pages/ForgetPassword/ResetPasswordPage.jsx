import React, { useState } from 'react';
import { useResetPassword } from '../../hooks/useResetPassword';
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import authImg from '../../assets/AuthPics/auth.jpg';

export default function ResetPasswordPage() {
    const { t } = useTranslation();
    const resetPasswordMutation = useResetPassword();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div
            className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${authImg})` }}
        >
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            <div className="z-30 bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-2">
                        {t('ForgetPassword.resetTitle')}
                    </h2>
                    <p className="text-secondary text-sm">
                        {t('ForgetPassword.resetSubtitle')}
                    </p>
                </div>

                {/* Form */}
                <Formik
                    initialValues={{
                        newPassword: '',
                        confirmPassword: ''
                    }}
                    validationSchema={Yup.object({
                        newPassword: Yup.string()
                            .min(6, t('ForgetPassword.passwordMinLength'))
                            .required(t('ForgetPassword.passwordRequired')),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('newPassword'), null], t('ForgetPassword.passwordsNotMatch'))
                            .required(t('ForgetPassword.confirmPasswordRequired')),
                    })}
                    onSubmit={(values) => {
                        resetPasswordMutation.mutate({
                            email: localStorage.getItem("forgotPasswordEmail"),
                            token: localStorage.getItem("resetToken"),
                            newPassword: values.newPassword,
                            confirmPassword: values.confirmPassword
                        });
                    }}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className="space-y-4">
                            {/* New Password Field */}
                            <div className="space-y-2">
                                <label htmlFor="newPassword" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    <Lock className="w-4 h-4 text-secondary" />
                                    {t('ForgetPassword.newPassword')}
                                </label>
                                <div className="relative">
                                    <Field name="newPassword">
                                        {({ field }) => (
                                            <input
                                                {...field}
                                                type={showPassword ? 'text' : 'password'}
                                                className={`w-full pl-4 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.newPassword && touched.newPassword
                                                    ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                                    : 'border-gray-300 focus:ring-primary focus:border-primary'
                                                    }`}
                                                placeholder={t('ForgetPassword.newPasswordPlaceholder')}
                                                dir="ltr"
                                                style={{ WebkitTextSecurity: showPassword ? 'none' : 'disc' }}
                                            />
                                        )}
                                    </Field>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <ErrorMessage name="newPassword" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                            </div>

                            {/* Confirm Password Field */}
                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    <Lock className="w-4 h-4 text-secondary" />
                                    {t('ForgetPassword.confirmPassword')}
                                </label>
                                <div className="relative">
                                    <Field name="confirmPassword">
                                        {({ field }) => (
                                            <input
                                                {...field}
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                className={`w-full pl-4 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.confirmPassword && touched.confirmPassword
                                                    ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                                    : 'border-gray-300 focus:ring-primary focus:border-primary'
                                                    }`}
                                                placeholder={t('ForgetPassword.confirmPasswordPlaceholder')}
                                                dir="ltr"
                                                style={{ WebkitTextSecurity: showConfirmPassword ? 'none' : 'disc' }}
                                            />
                                        )}
                                    </Field>
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                            </div>

                            {/* Password Requirements */}
                            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600">
                                <p className="font-semibold mb-1">{t('ForgetPassword.passwordRequirements')}</p>
                                <ul className="space-y-1">
                                    <li>• {t('ForgetPassword.passwordRequirement1')}</li>
                                    <li>• {t('ForgetPassword.passwordRequirement2')}</li>
                                </ul>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`w-full py-3 px-4 cursor-pointer rounded-lg font-semibold text-white transition-all duration-300 transform ${isSubmitting
                                    ? 'bg-primary cursor-not-allowed'
                                    : 'bg-primary hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                                    }`}
                            >
                                {resetPasswordMutation.isPending ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        {t('ForgetPassword.resetting')}
                                    </div>
                                ) : (
                                    t('ForgetPassword.resetPassword')
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
