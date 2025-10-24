// libs
import { useEffect } from "react";
import { useTranslation } from 'react-i18next'
import { useState } from "react";
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useRef } from "react";
// components
import { useAuthStore } from "../../../store/useAuthStore";
// icons
import { LogOut, Menu, X, User, ChevronDown, Globe, UserCircle, MapPin, Phone, Mail } from 'lucide-react'
// imgs
import logo1 from '../../../assets/Logos/Logo1.png'
import logo2 from '../../../assets/Logos/Logo2.png'
// notification
import NotificationBell from '../../Common/NotificationBell'

function Header() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language == 'ar';
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

    const [isLogo1DropDown, setIsLogo1DropDown] = useState(false);
    const [isLogo2DropDown, setIsLogo2DropDown] = useState(false);

    // add refs to detect outside clicks
    const logo1Ref = useRef(null);
    const logo2Ref = useRef(null);

    // Fetch sliders using React Query

    //logo1 drop down 
    const openLogo1DropDown = () => {
        setIsLogo1DropDown(prev => !prev);
    };

    const closeLogo1DropDown = () => {
        setIsLogo1DropDown(false);
    };

    //logo2 drop down 
    const openLogo2DropDown = () => {
        setIsLogo2DropDown(prev => !prev);
    };

    const closeLogo2DropDown = () => {
        setIsLogo2DropDown(false);
    };

    // close dropdowns on outside click or on scroll
    useEffect(() => {
        const handler = (e) => {
            const target = e.target;
            if (logo1Ref.current && !logo1Ref.current.contains(target)) {
                setIsLogo1DropDown(false);
            }
            if (logo2Ref.current && !logo2Ref.current.contains(target)) {
                setIsLogo2DropDown(false);
            }
        };

        const onScroll = () => {
            setIsLogo1DropDown(false);
            setIsLogo2DropDown(false);
        };

        // pointerdown covers mouse/touch/pen; also listen to touchstart for older devices
        document.addEventListener('pointerdown', handler);
        document.addEventListener('touchstart', handler);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            document.removeEventListener('pointerdown', handler);
            document.removeEventListener('touchstart', handler);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);


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
        <div className="flex fixed top-0 z-50 w-full bg-transparent">
            {/* Flex container for all three sections */}
            <div className="flex justify-between items-start w-full">
                {/* Logo Section 1 - Left/Right depending on direction */}
                <div
                    ref={logo1Ref}
                    className={`hidden lg:block z-40 ${isScrolled ? 'lg:hidden' : ''} ${location !== '/' ? 'lg:hidden' : ''}`}
                >
                    <div className='relative cursor-pointer hover:scale-105 transition-transform duration-300' onClick={openLogo1DropDown}>
                        <div className={`inline-flex flex-col justify-center items-center p-3 xl:p-4 backdrop-blur-xl shadow-2xl rtl:rounded-tl-3xl rtl:rounded-bl-3xl ltr:rounded-tr-3xl ltr:rounded-br-3xl border-primary border-3 min-h-[120px] xl:min-h-[140px] gap-0.5`}>
                            <img className='w-[45px] xl:w-[55px]' src='logo1.png' alt="logo1" />
                            <p className='font-bold text-base xl:text-lg text-white whitespace-nowrap'>{t("logo1Title")}</p>
                            <span className='text-white text-xs xl:text-sm whitespace-nowrap'>{t("logoSubtitle")}</span>
                            <span className='text-[#f7c630] text-xs xl:text-sm font-bold whitespace-nowrap'>{t("logoAction")}</span>
                        </div>
                        {isLogo1DropDown && (
                            <>
                                <div
                                    className="fixed inset-0 z-30"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        closeLogo1DropDown();
                                    }}
                                ></div>
                                <div className={`absolute rtl:right-2 ltr:left-2 mt-5 w-66 backdrop-blur-xl shadow-2xl rounded-lg border border-primary p-3 z-50 text-white
                            transform transition-transform duration-300 ease-in-out origin-top
                            scale-y-100 opacity-100
                            flex flex-col text-sm
                            `}>
                                    <p className='font-bold text-center text-xl text-secondary mb-2'>{t("mainOfficeTitle")}</p>
                                    <div className="flex items-start gap-2 mb-2">
                                        <MapPin size={16} className="text-secondary mt-1 shrink-0" />
                                        <p className="leading-tight">{t("mainOfficeAddress")}</p>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Phone size={16} className="text-secondary shrink-0" />
                                        <span>+0996 505 120 293</span>
                                    </div>
                                    <div className="flex items-center gap-2 hover:text-secondary transition-all">
                                        <Mail size={16} className="text-secondary shrink-0" />
                                        <a href='mailto:khedaib@malathegypt.com' className="break-all">khedaib@malathegypt.com</a>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* ******************************************************************************* */}

                {/* Main Header Navigation - Center */}
                <div className={`flex-1 flex justify-center ${!headerActive ? 'mt-6 sm:mt-8 md:mt-10 lg:mt-12' : ''} transition-all z-50`}>
                    <div className={`${!isScrolled ? 'max-w-[768px] xl:max-w-[992px]' : 'w-full'} ${headerActive && "shadow-2xl"}`}>
                        <ul className={`hidden lg:flex justify-around bg-white ${!headerActive && "rounded-full"} pr-2 pl-2 lg:pr-3 lg:pl-3 xl:pr-4 xl:pl-4 pt-2 pb-2 items-center text-xs lg:text-sm xl:text-base`}>
                            <li>
                                <NavLink
                                    to="/"
                                    end
                                    className={({ isActive }) =>
                                        `pt-2 pb-2 pr-2 pl-2 lg:pt-2.5 lg:pb-2.5 lg:pr-4 lg:pl-4 xl:pt-3 xl:pb-3 xl:pr-6 xl:pl-6 rounded-full transition-all mr-1 ml-1 lg:mr-2 lg:ml-2 xl:mr-3 xl:ml-3 whitespace-nowrap
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
                                        `pt-2 pb-2 pr-2 pl-2 lg:pt-2.5 lg:pb-2.5 lg:pr-4 lg:pl-4 xl:pt-3 xl:pb-3 xl:pr-6 xl:pl-6 rounded-full transition-all whitespace-nowrap
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
                                        `pt-2 pb-2 pr-2 pl-2 lg:pt-2.5 lg:pb-2.5 lg:pr-4 lg:pl-4 xl:pt-3 xl:pb-3 xl:pr-6 xl:pl-6 rounded-full transition-all whitespace-nowrap
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
                                        `pt-2 pb-2 pr-2 pl-2 lg:pt-2.5 lg:pb-2.5 lg:pr-4 lg:pl-4 xl:pt-3 xl:pb-3 xl:pr-6 xl:pl-6 rounded-full transition-all whitespace-nowrap
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
                                        `pt-2 pb-2 pr-2 pl-2 lg:pt-2.5 lg:pb-2.5 lg:pr-4 lg:pl-4 xl:pt-3 xl:pb-3 xl:pr-6 xl:pl-6 rounded-full transition-all whitespace-nowrap
                                     ${headerActive ? "hover:bg-secondary hover:text-white" : "hover:bg-primary hover:text-white"}
                                     ${isActive ? (headerActive ? "bg-secondary text-white" : "bg-primary text-white") : ""}`
                                    }
                                >
                                    {t("landing.ContactUs")}
                                </NavLink>
                            </li>
                            <button
                                onClick={() => handleLanguageChange(currentLang === "ar" ? "en" : "ar")}
                                aria-label="Toggle language"
                                className="inline-flex items-center gap-1.5 px-2 py-1 lg:px-2.5 xl:px-3 rounded-full bg-gray-100 hover:bg-gray-200 text-xs lg:text-sm text-gray-700 transition cursor-pointer mr-1 ml-1 lg:mr-2 lg:ml-2 xl:mr-3 xl:ml-3"
                            >
                                <Globe className="w-3 h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4" />
                                <span className="hidden xl:inline">{currentLang === "ar" ? "العربية" : "EN"}</span>
                            </button>
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
                                            `pt-3 pb-3 pr-3 pl-3 text-center rounded-full font-bold transition-all mr-2 ml-2
                                     ${headerActive ? "hover:bg-secondary hover:text-white" : "hover:bg-primary hover:text-white"}
                                     ${isActive ? (headerActive ? "bg-secondary text-white" : "bg-primary text-white") : "text-primary"}`
                                        }
                                    >
                                        {t("landing.Login")}
                                    </NavLink>
                                )}
                            </div>
                        </ul>
                    </div>
                </div>

                {/* Logo Section 2 - Right/Left depending on direction */}
                <div
                    ref={logo2Ref}
                    className={`hidden lg:block z-40 ${isScrolled ? 'lg:hidden' : ''} ${location !== '/' ? 'lg:hidden' : ''}`}
                >
                    <div className='relative cursor-pointer hover:scale-105 transition-transform duration-300' onClick={openLogo2DropDown}>
                        <div className={`inline-flex flex-col justify-center items-center p-3 xl:p-4 backdrop-blur-xl shadow-2xl rtl:rounded-tr-3xl rtl:rounded-br-3xl ltr:rounded-tl-3xl ltr:rounded-bl-3xl border-primary border-3 min-h-[120px] xl:min-h-[140px] gap-0.5`}>
                            <img className='w-[45px] xl:w-[55px]' src="Logo2.png" alt="logo2" />
                            <p className='font-bold text-base xl:text-lg text-white whitespace-nowrap'>{t("logo2Title")}</p>
                            <span className='text-white text-xs xl:text-sm whitespace-nowrap'>{t("logoSubtitle")}</span>
                            <span className='text-[#f7c630] text-xs xl:text-sm font-bold whitespace-nowrap'>{t("logoAction")}</span>
                        </div>
                        {isLogo2DropDown && (
                            <>
                                <div
                                    className="fixed inset-0 z-30"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        closeLogo2DropDown();
                                    }}
                                ></div>
                                <div className={`absolute top-full ltr:right-0 rtl:left-0 mt-2 w-64 max-w-[calc(100vw-2rem)] backdrop-blur-xl shadow-2xl rounded-lg border border-primary p-3 z-50 text-white
                            transform transition-transform duration-300 ease-in-out origin-top
                            scale-y-100 opacity-100
                            flex flex-col text-sm
                            `}>
                                    <div className="flex items-start gap-2 mb-2">
                                        <MapPin size={16} className="text-secondary mt-1 shrink-0" />
                                        <p className="leading-tight">{t("secondaryOfficeAddress")}</p>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" className="text-secondary">
                                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                        </svg>
                                        <span>0222604857</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Phone size={16} className="text-secondary shrink-0" />
                                        <span>01044947784 - 01005842307</span>
                                    </div>
                                    <div className="flex items-center gap-2 hover:text-secondary transition-all">
                                        <Mail size={16} className="text-secondary shrink-0" />
                                        <a href='mailto:aziz.nasr11@gmail.com' className="break-all">aziz.nasr11@gmail.com</a>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

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
                    {/* Language Toggle */}

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
                                <button
                                    onClick={() => handleLanguageChange(currentLang === "ar" ? "en" : "ar")}
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
                            <div className='flex flex-col items-center gap-3'>
                                <button
                                    onClick={() => handleLanguageChange(currentLang === "ar" ? "en" : "ar")}
                                    className='flex items-center w-full cursor-pointer justify-center gap-2 py-3 px-4 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-all'
                                >
                                    <Globe size={18} />
                                    <span>{currentLang === 'en' ? 'العربية' : 'English'}</span>
                                </button>
                                <Link
                                    to='login'
                                    onClick={toggleMobileMenu}
                                    className='inline-block w-full text-center py-3 px-6 bg-primary text-white rounded hover:bg-primary-dark transition-all font-bold'
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
                    {t("Office")}
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
        </div>
    )
}

export default Header
