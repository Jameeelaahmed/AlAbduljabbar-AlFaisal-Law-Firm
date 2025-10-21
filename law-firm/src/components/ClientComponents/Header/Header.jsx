// helpers
import i18n from "../../../i18n";
// libs
import { useEffect } from "react";
import { useTranslation } from 'react-i18next'
import { useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import { useLocation } from "react-router-dom";
// components
import { useAuthStore } from "../../../store/useAuthStore";
// icons
import { LogOut, Menu, X, User, ChevronDown, Globe, UserCircle } from 'lucide-react'
// imgs
import logo1 from '../../../assets/Logos/Logo1.png'
import logo2 from '../../../assets/Logos/Logo2.png'
// notification
import NotificationBell from '../../Common/NotificationBell'

function Header() {
    const { t } = useTranslation();
    const { isAuthenticated, user, logout } = useAuthStore();
    const location = useLocation().pathname;
    const role = user?.lastRole;
    const name = user?.name;
    const [isScrolled, setIsScrolled] = useState(false);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState(() => {
        const savedLang = localStorage.getItem("selectedLanguage");
        return savedLang || i18n.language;
    });
    const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };


    // desptop dropdown
    const toggleDesktopDropdown = () => {
        setIsDesktopDropdownOpen(!isDesktopDropdownOpen)
    }

    const closeDesktopDropdown = () => {
        setIsDesktopDropdownOpen(false)
    }

    const handleLanguageChange = (lang) => {
        i18n
            .changeLanguage(lang)
            .then(() => {
                setCurrentLang(lang);
                localStorage.setItem("selectedLanguage", lang);
                closeDesktopDropdown();
            })
            .catch((err) => console.error("Error changing language:", err));
    };

    function handleLogout() {
        logout();
    }

    useEffect(() => {
        document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    }, [currentLang]);

    const forceScrolled = location !== '/';
    const headerActive = isScrolled || forceScrolled;

    // change header/logo appearance on scroll
    useEffect(() => {
        let ticking = false;
        const threshold = 16; // px scrolled before apply styles
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > threshold);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        // check initial position
        setIsScrolled(window.scrollY > threshold);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <>
            {/* Main Header */}
            <div className={`fixed w-full ${!headerActive && "flex justify-center items-center top-12"} transition-all z-50 ${headerActive && "shadow-2xl"}`}>
                {/* Desktop Navigation */}
                <ul className={`hidden lg:flex justify-around  bg-white ${!headerActive && "rounded-full"} pr-4 pl-4 pt-2 pb-2 items-center`}>
                    <li>
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `pt-3 pb-3 pr-6 pl-6 rounded-full transition-all
                                 ${headerActive ? "hover:bg-secondary hover:text-white" : "hover:bg-primary hover:text-white"}
                                 ${isActive ? (headerActive ? "bg-secondary text-white" : "bg-primary text-white") : ""}`
                            }
                        >
                            {t("landing.Home")}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="servicespage"
                            className={({ isActive }) =>
                                `pt-3 pb-3 pr-6 pl-6 rounded-full transition-all
                                 ${headerActive ? "hover:bg-secondary hover:text-white" : "hover:bg-primary hover:text-white"}
                                 ${isActive ? (headerActive ? "bg-secondary text-white" : "bg-primary text-white") : ""}`
                            }
                        >
                            {t("landing.OurLawServices")}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="FAQClient"
                            className={({ isActive }) =>
                                `pt-3 pb-3 pr-6 pl-6 rounded-full transition-all
                                 ${headerActive ? "hover:bg-secondary hover:text-white" : "hover:bg-primary hover:text-white"}
                                 ${isActive ? (headerActive ? "bg-secondary text-white" : "bg-primary text-white") : ""}`
                            }
                        >
                            {t("landing.FAQ")}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="consultations"
                            className={({ isActive }) =>
                                `pt-3 pb-3 pr-6 pl-6 rounded-full transition-all
                                 ${headerActive ? "hover:bg-secondary hover:text-white" : "hover:bg-primary hover:text-white"}
                                 ${isActive ? (headerActive ? "bg-secondary text-white" : "bg-primary text-white") : ""}`
                            }
                        >
                            {t("Law Consultations")}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="contactus"
                            className={({ isActive }) =>
                                `pt-3 pb-3 pr-6 pl-6 rounded-full transition-all
                                 ${headerActive ? "hover:bg-secondary hover:text-white" : "hover:bg-primary hover:text-white"}
                                 ${isActive ? (headerActive ? "bg-secondary text-white" : "bg-primary text-white") : ""}`
                            }
                        >
                            {t("landing.ContactUs")}
                        </NavLink>
                    </li>
                    {/* Desktop Auth Section */}
                    <div className='hidden lg:flex gap-2 items-center relative'>
                        {(isAuthenticated && role == 'User') ? (
                            <>
                                {/* User Dropdown */}
                                <div className="flex items-center gap-2">
                                    {/* Notification Bell */}
                                    <div className="relative p-2 rounded-full text-white bg-primary hover:bg-secondary transition cursor-pointer">
                                        <NotificationBell />
                                    </div>

                                    {/* User Menu */}
                                    <div className="relative">
                                        <button
                                            onClick={toggleDesktopDropdown}
                                            className="flex items-center cursor-pointer bg-primary gap-2 py-2 px-3 text-white hover:bg-secondary rounded-3xl transition-all"
                                        >
                                            <UserCircle />
                                            <ChevronDown
                                                size={16}
                                                className={`transform transition-transform ${isDesktopDropdownOpen ? 'rotate-180' : ''}`}
                                            />
                                        </button>

                                        {/* Dropdown Menu */}
                                        <div className={`
                                        absolute ${!headerActive && "rtl:left-1/2 rtl:-translate-x-1/2 ltr:right-1/2 ltr:translate-x-1/2"} ltr:right-0 rtl:left-0 mt-5 w-66 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-60
                                        transform transition-transform duration-300 ease-in-out origin-top
                                        ${isDesktopDropdownOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}
                                        `}>
                                            {/* Styled user header */}
                                            <div
                                                className="px-4 py-3 border-b border-gray-100"
                                                dir={currentLang === "ar" ? "rtl" : "ltr"}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <UserCircle className="w-8 h-8 text-primary" />
                                                    <div className="min-w-0">
                                                        <p className="text-sm text-gray-800 truncate">
                                                            {t("landing.Hello")}{" "}
                                                            <span className="font-semibold">{name}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Profile Link */}
                                            <Link
                                                to="/profile"
                                                onClick={() => closeDesktopDropdown()}
                                                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all"
                                            >
                                                <User size={16} />
                                                <span>{t("landing.Profile")}</span>
                                            </Link>

                                            {/* Language toggle switcher */}
                                            <div className="flex items-center justify-between px-4 py-2">
                                                <div className="flex items-center gap-x-3">
                                                    <Globe className="w-4 h-4 text-text" />
                                                    <span className="text-sm text-text">
                                                        {currentLang === "ar" ? "العربية" : "English"}
                                                    </span>
                                                </div>
                                                <button
                                                    className={`relative w-12 h-6 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none ${currentLang === "ar"
                                                        ? "bg-primary"
                                                        : "bg-secondary"
                                                        }`}
                                                    onClick={() => handleLanguageChange(currentLang === "ar" ? "en" : "ar")}
                                                    aria-label="Toggle language"
                                                >
                                                    <span
                                                        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${currentLang === "ar"
                                                            ? "translate-x-6"
                                                            : "translate-x-0"
                                                            }`}
                                                    />
                                                </button>
                                            </div>

                                            {/* Divider */}
                                            <div className="border-t border-gray-200 my-1"></div>

                                            {/* Logout */}
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    closeDesktopDropdown();
                                                }}
                                                className="w-full flex cursor-pointer items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-all"
                                            >
                                                <LogOut size={16} />
                                                <span>{t("landing.Logout")}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Click outside to close dropdown */}
                                {isDesktopDropdownOpen && (
                                    <div
                                        className="fixed inset-0 z-50"
                                        onClick={closeDesktopDropdown}
                                    ></div>
                                )}
                            </>
                        ) : (
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `pt-3 pb-3 pr-6 pl-6 rounded-full font-bold transition-all
                                     ${headerActive ? "hover:bg-secondary hover:text-white" : "hover:bg-primary hover:text-white"}
                                     ${isActive ? (headerActive ? "bg-secondary text-white" : "bg-primary text-white") : "text-primary"}`
                                }
                            >
                                {t("landing.Login")}
                            </NavLink>
                        )}
                    </div>
                </ul>


            </div >

            {/* Mobile Slide Menu */}
            <div className={`
                fixed top-0 rtl:right-0 ltr:left-0 w-full bg-white ${headerActive && "bg-primary/50"} z-50 shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden
                ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
            `}>
                <div className="pt-20 pb-6 px-6">
                    <ul className='flex flex-col space-y-2'>
                        <li>
                            <NavLink
                                to="/"
                                end
                                onClick={toggleMobileMenu}
                                className={({ isActive }) =>
                                    `block py-3 px-4 rounded transition-all
                                     ${isActive ? 'bg-primary text-white' : 'text-secondary hover:bg-primary hover:text-white'}`
                                }
                            >
                                {t("landing.Home")}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="servicespage"
                                onClick={toggleMobileMenu}
                                className={({ isActive }) =>
                                    `block py-3 px-4 rounded transition-all
                                     ${isActive ? 'bg-primary text-white' : 'text-secondary hover:bg-primary hover:text-white'}`
                                }
                            >
                                {t("landing.OurLawServices")}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="consultations"
                                onClick={toggleMobileMenu}
                                className={({ isActive }) =>
                                    `block py-3 px-4 rounded transition-all
                                     ${isActive ? 'bg-primary text-white' : 'text-secondary hover:bg-primary hover:text-white'}`
                                }
                            >
                                {t("Law Consultations")}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="FAQClient"
                                onClick={toggleMobileMenu}
                                className={({ isActive }) =>
                                    `block py-3 px-4 rounded transition-all
                                     ${isActive ? 'bg-primary text-white' : 'text-secondary hover:bg-primary hover:text-white'}`
                                }
                            >
                                {t("landing.FAQ")}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="contactus"
                                onClick={toggleMobileMenu}
                                className={({ isActive }) =>
                                    `block py-3 px-4 rounded transition-all
                                     ${isActive ? 'bg-primary text-white' : 'text-secondary hover:bg-primary hover:text-white'}`
                                }
                            >
                                {t("landing.ContactUs")}
                            </NavLink>
                        </li>
                    </ul>

                    {/* Mobile Auth Section */}
                    <div div className='mt-6 pt-4 border-t border-gray-200' >
                        {(isAuthenticated && role == 'User') ? (
                            <div className='flex flex-col space-y-3'>
                                <p className='text-center text-secondary'>{t("landing.Hello")} {name}</p>

                                {/* Profile Link */}
                                <Link
                                    to="/profile"
                                    onClick={toggleMobileMenu}
                                    className='flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-all'
                                >
                                    <User size={18} />
                                    <span>{t("landing.Profile")}</span>
                                </Link>

                                {/* Language Toggle */}
                                <button
                                    className='flex items-center cursor-pointer justify-center gap-2 py-3 px-4 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-all'
                                >
                                    <Globe size={18} />
                                    <span>{currentLang === 'en' ? 'العربية' : 'English'}</span>
                                </button>

                                {/* Logout Button */}
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        toggleMobileMenu();
                                    }}
                                    className='flex items-center cursor-pointer justify-center gap-2 py-3 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-all'
                                >
                                    <LogOut size={18} />
                                    <span>{t("landing.Logout")}</span>
                                </button>
                            </div>
                        ) : (
                            <div className='text-center'>
                                <Link
                                    to='login'
                                    onClick={toggleMobileMenu}
                                    className='inline-block py-3 px-6 bg-primary text-white rounded hover:bg-primary-dark transition-all font-bold'
                                >
                                    {t("landing.Login")}
                                </Link>
                            </div>
                        )}
                    </div >
                </div >
            </div >

            {/* Alternate mobile logo - visible on sm and md only, fixed on scroll */}
            <div
                className={`lg:hidden fixed top-0 rtl:right-0 ltr:left-0 w-full flex items-center justify-center gap-3 px-4 py-2 z-40 transition-all duration-300 bg-white/80 backdrop-blur-md shadow-md`}
            >
                <img src={logo1} alt="logo1" className="w-10 h-10 object-contain" />
                <p className="text-primary font-bold text-base sm:text-lg text-center leading-tight">
                    مكتب العبد الجبار و الفيصل
                </p>
                <img src={logo2} alt="logo2" className="w-10 h-10 object-contain" />

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className='p-2 text-primary cursor-pointer hover:bg-gray-100 rounded'
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div >

            {/* Backdrop overlay for mobile menu */}
            {
                isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-[#0A1F2C]/50 bg-opacity-50 z-40 lg:hidden"
                        onClick={toggleMobileMenu}
                    ></div>
                )
            }
        </>
    )
}

export default Header
