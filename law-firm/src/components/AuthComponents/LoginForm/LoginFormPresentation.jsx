// libs
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff, User, Mail, Lock, Shield } from 'lucide-react';
import { useState } from 'react';
function LoginFormPresentation() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white/90 rounded-2xl shadow-2xl p-8">
                    {/* Header */}
                    <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold text-primary mb-2">تسجيل دخول </h2>
                        <p className="text-secondary text-sm">انضم إلى مكتب العبدالجبار والفيصل للمحاماة</p>
                    </div>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={Yup.object({
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
        </div>

    )
}

export default LoginFormPresentation
