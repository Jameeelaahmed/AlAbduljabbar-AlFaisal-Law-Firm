// helpers
import { useAuthUser } from "../../../hooks/useAuthUser";
import i18n from "../../../i18n";
// libs
import { useEffect } from "react";
import { useTranslation } from 'react-i18next'
import { useState } from "react";
// components
import HeaderPresentational from "./HeaderPresentational"

function HeaderContainer() {
    const { t } = useTranslation();
    const { isAuthenticated, role, name, logout } = useAuthUser();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const [currentLang, setCurrentLang] = useState(() => {
        const savedLang = localStorage.getItem("selectedLanguage");
        return savedLang || i18n.language;
    });

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
            />
        </>
    )
}

export default HeaderContainer
