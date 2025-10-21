import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function Security({ changePasswordMutation }) {
    const { t } = useTranslation();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-primary mb-2">{t('Settings.changePassword')}</h2>
                    <p className="text-gray-600">{t('Settings.chPasswordDesc')}</p>
                </div>

                <Formik
                    initialValues={{
                        OldPassword: '',
                        newPassword: '',
                        ConfirmPassword: ''
                    }}
                    validationSchema={Yup.object({
                        OldPassword: Yup.string()
                            .required(t('Settings.currentPasswordRequired')),
                        newPassword: Yup.string()
                            .min(6, t('Settings.passwordMinLength'))
                            .required(t('Settings.newPasswordRequired')),
                        ConfirmPassword: Yup.string()
                            .oneOf([Yup.ref('newPassword'), null], t('Settings.passwordsNotMatch'))
                            .required(t('Settings.confirmPasswordRequired')),
                    })}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                            await changePasswordMutation.mutateAsync({
                                OldPassword: values.OldPassword,
                                newPassword: values.newPassword,
                                ConfirmPassword: values.ConfirmPassword
                            });
                            resetForm();
                        } catch (error) {
                            console.error('Password change failed:', error);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className="space-y-6">
                            {/* Current Password */}
                            <div className="space-y-2">
                                <label htmlFor="OldPassword" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    <Lock className="w-4 h-4 text-secondary" />
                                    {t('Settings.currentPassword')}
                                </label>
                                <div className="relative">
                                    <Field name="OldPassword">
                                        {({ field }) => (
                                            <input
                                                {...field}
                                                type={showCurrentPassword ? 'text' : 'password'}
                                                className={`w-full pl-4 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.OldPassword && touched.OldPassword
                                                    ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                                    : 'border-gray-300 focus:ring-primary focus:border-primary'
                                                    }`}
                                                placeholder={t('Settings.currentPassword')}
                                                dir="ltr"
                                                disabled={isSubmitting}
                                            />
                                        )}
                                    </Field>
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                                        disabled={isSubmitting}
                                    >
                                        {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <ErrorMessage name="OldPassword" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                            </div>

                            {/* New Password */}
                            <div className="space-y-2">
                                <label htmlFor="newPassword" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    <Lock className="w-4 h-4 text-secondary" />
                                    {t('Settings.newPassword')}
                                </label>
                                <div className="relative">
                                    <Field name="newPassword">
                                        {({ field }) => (
                                            <input
                                                {...field}
                                                type={showNewPassword ? 'text' : 'password'}
                                                className={`w-full pl-4 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.newPassword && touched.newPassword
                                                    ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                                    : 'border-gray-300 focus:ring-primary focus:border-primary'
                                                    }`}
                                                placeholder={t('Settings.newPassword')}
                                                dir="ltr"
                                                disabled={isSubmitting}
                                            />
                                        )}
                                    </Field>
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                                        disabled={isSubmitting}
                                    >
                                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <ErrorMessage name="newPassword" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                            </div>

                            {/* Confirm New Password */}
                            <div className="space-y-2">
                                <label htmlFor="ConfirmPassword" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    <Lock className="w-4 h-4 text-secondary" />
                                    {t('Settings.confirmNewPassword')}
                                </label>
                                <div className="relative">
                                    <Field name="ConfirmPassword">
                                        {({ field }) => (
                                            <input
                                                {...field}
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                className={`w-full pl-4 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.ConfirmPassword && touched.ConfirmPassword
                                                    ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                                    : 'border-gray-300 focus:ring-primary focus:border-primary'
                                                    }`}
                                                placeholder={t('Settings.confirmNewPassword')}
                                                dir="ltr"
                                                disabled={isSubmitting}
                                            />
                                        )}
                                    </Field>
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                                        disabled={isSubmitting}
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <ErrorMessage name="ConfirmPassword" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                            </div>

                            {/* Password Requirements */}
                            <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600">
                                <p className="font-semibold mb-2">{t('Settings.passwordRequirements')}</p>
                                <ul className="space-y-1">
                                    <li>• {t('Settings.passwordRequirement1')}</li>
                                    <li>• {t('Settings.passwordRequirement2')}</li>
                                </ul>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform ${isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-primary hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        {t('Settings.saving')}
                                    </div>
                                ) : (
                                    t('Settings.saveChanges')
                                )}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
