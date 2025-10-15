import { useState } from 'react';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        caseType: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setFormData({
            name: '',
            email: '',
            phone: '',
            caseType: '',
            message: ''
        });
    };

    return (
        <div className="min-h-screen bg-[#f4f5f3] py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-serif font-bold text-[#003a42] mb-4">
                        Get Legal Consultation
                    </h1>
                    <p className="text-[#1f1f1f] text-lg max-w-2xl mx-auto">
                        Contact our experienced legal team for professional advice and representation.
                        We're here to help you navigate complex legal matters.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#7a5a21]/20">
                            <h2 className="text-2xl font-serif font-semibold text-[#003a42] mb-6">
                                Our Office
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-[#006b63] rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#1f1f1f] mb-1">Main Office</h3>
                                        <p className="text-[#1f1f1f]">123 Justice Avenue<br />Legal District, City 10101</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-[#006b63] rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#1f1f1f] mb-1">Phone</h3>
                                        <p className="text-[#1f1f1f]">(555) 123-4567<br />(555) 123-4568</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-[#006b63] rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#1f1f1f] mb-1">Email</h3>
                                        <p className="text-[#1f1f1f]">contact@lawfirm.com<br />consultation@lawfirm.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Practice Areas */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#7a5a21]/20">
                            <h2 className="text-2xl font-serif font-semibold text-[#003a42] mb-6">
                                Practice Areas
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    'Corporate Law',
                                    'Litigation',
                                    'Real Estate',
                                    'Family Law',
                                    'Criminal Defense',
                                    'Immigration',
                                    'Intellectual Property',
                                    'Employment Law'
                                ].map((area, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-[#006b63] rounded-full"></div>
                                        <span className="text-[#1f1f1f] text-sm">{area}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#7a5a21]/20">
                        <h2 className="text-2xl font-serif font-semibold text-[#003a42] mb-2">
                            Schedule a Consultation
                        </h2>
                        <p className="text-[#1f1f1f] mb-8">
                            Fill out the form below and our legal team will get back to you within 24 hours.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-[#003a42] mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-[#7a5a21]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006b63] focus:border-transparent bg-[#f4f5f3]/50 transition-all"
                                        placeholder="John Smith"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-[#003a42] mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-[#7a5a21]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006b63] focus:border-transparent bg-[#f4f5f3]/50 transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-[#003a42] mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-[#7a5a21]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006b63] focus:border-transparent bg-[#f4f5f3]/50 transition-all"
                                        placeholder="(555) 123-4567"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="caseType" className="block text-sm font-semibold text-[#003a42] mb-2">
                                        Case Type *
                                    </label>
                                    <select
                                        id="caseType"
                                        name="caseType"
                                        value={formData.caseType}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-[#7a5a21]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006b63] focus:border-transparent bg-[#f4f5f3]/50 transition-all"
                                    >
                                        <option value="">Select case type</option>
                                        <option value="corporate">Corporate Law</option>
                                        <option value="litigation">Litigation</option>
                                        <option value="real-estate">Real Estate</option>
                                        <option value="family">Family Law</option>
                                        <option value="criminal">Criminal Defense</option>
                                        <option value="immigration">Immigration</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-[#003a42] mb-2">
                                    Case Details *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 border border-[#7a5a21]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006b63] focus:border-transparent bg-[#f4f5f3]/50 transition-all resize-vertical"
                                    placeholder="Please describe your legal matter in detail..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#003a42] text-white py-4 px-6 rounded-xl font-semibold hover:bg-[#002a32] transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#006b63] focus:ring-offset-2 transition-all duration-200"
                            >
                                Request Legal Consultation
                            </button>

                            <p className="text-center text-sm text-[#1f1f1f]/70">
                                By submitting this form, you agree to our privacy policy and terms of service.
                            </p>
                        </form>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="bg-[#003a42] text-white rounded-2xl p-8 max-w-4xl mx-auto">
                        <h2 className="text-2xl font-serif font-bold mb-4">
                            Emergency Legal Assistance Available 24/7
                        </h2>
                        <p className="text-lg mb-6 opacity-90">
                            For urgent legal matters, call our emergency hotline: <strong>(555) 911-LEGAL</strong>
                        </p>
                        <button className="bg-[#7a5a21] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#6a4a1a] transform hover:scale-105 transition-all duration-200">
                            Emergency Contact
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;