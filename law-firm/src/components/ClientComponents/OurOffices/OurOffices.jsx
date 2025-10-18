import React from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Building } from "lucide-react";
import { Link } from "react-router-dom";

function OurOffices() {
    const { t, i18n } = useTranslation?.() ?? { t: (s) => s, i18n: { language: "ar" } };
    const isRtl = (i18n?.language || document.documentElement.dir) === "ar";

    const locations = [
        {
            id: "riyadh",
            title: isRtl ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia",
            line1: isRtl ? "السعوديه, الرياض" : "Saudi Arabia, Riyadh",
            postal: "12214",
            address: isRtl
                ? "السعوديه - الرياض - حي المروج - مركز الحياة سنتر - مبني B- الدور الاول - مكتب 5"
                : "Saudi Arabia - Riyadh - Al Muruj - Hayat Center - Building B - 1st floor - Office 5",
            phone: "+0996 505 120 293",
            mobile: null,
            email: "khedaib@malathegypt.com",
        },
        {
            id: "cairo",
            title: isRtl ? "القاهرة، مصر" : "Cairo, Egypt",
            line1: isRtl ? "القاهرة، مصر" : "Cairo, Egypt",
            postal: "11211",
            address: isRtl
                ? "مصر - القاهره 20 شاراع الطيران - الدور الاول - شقه 2"
                : "Egypt - Cairo, 20 Al Tayaran St - 1st floor - Apt 2",
            phone: "0222604857",
            mobile: "01044947784 - 01005842307",
            email: "aziz.nasr11@gmail.com",
        },
    ];

    return (
        <section className={`py-16 bg-[var(--color-bg)] ${isRtl ? "text-right" : "text-left"}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-3xl mx-auto mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
                        {isRtl ? "مكاتبنا" : "Our Offices"}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        {t("OurCompany.Description") ||
                            "مهمتنا هي تقديم خدمات قانونية لا مثيل لها، وتعزيز الثقة وتحقيق أفضل النتائج لعملائنا. رؤيتنا هي أن نكون شركة محاماة رائدة ومعروفة بالالتزام والتميز ورضا العملاء."}
                    </p>
                </div>

                {/* Locations Grid */}
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {locations.map((loc) => (
                            <div
                                key={loc.id}
                                className="bg-white rounded-2xl border border-[var(--color-secondary)]/20 shadow-sm hover:shadow-md transition-all duration-300 p-6"
                            >
                                {/* Location Header */}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 bg-[var(--color-primary)] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[var(--color-text)] mb-1">
                                            {loc.title}
                                        </h3>
                                        <p className="text-[var(--color-primary)] font-medium">
                                            {loc.line1}
                                        </p>
                                    </div>
                                </div>

                                {/* Contact Details */}
                                <div className="space-y-4">
                                    {/* Address */}
                                    <div className="flex items-start gap-3">
                                        <MapPin size={18} className="text-[var(--color-secondary)] mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-[var(--color-text)] leading-relaxed">
                                                {loc.address}
                                            </p>
                                            <p className="text-gray-500 text-sm mt-1">
                                                {isRtl ? "الرمز البريدي:" : "Postal:"} {loc.postal}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    {loc.phone && (
                                        <div className="flex items-center gap-3">
                                            <Phone size={18} className="text-[var(--color-secondary)] flex-shrink-0" />
                                            <div>
                                                <p className="text-[var(--color-text)] font-medium">
                                                    {loc.phone}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Mobile */}
                                    {loc.mobile && (
                                        <div className="flex items-center gap-3">
                                            <Phone size={18} className="text-[var(--color-secondary)] flex-shrink-0" />
                                            <div>
                                                <p className="text-[var(--color-text)] font-medium">
                                                    {loc.mobile}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Email */}
                                    {loc.email && (
                                        <div className="flex items-center gap-3">
                                            <Mail size={18} className="text-[var(--color-secondary)] flex-shrink-0" />
                                            <Link
                                                to={`mailto:${loc.email}`}
                                                className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors font-medium"
                                            >
                                                {loc.email}
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Action Button */}
                                <div className="mt-6 pt-4 border-t border-[var(--color-secondary)]/20">
                                    <button className="w-full cursor-pointer py-2.5 px-4 border border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                                        <MapPin size={16} />
                                        <span>{isRtl ? "الاتجاهات" : "Get Directions"}</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Simple CTA */}
                <div className="text-center mt-12">
                    <div className="bg-white rounded-2xl border border-[var(--color-secondary)]/20 p-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4">
                            {isRtl ? "احصل على استشارة قانونية" : "Get Legal Consultation"}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {isRtl
                                ? "اتصل بنا اليوم لمناقشة قضيتك مع محامينا المتخصصين"
                                : "Contact us today to discuss your case with our specialized attorneys"}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                to="/contactus"
                                className="px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white font-medium rounded-lg transition-colors duration-300"
                            >
                                {isRtl ? "اتصل بنا" : "Contact Us"}
                            </Link>
                            <Link
                                to="/servicespage"
                                className="px-6 py-3 border border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white font-medium rounded-lg transition-all duration-300"
                            >
                                {isRtl ? "خدماتنا" : "Our Services"}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OurOffices;