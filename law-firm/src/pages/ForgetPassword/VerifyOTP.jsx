import React, { useState, useRef, useEffect } from 'react';
import { useVerifyOTP } from '../../hooks/useVerifyOTP';
import { ArrowLeft, Mail, RotateCcw } from 'lucide-react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import authImg from '../../assets/AuthPics/auth.jpg';

export default function VerifyOTP() {
    const { t } = useTranslation();
    const verifyOTPMutation = useVerifyOTP();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const [timeLeft, setTimeLeft] = useState(120);
    const [errorMessage, setErrorMessage] = useState('');
    const forgetPasswordEmail = localStorage.getItem("forgotPasswordEmail");
    console.log(forgetPasswordEmail)

    // Countdown timer
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    // Handle mutation error
    useEffect(() => {
        if (verifyOTPMutation.isError && verifyOTPMutation.error) {
            const error = verifyOTPMutation.error;
            let errorMsg = '';

            if (error?.response?.data?.error?.description) {
                const description = error.response.data.error.description;
                if (description.includes('expired')) {
                    errorMsg = t('ForgetPassword.wrongCode');
                } else {
                    errorMsg = description;
                }
            } else if (error?.message) {
                errorMsg = error.message;
            } else {
                errorMsg = t('ForgetPassword.serverError');
            }

            setErrorMessage(errorMsg);
        }
    }, [verifyOTPMutation.isError, verifyOTPMutation.error, t]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Clear error message when user starts typing
        if (errorMessage) {
            setErrorMessage('');
        }

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newOtp = [...otp];
        for (let i = 0; i < pastedData.length; i++) {
            newOtp[i] = pastedData[i];
        }
        setOtp(newOtp);

        // Focus the next empty input or the last one
        const nextIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    const handleSubmit = () => {
        const otpString = otp.join('');
        if (otpString.length === 6) {
            // Clear any previous error message
            setErrorMessage('');
            verifyOTPMutation.mutate({ otp: otpString, email: forgetPasswordEmail });
        }
    };

    const resendOTP = () => {
        // Reset timer and resend OTP
        setTimeLeft(120);
        // Clear error message
        setErrorMessage('');
        // You might want to call the forgot password API again here
        console.log('Resending OTP...');
    };

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
                        <Mail className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-2">
                        {t('ForgetPassword.verifyTitle')}
                    </h2>
                    <p className="text-secondary text-sm">
                        {t('ForgetPassword.verifySubtitle')}
                    </p>
                </div>

                {/* Form */}
                <Formik
                    initialValues={{ otp: '' }}
                    validationSchema={Yup.object({
                        otp: Yup.string()
                            .length(6, t('ForgetPassword.otpLength'))
                            .required(t('ForgetPassword.otpRequired')),
                    })}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="space-y-6">
                            {/* OTP Input */}
                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-primary text-center">
                                    {t('ForgetPassword.otpLabel')}
                                </label>
                                <div className="flex justify-center gap-3">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            maxLength="1"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            onPaste={handlePaste}
                                            className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.otp && touched.otp
                                                ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                                : 'border-gray-300 focus:ring-primary focus:border-primary'
                                                }`}
                                            dir="ltr"
                                        />
                                    ))}
                                </div>
                                <ErrorMessage name="otp" component="div" className="text-red-500 text-xs mt-1 font-medium text-center" />

                                {/* API Error Message */}
                                {errorMessage && (
                                    <div className="text-red-500 text-xs mt-2 font-medium text-center bg-red-50 border border-red-200 rounded-lg p-2">
                                        {errorMessage}
                                    </div>
                                )}
                            </div>

                            {/* Timer */}
                            <div className="text-center">
                                {timeLeft > 0 ? (
                                    <p className="text-sm text-gray-600">
                                        {t('ForgetPassword.resendTimer')}{' '}
                                        <span className="font-semibold text-primary">{formatTime(timeLeft)}</span>
                                    </p>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={resendOTP}
                                        className="flex items-center justify-center gap-2 text-sm text-secondary hover:text-primary transition-colors mx-auto"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                        {t('ForgetPassword.resendCode')}
                                    </button>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={otp.join('').length !== 6 || verifyOTPMutation.isPending}
                                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform ${otp.join('').length !== 6 || verifyOTPMutation.isPending
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-primary hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                                    }`}
                            >
                                {verifyOTPMutation.isPending ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        {t('ForgetPassword.verifying')}
                                    </div>
                                ) : (
                                    t('ForgetPassword.verifyCode')
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
