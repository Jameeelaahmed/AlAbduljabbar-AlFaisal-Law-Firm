import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Scale, ArrowRight, Facebook, Linkedin, Instagram } from "lucide-react"; // removed Twitter
import { useTranslation } from "react-i18next";

// X brand icon (SVG)
const XIcon = ({ size = 18, className = "" }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor" aria-hidden="true">
        <path d="M18.244 2H22L14.5 10.615 23 22h-6.756l-5.085-6.3L6.99 22H2l8.322-9.556L2 2h6.756l4.708 5.84L18.244 2Zm-2.756 18.222h2.192L8.064 3.698H5.872l9.616 16.524Z" />
    </svg>
);

function Footer() {
    const { t, i18n } = useTranslation();
    const isRtl = (i18n?.language || document.documentElement.dir) === "ar";

    const socialLinks = [
        { icon: XIcon, href: "https://x.com/AbdGbarAlfaisal", label: t("Footer.Social.X", { defaultValue: "X" }) }, // replaced Twitter with X
        { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61578300513084&sk=photos", label: t("Footer.Social.Facebook") },
        { icon: Instagram, href: "https://www.instagram.com/alabdalgabar.alfaisallawfirm?igsh=MXhmN2Y0b3lkM2Qzeg==", label: t("Footer.Social.Instagram") }
    ];

    const quickLinks = [
        { name: t("landing.Home"), path: "/" },
        { name: t("landing.OurLawServices"), path: "/servicespage" },
        { name: t("landing.ContactUs"), path: "/contactus" }
    ];

    const serviceLinks = [
        { name: t("Footer.Services.CommercialLaw"), path: "/services/commercial" },
        { name: t("Footer.Services.RealEstateLaw"), path: "/services/real-estate" },
        { name: t("Footer.Services.CorporateLaw"), path: "/services/corporate" },
        { name: t("Footer.Services.InternationalArbitration"), path: "/services/arbitration" }
    ];

    return (
        <footer className="bg-linear-to-b from-white to-bg border-t border-secondary/20">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <Scale size={24} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text">
                                    {t("Footer.BrandTitle")}
                                </h3>
                                <p className="text-sm text-secondary">
                                    {t("Footer.BrandSubtitle")}
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            {t("Footer.Description")}
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 bg-white border border-secondary/20 rounded-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group shadow-sm"
                                    aria-label={social.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-text mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-primary rounded-full"></div>
                            {t("Footer.QuickLinks")}
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-600 hover:text-primary transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <ArrowRight size={14} className="text-secondary group-hover:translate-x-1 transition-transform" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold text-text mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-accent rounded-full"></div>
                            {t("Footer.ServicesTitle")}
                        </h4>
                        <ul className="space-y-3">
                            {serviceLinks.map((service, index) => (
                                <li key={index}>
                                    <Link
                                        to={service.path}
                                        className="text-gray-600 hover:text-accent transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <ArrowRight size={14} className="text-secondary group-hover:translate-x-1 transition-transform" />
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-text mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-secondary rounded-full"></div>
                            {t("Footer.Contact")}
                        </h4>

                        <div className="space-y-4">
                            {/* Riyadh Office */}
                            <div className="bg-white rounded-lg p-4 border border-secondary/10 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <MapPin size={16} className="text-primary mt-1 shrink-0" />
                                    <div>
                                        <h5 className="font-semibold text-text text-sm">
                                            {t("El Reyad Address")}
                                        </h5>
                                        <p className="text-gray-600 text-xs mt-1">
                                            {isRtl
                                                ? "السعوديه - الرياض - حي المروج - مركز الحياة سنتر - مبني B- الدور الاول - مكتب 5"
                                                : "Saudi Arabia - Riyadh - Al Muruj - Hayat Center - Building B - 1st floor - Office 5"
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Cairo Office */}
                            <div className="bg-white rounded-lg p-4 border border-secondary/10 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <MapPin size={16} className="text-accent mt-1 shrink-0" />
                                    <div>
                                        <h5 className="font-semibold text-text text-sm">
                                            {t("Cairo Address")}
                                        </h5>
                                        <p className="text-gray-600 text-xs mt-1">
                                            {isRtl
                                                ? "مصر - القاهره 20 شاراع الطيران - الدور الاول - شقه 2"
                                                : "Egypt - Cairo, 20 Al Tayaran St - 1st floor - Apt 2"
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Methods */}
                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <a
                                        href="mailto:aziz.nasr11@gmail.com"
                                        className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors duration-300 group"
                                    >
                                        <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center group-hover:bg-primary transition-colors">
                                            <Mail size={14} className="text-primary group-hover:text-white" />
                                        </div>
                                        <div className="text-xs">
                                            <div className="font-semibold">{t("Cairo Office Mail")}</div>
                                            <div>aziz.nasr11@gmail.com</div>
                                        </div>
                                    </a>

                                    <a
                                        href="mailto:khedaib@malathegypt.com"
                                        className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors duration-300 group ml-11"
                                    >
                                        <div className="text-xs">
                                            <div className="font-semibold">{t("El Reyad Office Mail")}</div>
                                            <div>khedaib@malathegypt.com</div>
                                        </div>
                                    </a>
                                </div>

                                <div className="space-y-2">
                                    <a
                                        href="tel:+201044947784"
                                        className="flex items-center gap-3 text-gray-600 hover:text-accent transition-colors duration-300 group"
                                    >
                                        <div className="w-8 h-8 bg-accent/10 rounded flex items-center justify-center group-hover:bg-accent transition-colors">
                                            <Phone size={14} className="text-accent group-hover:text-white" />
                                        </div>
                                        <div className="text-xs">
                                            <div className="font-semibold">{t("Cairo Office Number")}</div>
                                            <div>01044947784 - 01005842307</div>
                                        </div>
                                    </a>

                                    <a
                                        href="tel:+0996505120293"
                                        className="flex items-center gap-3 text-gray-600 hover:text-accent transition-colors duration-300 group ml-11"
                                    >
                                        <div className="text-xs">
                                            <div className="font-semibold">{t("Saudi Office Number")}</div>
                                            <div>+0996 505 120 293</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-secondary/20 bg-white/50 backdrop-blur-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-gray-600 text-sm text-center md:text-left">
                            © {new Date().getFullYear()} {t("Footer.CompanyName")}. {t("Footer.Copyright")}
                        </div>

                        <div className="flex items-center gap-6 text-xs text-gray-500">
                            <Link to="/privacy" className="hover:text-primary transition-colors">
                                {t("Footer.PrivacyPolicy")}
                            </Link>
                            <Link to="/terms" className="hover:text-primary transition-colors">
                                {t("Footer.TermsOfService")}
                            </Link>
                            <Link to="/sitemap" className="hover:text-primary transition-colors">
                                {t("Footer.Sitemap")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;