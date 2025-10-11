import React from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

function OurCompany() {
    const { t, i18n } = useTranslation?.() ?? { t: (s) => s, i18n: { language: "ar" } };
    const isRtl = (i18n?.language || document.documentElement.dir) === "ar";

    const locations = [
        {
            id: "riyadh",
            title: isRtl ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia",
            line1: isRtl ? "العليا، الرياض" : "Al Olaya, Riyadh",
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
            line1: isRtl ? "الزمالك، القاهرة" : "Zamalek, Cairo",
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
        <section className={`py-12 ${isRtl ? "text-right" : "text-left"}`}>
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto mb-8 text-center">
                    <h2 className="text-4xl font-semibold text-primary">
                        {t("OurCompany.about our company")}
                    </h2>
                    <p className="text-gray-600 mt-3 leading-relaxed">
                        {t("OurCompany.Description") ||
                            "مهمتنا هي تقديم خدمات قانونية لا مثيل لها، وتعزيز الثقة وتحقيق أفضل النتائج لعملائنا. رؤيتنا هي أن نكون شركة محاماة رائدة ومعروفة بالالتزام والتميز ورضا العملاء."}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {locations.map((loc) => (
                        <div
                            key={loc.id}
                            className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 flex flex-col gap-3"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-800">{loc.title}</h3>
                                    <p className="text-sm text-gray-500 mt-2">{loc.line1}</p>
                                    <p className="text-sm text-gray-400 mt-1">{loc.postal}</p>
                                </div>
                            </div>

                            {/* Contact details */}
                            <div className="pt-2 space-y-2 text-sm text-gray-600">
                                {/* Saudi (Riyadh) branch - insert provided block */}
                                {loc.id === "riyadh" && (
                                    <>
                                        <div className="flex items-start gap-2">
                                            <MapPin size={16} className="text-secondary mt-1 flex-shrink-0" />
                                            <p>{loc.address}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone size={16} className="text-secondary flex-shrink-0" />
                                            <span>{loc.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2 hover:text-secondary transition-all">
                                            <Mail size={16} className="text-secondary flex-shrink-0" />
                                            <Link to={`mailto:${loc.email}`}>{loc.email}</Link>
                                        </div>
                                    </>
                                )}

                                {/* other branches (e.g. Cairo) - existing fields */}
                                {loc.id !== "riyadh" && (
                                    <>
                                        {loc.address && (
                                            <div className="flex items-start gap-2">
                                                <MapPin size={16} className="text-secondary mt-1 flex-shrink-0" />
                                                <p>{loc.address}</p>
                                            </div>
                                        )}

                                        {loc.phone && (
                                            <div className="flex items-center gap-2">
                                                <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" className="text-secondary">
                                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                                </svg>
                                                <span>{loc.phone}</span>
                                            </div>
                                        )}

                                        {loc.mobile && (
                                            <div className="flex items-center gap-2">
                                                <Phone size={16} className="text-secondary flex-shrink-0" />
                                                <span>{loc.mobile}</span>
                                            </div>
                                        )}

                                        {loc.email && (
                                            <div className="flex items-center gap-2 hover:text-secondary transition-all">
                                                <Mail size={16} className="text-secondary flex-shrink-0" />
                                                <Link to={`mailto:${loc.email}`}>{loc.email}</Link>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default OurCompany;
