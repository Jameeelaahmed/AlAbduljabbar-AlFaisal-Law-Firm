// libs
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
// files
import { registerUser } from '../../../api/auth';
// icons
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {errorMessage && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm text-center font-medium">
                            {errorMessage}
                        </p>
                    </div>
                )}

                <Formik
                    initialValues={{ fullNameEn: '', fullNameAr: '', email: '', mobileNumber: '', whatsAppNumber: '', password: '', confirmPassword: '' }}
                    validationSchema={Yup.object({
                        fullNameEn: Yup.string()
                            .min(2, 'يجب أن يكون الاسم الأول على الأقل حرفين')
                            .required('الاسم الأول مطلوب'),
                        fullNameAr: Yup.string()
                            .min(2, 'يجب أن يكون الاسم الأخير على الأقل حرفين')
                            .required('الاسم الأخير مطلوب'),
                        email: Yup.string()
                            .email('عنوان البريد الإلكتروني غير صحيح')
                            .required('البريد الإلكتروني مطلوب'),
                        mobileNumber: Yup.string()
                            .required('رقم الهاتف المحمول مطلوب'),
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
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                            setErrorMessage('');
                            const res = await registerUser(values);
                            if (res?.isSuccess) {
                                toast.success("تم إنشاء الحساب بنجاح");
                                resetForm();
                                navigate('/login');
                            }
                        }
                        catch (err) {
                            let errMsg;

                            if (err.response?.status === 400) {
                                errMsg = t('auth.emailAlreadyRegistered');
                            } else {
                                errMsg = err.response?.data?.error?.description
                                    || err.response?.data?.message
                                    || err.message;
                            }

                            setErrorMessage(errMsg);
                            toast.error(errMsg);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting, errors, touched, values, handleChange, handleBlur }) => (
                        <Form className="space-y-3">
                            {/* First Name and Last Name Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="fullNameEn" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                        <User className="w-4 h-4 text-secondary" />
                                        الاسم بالكامل باللغة الانجليزيه
                                    </label>
                                    <Field name="fullNameEn">
                                        {({ field }) => (
                                            <input
                                                {...field}
                                                id="fullNameEn"
                                                type="text"
                                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 placeholder-gray-400 bg-white ${errors.fullNameEn && touched.fullNameEn
                                                    ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                                    : 'border-gray-300 focus:ring-primary focus:border-primary'
                                                    }`}
                                                placeholder="أدخل اسمك الكامل باللغه الانجليزيه"
                                                dir="auto"
                                                autoComplete="name"
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="fullNameEn" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="fullNameAr" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                        <User className="w-4 h-4 text-secondary" />
                                        الاسم بالكامل باللغة العربيه
                                    </label>
                                    <Field name="fullNameAr">
                                        {({ field }) => (
                                            <input
                                                {...field}
                                                id="fullNameAr"
                                                type="text"
                                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 placeholder-gray-400 bg-white ${errors.fullNameAr && touched.fullNameAr
                                                    ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                                    : 'border-gray-300 focus:ring-primary focus:border-primary'
                                                    }`}
                                                placeholder="أدخل اسمك بالكامل باللغة العربيه"
                                                dir="auto"
                                                autoComplete="name"
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="fullNameAr" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                                </div>
                            </div>

                            {/* Phone number Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="mobileNumber" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                        <User className="w-4 h-4 text-secondary" />
                                        رقم الهاتف المحمول
                                    </label>
                                    <Field name="mobileNumber">
                                        {({ field }) => (
                                            <input
                                                {...field}
                                                id="mobileNumber"
                                                type="text"
                                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 placeholder-gray-400 bg-white ${errors.mobileNumber && touched.mobileNumber
                                                    ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                                    : 'border-gray-300 focus:ring-primary focus:border-primary'
                                                    }`}
                                                placeholder="أدخل رقم هاتفك المحمول"
                                                dir="auto"
                                                autoComplete="tel"
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="mobileNumber" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="whatsAppNumber" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                        <User className="w-4 h-4 text-secondary" />
                                        رقم الواتس اب
                                    </label>
                                    <Field name="whatsAppNumber">
                                        {({ field }) => (
                                            <input
                                                {...field}
                                                id="whatsAppNumber"
                                                type="text"
                                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 placeholder-gray-400 bg-white border-gray-300 focus:ring-primary focus:border-primary`}
                                                placeholder="أدخل رقم الواتس اب"
                                                dir="auto"
                                                autoComplete="tel"
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="whatsAppNumber" component="div" className="text-red-500 text-xs mt-1 font-medium" />
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
                                            id="email"
                                            type="email"
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 placeholder-gray-400 bg-white ${errors.email && touched.email
                                                ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                                : 'border-gray-300 focus:ring-primary focus:border-primary'
                                                }`}
                                            placeholder="example@email.com"
                                            dir="ltr"
                                            autoComplete="email"
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    <Lock className="w-4 h-4 text-secondary" /> كلمة المرور
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full pl-4 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 placeholder-gray-400 bg-white ${errors.password && touched.password
                                            ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                            : 'border-gray-300 focus:ring-primary focus:border-primary'
                                            }`}
                                        placeholder="أدخل كلمة مرور قوية"
                                        dir="ltr"
                                        autoComplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
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
                                    <Lock className="w-4 h-4 text-secondary" /> تأكيد كلمة المرور
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full pl-4 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 placeholder-gray-400 bg-white ${errors.confirmPassword && touched.confirmPassword
                                            ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                            : 'border-gray-300 focus:ring-primary focus:border-primary'
                                            }`}
                                        placeholder="أعد إدخال كلمة المرور"
                                        dir="ltr"
                                        autoComplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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

                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    )
}

export default RegisterForm
