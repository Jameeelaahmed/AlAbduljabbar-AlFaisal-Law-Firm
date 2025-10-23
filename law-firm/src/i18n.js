// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from './locales/en/translationEN.json';
import translationAR from './locales/ar/translationAR.json';

// 🔹 Ensure a default language in localStorage
let savedLang = localStorage.getItem("selectedLanguage");

if (!savedLang) {
  savedLang = "ar";
  localStorage.setItem("selectedLanguage", savedLang);
}

// 🔹 Set text direction before React renders
document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";

const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR },
};

// 🔹 Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar"],
    resources,
    lng: savedLang,
    fallbackLng: "ar",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
