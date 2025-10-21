import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCreateConatctUsForm } from '../../../hooks/useConactUsForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactUs = () => {
    const { t, i18n } = useTranslation();
    const [submitStatus, setSubmitStatus] = useState(null);
    const isRtl = (i18n?.language || document.documentElement.dir) === "ar";
    const createContactMutation = useCreateConatctUsForm();

    const initialValues = {
        email: '',
        phoneNumber: '',
        message: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email(t('Please enter a valid email')).required(t('Email is required')),
        phoneNumber: Yup.string().min(6, t('Please enter a valid phone number')).required(t('Phone number is required')),
        message: Yup.string().min(10, t('Please enter a longer message')).required(t('Message is required'))
    });



    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitStatus(null);
        try {
            // prefer mutateAsync if available
            if (createContactMutation.mutateAsync) {
                await createContactMutation.mutateAsync(values);
            } else {
                await new Promise((resolve, reject) =>
                    createContactMutation.mutate(values, { onSuccess: resolve, onError: reject })
                );
            }
            setSubmitStatus('success');
            resetForm();
        } catch (err) {
            console.error('Contact form submit error:', err);
            setSubmitStatus('error');
        } finally {
            setSubmitting(false);
        }
    };


    const isSubmitting = createContactMutation.isLoading;

    return (
        <div className="min-h-screen bg-bg">

            {/* Hero Section */}
            <section className="bg-primary text-white pt-28 pb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("Contact Our Legal Team")}</h1>
                    <p className="text-xl max-w-2xl mx-auto">
                        {t("We're here to help with your legal needs. Reach out to schedule a consultation with one of our experienced attorneys.")}
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

                        {/* Contact Information */}
                        <div className="bg-white rounded-lg shadow-md p-6 lg:p-8 border-l-4 border-secondary">
                            <h2 className="text-2xl font-bold text-primary mb-6">{t("Get In Touch")}</h2>

                            <div className="grid gap-6 mb-6">
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 bg-bg rounded-md p-2">
                                        <Mail className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-gray-700">{t("Email")}</div>
                                        <div className="mt-1 text-gray-600 text-sm space-y-1">
                                            <div>
                                                <div className="font-semibold">{t("Cairo Office Mail")}</div>
                                                <a href='mailto:aziz.nasr11@gmail.com'>aziz.nasr11@gmail.com</a>
                                            </div>
                                            <div>
                                                <div className="font-semibold">{t("El Reyad Office Mail")}</div>
                                                <a href='mailto:khedaib@malathegypt.com'>khedaib@malathegypt.com</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 bg-bg rounded-md p-2">
                                        <Phone className="w-5 h-5 text-secondary" />
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-gray-700">{t("Phone Number")}</div>
                                        <div className="mt-1 text-gray-600 text-sm space-y-1">
                                            <div>
                                                <div className="font-semibold">{t("Cairo Office Number")}</div>
                                                <div>01044947784 - 01005842307</div>
                                            </div>
                                            <div>
                                                <div className="font-semibold">{t("Saudi Office Number")}</div>
                                                <div>+0996 505 120 293</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 bg-[#eef6ff] rounded-md p-2">
                                        <MapPin className="w-5 h-5 text-[#2563eb]" />
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-gray-700">{t("Address")}</div>
                                        <div className="mt-1 text-gray-600 text-sm space-y-3">
                                            <div>
                                                <div className="font-semibold">{t("Cairo Address")}</div>
                                                <div>{isRtl ? "مصر - القاهره 20 شاراع الطيران - الدور الاول - شقه 2" : "Egypt - Cairo, 20 Al Tayaran St - 1st floor - Apt 2"}</div>
                                            </div>
                                            <div>
                                                <div className="font-semibold">{t("El Reyad Address")}</div>
                                                <div>{isRtl ? "السعوديه - الرياض - حي المروج - مركز الحياة سنتر - مبني B- الدور الاول - مكتب 5" : "Saudi Arabia - Riyadh - Al Muruj - Hayat Center - Building B - 1st floor - Office 5"}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-primary">{t("Office Hours")}</h3>
                                    <Clock className="w-5 h-5 text-gray-400" />
                                </div>
                                <div className="mt-3 space-y-2 text-gray-600 text-sm">
                                    <div className="flex justify-between">
                                        <span>Monday - Friday</span>
                                        <span>9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday</span>
                                        <span>10:00 AM - 2:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sunday</span>
                                        <span>Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form (Formik) */}
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h2 className="text-2xl font-bold text-primary mb-6">{t("Send Us a Message")}</h2>

                            {submitStatus === 'success' && (
                                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                                    {t("Thank you for your message! We will get back to you shortly")}.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                                    {t("There was an error sending your message. Please try again.")}
                                </div>
                            )}

                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting: formikSubmitting }) => (
                                    <Form className="space-y-6">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                                                {t("Email Address *")}
                                            </label>
                                            <Field name="email">
                                                {({ field }) => (
                                                    <input
                                                        {...field}
                                                        type="email"
                                                        id="email"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                                        placeholder="your.email@example.com"
                                                    />
                                                )}
                                            </Field>
                                            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                                        </div>

                                        <div>
                                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-primary mb-2">
                                                {t("Phone Number *")}
                                            </label>
                                            <Field name="phoneNumber">
                                                {({ field }) => (
                                                    <input
                                                        {...field}
                                                        type="tel"
                                                        id="phoneNumber"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                                        placeholder="(555) 123-4567"
                                                    />
                                                )}
                                            </Field>
                                            <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-xs mt-1" />
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                                                {t("Your Message *")}
                                            </label>
                                            <Field name="message">
                                                {({ field }) => (
                                                    <textarea
                                                        {...field}
                                                        id="message"
                                                        rows="6"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-vertical"
                                                        placeholder="Please describe your legal issue or inquiry..."
                                                    />
                                                )}
                                            </Field>
                                            <ErrorMessage name="message" component="div" className="text-red-500 text-xs mt-1" />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={formikSubmitting || isSubmitting}
                                            className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {formikSubmitting || isSubmitting ? t("Sending...") : t('Send Message')}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default ContactUs;