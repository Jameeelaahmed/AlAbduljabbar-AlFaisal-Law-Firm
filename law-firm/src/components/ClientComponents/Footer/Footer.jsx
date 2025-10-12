import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Scale, ArrowRight, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";

function Footer() {
    const { t, i18n } = useTranslation?.() ?? { t: (s) => s, i18n: { language: "ar" } };
    const isRtl = (i18n?.language || document.documentElement.dir) === "ar";

    const socialLinks = [
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Facebook, href: "#", label: "Facebook" },
        { icon: Instagram, href: "#", label: "Instagram" }
    ];

    const quickLinks = [
        { name: t("landing.Home") || "الرئيسية", path: "/" },
        { name: t("landing.AboutUs") || "من نحن", path: "/about" },
        { name: t("landing.OurLawServices") || "خدماتنا", path: "/services" },
        { name: t("landing.ContactUs") || "اتصل بنا", path: "/contact" }
    ];

    const serviceLinks = [
        { name: isRtl ? "القانون التجاري" : "Commercial Law", path: "/services/commercial" },
        { name: isRtl ? "القانون العقاري" : "Real Estate Law", path: "/services/real-estate" },
        { name: isRtl ? "قانون الشركات" : "Corporate Law", path: "/services/corporate" },
        { name: isRtl ? "التحكيم الدولي" : "International Arbitration", path: "/services/arbitration" }
    ];

    return (
        <footer dir={isRtl ? "rtl" : "ltr"} className="bg-gradient-to-b from-white to-[var(--color-bg)] border-t border-[var(--color-secondary)]/20">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
                                <Scale size={24} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[var(--color-text)]">
                                    {isRtl ? "العبدالجبار والفيصل" : "AlAbduljabbar & AlFaisal"}
                                </h3>
                                <p className="text-sm text-[var(--color-secondary)]">
                                    {isRtl ? "للمحاماة والاستشارات القانونية" : "Law Firm & Legal Consultations"}
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            {isRtl
                                ? "شركة محاماة سعودية مصرية تقدم حلولاً قانونية متكاملة تجمع بين عراقة التراث وحداثة التطبيق"
                                : "A Saudi-Egyptian law firm providing integrated legal solutions that blend heritage with modern practice"
                            }
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 bg-white border border-[var(--color-secondary)]/20 rounded-lg flex items-center justify-center text-gray-600 hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-300 group shadow-sm"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-[var(--color-text)] mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-[var(--color-primary)] rounded-full"></div>
                            {t("Footer.QuickLinks") || "روابط سريعة"}
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-600 hover:text-[var(--color-primary)] transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <ArrowRight size={14} className={`text-[var(--color-secondary)] transform ${isRtl ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold text-[var(--color-text)] mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-[var(--color-accent)] rounded-full"></div>
                            {isRtl ? "خدماتنا" : "Our Services"}
                        </h4>
                        <ul className="space-y-3">
                            {serviceLinks.map((service, index) => (
                                <li key={index}>
                                    <Link
                                        to={service.path}
                                        className="text-gray-600 hover:text-[var(--color-accent)] transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <ArrowRight size={14} className={`text-[var(--color-secondary)] transform ${isRtl ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-[var(--color-text)] mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-[var(--color-secondary)] rounded-full"></div>
                            {t("Footer.Contact") || "معلومات الاتصال"}
                        </h4>

                        <div className="space-y-4">
                            {/* Riyadh Office */}
                            <div className="bg-white rounded-lg p-4 border border-[var(--color-secondary)]/10 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <MapPin size={16} className="text-[var(--color-primary)] mt-1 flex-shrink-0" />
                                    <div>
                                        <h5 className="font-semibold text-[var(--color-text)] text-sm">
                                            {isRtl ? "الرياض، السعودية" : "Riyadh, Saudi Arabia"}
                                        </h5>
                                        <p className="text-gray-600 text-xs mt-1">
                                            {isRtl
                                                ? "العليا، الرياض - 12214"
                                                : "Al Olaya, Riyadh - 12214"
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Cairo Office */}
                            <div className="bg-white rounded-lg p-4 border border-[var(--color-secondary)]/10 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <MapPin size={16} className="text-[var(--color-accent)] mt-1 flex-shrink-0" />
                                    <div>
                                        <h5 className="font-semibold text-[var(--color-text)] text-sm">
                                            {isRtl ? "القاهرة، مصر" : "Cairo, Egypt"}
                                        </h5>
                                        <p className="text-gray-600 text-xs mt-1">
                                            {isRtl
                                                ? "الزمالك، القاهرة - 11211"
                                                : "Zamalek, Cairo - 11211"
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Methods */}
                            <div className="space-y-3">
                                <a
                                    href="mailto:contact@aaf-law.com"
                                    className="flex items-center gap-3 text-gray-600 hover:text-[var(--color-primary)] transition-colors duration-300 group"
                                >
                                    <div className="w-8 h-8 bg-[var(--color-primary)]/10 rounded flex items-center justify-center group-hover:bg-[var(--color-primary)] transition-colors">
                                        <Mail size={14} className="text-[var(--color-primary)] group-hover:text-white" />
                                    </div>
                                    <span className="text-sm">contact@aaf-law.com</span>
                                </a>

                                <a
                                    href="tel:+966123456789"
                                    className="flex items-center gap-3 text-gray-600 hover:text-[var(--color-accent)] transition-colors duration-300 group"
                                >
                                    <div className="w-8 h-8 bg-[var(--color-accent)]/10 rounded flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-colors">
                                        <Phone size={14} className="text-[var(--color-accent)] group-hover:text-white" />
                                    </div>
                                    <span className="text-sm">+966 12 345 6789</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[var(--color-secondary)]/20 bg-white/50 backdrop-blur-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className={`flex flex-col md:flex-row items-center justify-between gap-4 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
                        <div className="text-gray-600 text-sm text-center md:text-left">
                            © {new Date().getFullYear()} {t("Footer.CompanyName") || "شركة العبد الجبار والفيصل للمحاماة"}. {t("Footer.Copyright") || "كل الحقوق محفوظة."}
                        </div>

                        <div className="flex items-center gap-6 text-xs text-gray-500">
                            <Link to="/privacy" className="hover:text-[var(--color-primary)] transition-colors">
                                {isRtl ? "سياسة الخصوصية" : "Privacy Policy"}
                            </Link>
                            <Link to="/terms" className="hover:text-[var(--color-primary)] transition-colors">
                                {isRtl ? "شروط الخدمة" : "Terms of Service"}
                            </Link>
                            <Link to="/sitemap" className="hover:text-[var(--color-primary)] transition-colors">
                                {isRtl ? "خريطة الموقع" : "Sitemap"}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;