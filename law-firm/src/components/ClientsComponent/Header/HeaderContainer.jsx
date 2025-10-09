// helpers
import { useAuthUser } from "../../../hooks/useAuthUser";
import i18n from "../../../i18n";
// libs
import { useEffect } from "react";
import { useTranslation } from 'react-i18next'
import { useState } from "react";
// components
import HeaderPresentational from "./HeaderPresentational"
import { useAuthStore } from "../../../store/useAuthStore";

function HeaderContainer() {
    const { t } = useTranslation();
    const { isAuthenticated, user, logout } = useAuthStore();
    const role = user?.lastRole;
    const name = user?.name;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState(() => {
        const savedLang = localStorage.getItem("selectedLanguage");
        return savedLang || i18n.language;
    });

    const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false)
    const [isLogo1DropDown, setIsLogo1DropDown] = useState(false)
    const [isLogo2DropDown, setIsLogo2DropDown] = useState(false)

    // desptop dropdown
    const toggleDesktopDropdown = () => {
        setIsDesktopDropdownOpen(!isDesktopDropdownOpen)
    }

    const closeDesktopDropdown = () => {
        setIsDesktopDropdownOpen(false)
    }

    //logo1 drop down 
    const openLogo1DropDown = () => {
        setIsLogo1DropDown(!isDesktopDropdownOpen)
    }

    const closeLogo1DropDown = () => {
        setIsLogo1DropDown(false)
    }
    //logo2 drop down 
    const openLogo2DropDown = () => {
        setIsLogo2DropDown(!isDesktopDropdownOpen)
    }

    const closeLogo2DropDown = () => {
        setIsLogo2DropDown(false)
    }
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };


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

    return (
        <>
            <HeaderPresentational
                t={t}
                username={name}
                isAuthenticated={isAuthenticated}
                role={role}
                handleLogout={handleLogout}
                isMobileMenuOpen={isMobileMenuOpen}
                toggleMobileMenu={toggleMobileMenu}
                handleLanguageChange={handleLanguageChange}
                currentLang={currentLang}
                isDesktopDropdownOpen={isDesktopDropdownOpen}
                toggleDesktopDropdown={toggleDesktopDropdown}
                closeDesktopDropdown={closeDesktopDropdown}
                openLogo1DropDown={openLogo1DropDown}
                closeLogo1DropDown={closeLogo1DropDown}
                isLogo1DropDown={isLogo1DropDown}
                openLogo2DropDown={openLogo2DropDown}
                closeLogo2DropDown={closeLogo2DropDown}
                isLogo2DropDown={isLogo2DropDown}
            />
        </>
    )
}

export default HeaderContainer
