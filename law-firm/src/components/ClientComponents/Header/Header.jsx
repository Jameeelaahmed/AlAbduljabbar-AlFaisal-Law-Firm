// helpers
import i18n from "../../../i18n";
// libs
import { useEffect } from "react";
import { useTranslation } from 'react-i18next'
import { useState } from "react";
// components
import { useAuthStore } from "../../../store/useAuthStore";
// icons
import { LogOut, Menu, X, User, ChevronDown, Globe, UserCircle } from 'lucide-react'
// libs
import { Link } from 'react-router-dom'
// imgs
import logo1 from '../../../assets/Logos/Logo1.png'
import logo2 from '../../../assets/Logos/Logo2.png'

function Header() {
    const { t } = useTranslation();
    const { isAuthenticated, user, logout } = useAuthStore();
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
            })
            .catch((err) => console.error("Error changing language:", err));
    };


    function handleLogout() {
        logout();
    }

    useEffect(() => {
        document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    }, [currentLang]);

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
            <div className={`fixed w-full ${!isScrolled && "flex justify-center items-center top-12"} transition-all z-50 ${isScrolled && "shadow-2xl"}`}>
                {/* Desktop Navigation */}
                <ul className={`hidden lg:flex justify-around  bg-white ${!isScrolled && "rounded-full"} pr-2 pl-2 pt-2 pb-2`}>
                    <li className={`pt-3 pb-3 pr-6 pl-6 rounded-full ${isScrolled ? "hover:bg-secondary hover:text-white " : "hover:bg-primary hover:text-white"} transition-all`}>
                        <Link>
                            <p>{t("landing.Home")}</p>
                        </Link>
                    </li>
                    <li className={`pt-3 pb-3 pr-6 pl-6 rounded-full ${isScrolled ? "hover:bg-secondary hover:text-white " : "hover:bg-primary hover:text-white"} transition-all`}>
                        <Link>
                            <p>{t("landing.OurLawServices")}</p>
                        </Link>
                    </li>
                    <li className={`pt-3 pb-3 pr-6 pl-6 rounded-full ${isScrolled ? "hover:bg-secondary hover:text-white " : "hover:bg-primary hover:text-white"} transition-all`}>
                        <Link>
                            <p>{t("landing.FAQ")}</p>
                        </Link>
                    </li>
                    <li className={`pt-3 pb-3 pr-6 pl-6 rounded-full ${isScrolled ? "hover:bg-secondary hover:text-white " : "hover:bg-primary hover:text-white"} transition-all`}>
                        <Link>
                            <p>{t("landing.AboutUs")}</p>
                        </Link>
                    </li>
                    <li className={`pt-3 pb-3 pr-6 pl-6 rounded-full ${isScrolled ? "hover:bg-secondary hover:text-white " : "hover:bg-primary hover:text-white"} transition-all`}>
                        <Link>
                            <p>{t("landing.ContactUs")}</p>
                        </Link>
                    </li>
                    {/* Desktop Auth Section */}
                    <div className='hidden lg:flex gap-2 items-center relative'>
                        {(isAuthenticated && role == 'User') ? (
                            <>
                                {/* User Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={toggleDesktopDropdown}
                                        className="flex items-center bg-primary gap-2 py-2 px-3 text-white hover:bg-secondary rounded-3xl transition-all"
                                    >
                                        <UserCircle />
                                        <ChevronDown
                                            size={16}
                                            className={`transform transition-transform ${isDesktopDropdownOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className={`
                                    absolute left-1/2 -translate-x-1/2 mt-5 w-66 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-60
                                    transform transition-transform duration-300 ease-in-out origin-top
                                    ${isDesktopDropdownOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}
                                    `}>
                                        <span>{t("landing.Hello")} {name}</span>
                                        {/* Profile Link */}
                                        <Link
                                            to="/profile"
                                            onClick={closeDesktopDropdown}
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
                                                className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${currentLang === "ar"
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
                                            className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-all"
                                        >
                                            <LogOut size={16} />
                                            <span>{t("landing.Logout")}</span>
                                        </button>
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
                            <div className={`font-bold ${isScrolled ? 'text-white' : 'text-primary'}mr-3 ml-3`}>
                                <Link to='login'>
                                    {t("landing.Login")}
                                </Link>
                            </div>
                        )}
                    </div>
                </ul>


            </div >

            {/* Mobile Slide Menu */}
            < div className={`
                fixed top-0 rtl:right-0 ltr:left-0 w-full bg-white ${isScrolled && "bg-primary/50"} z-50 shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden
                ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
            `}>
                {/* Mobile menu content with top padding to account for fixed header */}
                < div className="pt-20 pb-6 px-6" >
                    {/* Mobile Navigation */}
                    < ul className='flex flex-col space-y-2' >
                        <li className='py-3 px-4 rounded text-secondary hover:bg-primary hover:text-white transition-all'>
                            <Link onClick={toggleMobileMenu}>
                                <p>{t("landing.Home")}</p>
                            </Link>
                        </li>
                        <li className='py-3 px-4 rounded text-secondary hover:bg-primary hover:text-white transition-all'>
                            <Link onClick={toggleMobileMenu}>
                                <p>{t("landing.OurLawServices")}</p>
                            </Link>
                        </li>
                        <li className='py-3 px-4 rounded text-secondary hover:bg-primary hover:text-white transition-all'>
                            <Link onClick={toggleMobileMenu}>
                                <p>{t("landing.FAQ")}</p>
                            </Link>
                        </li>
                        <li className='py-3 px-4 rounded text-secondary hover:bg-primary hover:text-white transition-all'>
                            <Link onClick={toggleMobileMenu}>
                                <p>{t("landing.AboutUs")}</p>
                            </Link>
                        </li>
                        <li className='py-3 px-4 rounded text-secondary hover:bg-primary hover:text-white transition-all'>
                            <Link onClick={toggleMobileMenu}>
                                <p>{t("landing.ContactUs")}</p>
                            </Link>
                        </li>
                    </ ul >

                    {/* Mobile Auth Section */}
                    <div className='mt-6 pt-4 border-t border-gray-200' >
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
                                    className='flex items-center justify-center gap-2 py-3 px-4 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-all'
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
                                    className='flex items-center justify-center gap-2 py-3 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-all'
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
            <div div
                className={`lg:hidden fixed top-0 rtl:right-0 ltr:left-0 w-full flex items-center justify-center gap-3 px-4 py-2 z-40 transition-all duration-300 bg-white/80 backdrop-blur-md shadow-md`}
            >
                <img src={logo1} alt="logo1" className="w-10 h-10 object-contain" />
                <img src={logo2} alt="logo2" className="w-10 h-10 object-contain" />
                <p className="text-primary font-bold text-base sm:text-lg text-center leading-tight">
                    مكتب العبد الجبار و الفيصل
                </p>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className='p-2 text-primary hover:bg-gray-100 rounded'
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
