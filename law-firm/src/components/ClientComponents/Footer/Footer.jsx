import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

function Footer() {
    const { t, i18n } = useTranslation?.() ?? { t: (s) => s, i18n: { language: "ar" } };
    const isRtl = (i18n?.language || document.documentElement.dir) === "ar";

    return (
        <footer dir={isRtl ? "rtl" : "ltr"} className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Quick links */}
                    <div className={`${isRtl ? "md:text-right" : "md:text-left"}`}>
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">{t("Footer.QuickLinks") || "روابط سريعة"}</h4>
                        <ul className="space-y-3 text-gray-600">
                            <li>
                                <Link to="/" className="hover:text-primary transition-colors">{t("landing.Home") || "الرئيسية"}</Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-primary transition-colors">{t("landing.AboutUs") || "من نحن"}</Link>
                            </li>
                            <li>
                                <Link to="/services" className="hover:text-primary transition-colors">{t("landing.OurLawServices") || "خدماتنا"}</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-primary transition-colors">{t("landing.ContactUs") || "اتصل بنا"}</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact info */}
                    <div className="text-center md:text-center">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">{t("Footer.Contact") || "معلومات الاتصال"}</h4>
                        <div className="text-gray-600 space-y-2 text-sm">
                            <div>{t("Footer.RiyadhTitle") || "الرياض، المملكة العربية السعودية: العليا، الرياض - 12214"}</div>
                            <div>{t("Footer.CairoTitle") || "القاهرة، مصر: الزمالك، القاهرة - 11211"}</div>
                            <div className="flex items-start justify-center gap-2 mt-3">
                                <MapPin size={16} className="text-secondary mt-1 flex-shrink-0" />
                                <span className="text-gray-600">contact@aaf-law.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Social / copyright */}
                    <div className={`${isRtl ? "md:text-left" : "md:text-right"}`}>
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">{t("Footer.Follow") || "تابعنا"}</h4>

                        <div className="flex items-center gap-4 mb-4 justify-start md:justify-end">
                            {/* LinkedIn */}
                            <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-secondary transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="block">
                                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8h4.53V24H.22zM8.5 8h4.34v2.18h.06c.6-1.14 2.06-2.18 4.24-2.18C22.15 8 24 9.88 24 13.5V24h-4.53v-9.02c0-2.15-.04-4.92-3-4.92-3 0-3.46 2.34-3.46 4.76V24H8.5z" />
                                </svg>
                            </a>

                            {/* Twitter */}
                            <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-secondary transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="block">
                                    <path d="M24 4.56c-.89.39-1.85.65-2.86.77a4.98 4.98 0 0 0 2.17-2.75 9.93 9.93 0 0 1-3.16 1.21 4.94 4.94 0 0 0-8.42 4.5A14 14 0 0 1 1.67 3.15a4.93 4.93 0 0 0 1.53 6.58 4.9 4.9 0 0 1-2.24-.62v.06a4.94 4.94 0 0 0 3.96 4.83 4.97 4.97 0 0 1-2.23.08 4.95 4.95 0 0 0 4.61 3.43A9.92 9.92 0 0 1 0 19.54a14 14 0 0 0 7.56 2.22c9.05 0 14-7.5 14-14v-.64A9.98 9.98 0 0 0 24 4.56z" />
                                </svg>
                            </a>
                        </div>

                        <div className="border-t border-gray-100 pt-4 text-xs text-gray-500">
                            © {new Date().getFullYear()} {t("Footer.CompanyName") || "شركة العبد الجبار والفيصل للمحاماة"}. {t("Footer.Copyright") || "كل الحقوق محفوظة."}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
