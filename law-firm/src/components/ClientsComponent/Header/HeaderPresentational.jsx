// icons
import { LogOut, Menu, X, User, ChevronDown, Globe, UserCircle, MapPin, Phone, Mail } from 'lucide-react'
// libs
import { Link } from 'react-router-dom'
// imgs
import logo1 from '../../../assets/Logos/Logo1.png'
import logo2 from '../../../assets/Logos/Logo2.png'

function HeaderPresentational({
    t,
    isAuthenticated,
    role,
    username,
    handleLogout,
    isMobileMenuOpen,
    toggleMobileMenu,
    toggleLanguage,
    currentLanguage,
    handleLanguageChange,
    currentLang,
    isDesktopDropdownOpen,
    toggleDesktopDropdown,
    closeDesktopDropdown,
    openLogo1DropDown,
    closeLogo1DropDown,
    isLogo1DropDown,
    openLogo2DropDown,
    closeLogo2DropDown,
    isLogo2DropDown
}) {


    return (
        <>
            {/* Main Header */}
            <div className=" fixed w-full flex justify-between items-center z-50">
                {/* Logo Section */}
                <>
                    <div className='relative cursor-pointer hover:scale-105 transition-transform duration-300'>
                        <div className='flex flex-col justify-center items-center p-4 backdrop-blur-xl shadow-2xl rtl:rounded-tl-3xl rtl:rounded-bl-3xl ltr:rounded-tr-3xl ltr:rounded-br-3xl  border-primary border-3'
                            onClick={openLogo1DropDown}>
                            <img className='w-[55px]' src={logo1} alt="logo1" />
                            <p className='font-bold text-lg text-white'>العبد الجبار </p>
                            <span className='text-white'>محامون و مستشاورن</span>
                            <span className='text-accents text-sm font-bold'>اضغط لرؤية بيانات الشركه</span>
                        </div>
                        <div className={`absolute rtl:right-2 ltr:left-2 mt-5 w-66 backdrop-blur-xl shadow-2xl rounded-lg border border-primary p-2 z-60 text-white
                    transform transition-transform duration-300 ease-in-out origin-top
                    ${isLogo1DropDown ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}
                    flex flex-col
                    `}>
                            <p className='font-bold text-center text-xl text-secondary mb-2'>المكتب الرئيسي</p>
                            <div className="flex items-start gap-2">
                                <MapPin size={16} className="text-secondary mt-1 flex-shrink-0" />
                                <p>السعوديه - الرياض - حي المروج - مركز الحياة سنتر - مبني B- الدور الاول - مكتب 5 </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-secondary flex-shrink-0" />
                                <span>+0996 505 120 293</span>
                            </div>
                            <div className="flex items-center gap-2 hover:text-secondary transition-all">
                                <Mail size={16} className="text-secondary flex-shrink-0" />
                                <Link to='mailto:khedaib@malathegypt.com'>khedaib@malathegypt.com</Link>
                            </div>
                        </div>
                    </div>
                    {isLogo1DropDown && (
                        <div
                            className="fixed inset-0 z-50"
                            onClick={closeLogo1DropDown}
                        ></div>
                    )}
                </>

                {/* Desktop Navigation */}
                <ul className='hidden lg:flex justify-around bg-white rounded-full pr-2 pl-2 pt-2 pb-2'>
                    <li className='pt-3 pb-3 pr-6 pl-6 rounded-full text-secondary hover:bg-primary hover:text-white transition-all'>
                        <Link>
                            <p>{t("landing.Home")}</p>
                        </Link>
                    </li>
                    <li className='pt-3 pb-3 pr-6 pl-6 rounded-full text-secondary hover:bg-primary hover:text-white transition-all'>
                        <Link>
                            <p>{t("landing.OurLawServices")}</p>
                        </Link>
                    </li>
                    <li className='pt-3 pb-3 pr-6 pl-6 rounded-full text-secondary hover:bg-primary hover:text-white transition-all'>
                        <Link>
                            <p>{t("landing.FAQ")}</p>
                        </Link>
                    </li>
                    <li className='pt-3 pb-3 pr-6 pl-6 rounded-full text-secondary hover:bg-primary hover:text-white transition-all'>
                        <Link>
                            <p>{t("landing.AboutUs")}</p>
                        </Link>
                    </li>
                    <li className='pt-3 pb-3 pr-6 pl-6 rounded-full text-secondary hover:bg-primary hover:text-white transition-all'>
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
                                        <span>{t("landing.Hello")} {username}</span>
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
                            <div className='font-bold text-primary mr-3 ml-3'>
                                <Link to='login'>
                                    {t("landing.Login")}
                                </Link>
                            </div>
                        )}
                    </div>
                </ul>

                {/* The other Logo */}


                <>
                    <div className='relative cursor-pointer hover:scale-105 transition-transform duration-300'>
                        <div className='flex flex-col justify-center items-center p-4 backdrop-blur-xl shadow-2xl rtl:rounded-tr-3xl rtl:rounded-br-3xl ltr:rounded-tl-3xl ltr:rounded-bl-3xl  border-primary border-3'
                            onClick={openLogo2DropDown}>
                            <img className='w-[55px]' src={logo2} alt="logo2" />
                            <p className='font-bold text-lg text-white'>العبد الجبار و الفيصل </p>
                            <span className='text-white'>محامون و مستشاورن</span>
                            <span className='text-text text-sm font-bold'>اضغط لرؤية بيانات الشركه</span>
                        </div>
                        <div className={`absolute ltr:right-2 rtl:left-2 mt-5 w-66 backdrop-blur-xl shadow-2xl rounded-lg border border-primary p-2 z-60 text-white
                    transform transition-transform duration-300 ease-in-out origin-top
                    ${isLogo2DropDown ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}
                    flex flex-col
                    `}>
                            <div className="flex items-start gap-2">
                                <MapPin size={16} className="text-secondary mt-1 flex-shrink-0" />
                                <p>مصر - القاهره 20 شاراع الطيران - الدور الاول - شقه 2</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" className="text-secondary">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                </svg>
                                <span>0222604857</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-secondary flex-shrink-0" />
                                <span>01044947784 - 01005842307</span>
                            </div>
                            <div className="flex items-center gap-2 hover:text-secondary transition-all">
                                <Mail size={16} className="text-secondary flex-shrink-0" />
                                <Link to='mailto:aziz.nasr11@gmail.com'>aziz.nasr11@gmail.com</Link>
                            </div>
                        </div>
                    </div>
                    {isLogo2DropDown && (
                        <div
                            className="fixed inset-0 z-50"
                            onClick={closeLogo2DropDown}
                        ></div>
                    )}
                </>
                {/* Mobile Menu Button */}
                <div className='lg:hidden'>
                    <button
                        onClick={toggleMobileMenu}
                        className='p-2 text-primary hover:bg-gray-100 rounded'
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div >

            {/* Mobile Slide Menu */}
            < div className={`
                fixed top-0 left-0 w-full bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden
                ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
            `}>
                {/* Mobile menu content with top padding to account for fixed header */}
                < div className="pt-20 pb-6 px-6" >
                    {/* Mobile Navigation */}
                    <ul ul className='flex flex-col space-y-2' >
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
                    </ul >

                    {/* Mobile Auth Section */}
                    <div div className='mt-6 pt-4 border-t border-gray-200' >
                        {(isAuthenticated && role == 'User') ? (
                            <div className='flex flex-col space-y-3'>
                                <p className='text-center text-secondary'>{t("landing.Hello")} {username}</p>

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
                                    onClick={toggleLanguage}
                                    className='flex items-center justify-center gap-2 py-3 px-4 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-all'
                                >
                                    <Globe size={18} />
                                    <span>{currentLanguage === 'en' ? 'العربية' : 'English'}</span>
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

export default HeaderPresentational
