// libs
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff, User, Mail, Lock, Shield } from 'lucide-react';
import { useState } from 'react';

function RegisterFormPresentational() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white/90 rounded-2xl shadow-2xl p-8">
                    {/* Header */}
                    <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold text-primary mb-2">إنشاء حساب جديد</h2>
                        <p className="text-secondary text-sm">انضم إلى مكتب العبدالجبار والفيصل للمحاماة</p>
                    </div>
                    <Formik
                        initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }}
                        validationSchema={Yup.object({
                            firstName: Yup.string()
                                .min(2, 'يجب أن يكون الاسم الأول على الأقل حرفين')
                                .max(15, 'يجب أن يكون الاسم الأول أقل من 15 حرف')
                                .required('الاسم الأول مطلوب'),
                            lastName: Yup.string()
                                .min(2, 'يجب أن يكون الاسم الأخير على الأقل حرفين')
                                .max(15, 'يجب أن يكون الاسم الأخير أقل من 15 حرف')
                                .required('الاسم الأخير مطلوب'),
                            email: Yup.string()
                                .email('عنوان البريد الإلكتروني غير صحيح')
                                .required('البريد الإلكتروني مطلوب'),
                            password: Yup.string()
                                .min(8, 'كلمة المرور يجب أن تكون على الأقل 8 أحرف')
                                .matches(
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                                    'كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم ورمز خاص'
                                )
                                .required('كلمة المرور مطلوبة'),
                            confirmPassword: Yup.string()
                                .oneOf([Yup.ref('password'), null], 'كلمات المرور غير متطابقة')
                                .required('تأكيد كلمة المرور مطلوب')
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                console.log('Registration data:', values);
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form className="space-y-3">
                                {/* First Name and Last Name Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                            <User className="w-4 h-4 text-secondary" />
                                            الاسم الأول
                                        </label>
                                        <Field name="firstName">
                                            {({ field }) => (
                                                <input
                                                    {...field}
                                                    type="text"
                                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.firstName && touched.firstName
                                                        ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                                        : 'border-gray-300 focus:ring-primary focus:border-primary'
                                                        }`}
                                                    placeholder="أدخل اسمك الأول"
                                                    dir="auto"
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                            <User className="w-4 h-4 text-secondary" />
                                            الاسم الأخير
                                        </label>
                                        <Field name="lastName">
                                            {({ field }) => (
                                                <input
                                                    {...field}
                                                    type="text"
                                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.lastName && touched.lastName
                                                        ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                                        : 'border-gray-300 focus:ring-primary focus:border-primary'
                                                        }`}
                                                    placeholder="أدخل اسمك الأخير"
                                                    dir="auto"
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                                    </div>
                                </div>

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
                                                type="email"
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
                                                    {...field}
                                                    type={showPassword ? 'text' : 'password'}
                                                    className={`w-full pl-4 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.password && touched.password
                                                        ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                                        : 'border-gray-300 focus:ring-primary focus:border-primary'
                                                        }`}
                                                    placeholder="أدخل كلمة مرور قوية"
                                                    dir="ltr"
                                                    style={{ WebkitTextSecurity: showPassword ? 'none' : 'disc' }}
                                                />
                                            )}
                                        </Field>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                                    <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                                        كلمة المرور يجب أن تحتوي على: حرف كبير، حرف صغير، رقم، ورمز خاص (8 أحرف على الأقل)
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <label htmlFor="confirmPassword" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                        <Lock className="w-4 h-4 text-secondary" />
                                        تأكيد كلمة المرور
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
                                                    placeholder="أعد إدخال كلمة المرور"
                                                    dir="ltr"
                                                />
                                            )}
                                        </Field>
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform ${isSubmitting
                                        ? 'bg-primary cursor-not-allowed'
                                        : 'bg-primary hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            جاري الإنشاء...
                                        </div>
                                    ) : (
                                        'إنشاء الحساب'
                                    )}
                                </button>

                                {/* Footer */}
                                <div className="text-center mt-6">
                                    <p className="text-sm text-primary">
                                        لديك حساب بالفعل؟{' '}
                                        <a href="#" className="text-secondary hover:text-secondary font-semibold hover:underline transition-colors">
                                            تسجيل الدخول
                                        </a>
                                    </p>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default RegisterFormPresentational
