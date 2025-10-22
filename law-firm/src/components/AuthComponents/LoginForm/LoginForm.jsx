// hooks
import { useLogin } from "../../../hooks/useLogin"
// icons
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
// libs
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useState } from "react";
import { Link } from "react-router-dom";
function LoginForm() {
    const loginMutation = useLogin();
    const [showPassword, setShowPassword] = useState(true);

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {loginMutation.isError && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm text-center font-medium">
                            {loginMutation.error?.message}
                        </p>
                    </div>
                )}

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email('عنوان البريد الإلكتروني غير صحيح')
                            .required('البريد الإلكتروني مطلوب'),
                        password: Yup.string()
                            .required('كلمة المرور مطلوبة'),
                    })}
                    onSubmit={(values) => loginMutation.mutate(values)}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className="space-y-3">
                            {/* Email */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    <Mail className="w-4 h-4 text-secondary" />
                                    البريد الإلكتروني
                                </label>
                                <Field name="email">
                                    {({ field }) => (
                                        <input
                                            {...field}
                                            type="string"
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.email && touched.email
                                                ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                                : 'border-gray-300 focus:ring-primary focus:border-primary'
                                                }`}
                                            placeholder="example@email.com"
                                            dir="ltr"
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    <Lock className="w-4 h-4 text-secondary" />
                                    كلمة المرور
                                </label>
                                <div className="relative">
                                    <Field name="password">
                                        {({ field }) => (
                                            <input
                                                id="password"
                                                {...field}
                                                type={showPassword ? 'text' : 'password'}
                                                className={`w-full pl-4 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.password && touched.password
                                                    ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                                    : 'border-gray-300 focus:ring-primary focus:border-primary'
                                                    }`}
                                                placeholder="أدخل كلمة مرور"
                                                dir="ltr"
                                            />
                                        )}
                                    </Field>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors pointer-events-auto z-10 p-1 touch-manipulation"
                                        aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                            </div>

                            {/* Forgot Password Footer */}
                            <div className="text-center mt-6">
                                <p className="text-sm text-primary">
                                    نسيت كلمة المرور؟{' '}
                                    <Link to="/forget-password" className="text-secondary hover:text-secondary font-semibold hover:underline transition-colors">
                                        استعادة كلمة المرور
                                    </Link>
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`w-full py-3 cursor-pointer px-4 rounded-lg font-semibold text-white transition-all duration-300 transform ${isSubmitting
                                    ? 'bg-primary cursor-not-allowed'
                                    : 'bg-primary hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                                    }`}
                            >
                                {loginMutation.isPending ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        جاري تسجيل الدخول...
                                    </div>
                                ) : (
                                    'تسجيل دخول'
                                )}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>

    )
}

export default LoginForm
