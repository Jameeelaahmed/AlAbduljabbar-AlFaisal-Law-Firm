import HeaderComponentPresentational from './HeaderComponentPresentational'
import { useState, useEffect } from 'react';
import i18n from '../../../i18n';

export default function HeaderComponentContainer() {
    const [currentLang, setCurrentLang] = useState(() => {
        const savedLang = localStorage.getItem("selectedLanguage");
        return savedLang || i18n.language;
    });

    const handleLanguageChange = (lang) => {
        console.log("Language change triggered with:", lang); // 👈 check this
        i18n
            .changeLanguage(lang)
            .then(() => {
                setCurrentLang(lang);
                localStorage.setItem("selectedLanguage", lang);
            })
            .catch((err) => console.error("Error changing language:", err));
    };


    // // Initialize language from localStorage on component mount
    // useEffect(() => {
    //     const savedLang = localStorage.getItem("selectedLanguage");
    //     if (savedLang && savedLang !== i18n.language) {
    //         i18n
    //             .changeLanguage(savedLang)
    //             .catch((err) => console.error("Error setting saved language:", err));
    //     }
    // }, []);

    useEffect(() => {
        document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    }, [currentLang]);

    return (
        <HeaderComponentPresentational currentLang={currentLang} handleLanguageChange={handleLanguageChange} />
    )
}
