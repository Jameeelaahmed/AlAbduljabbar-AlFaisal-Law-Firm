import { useState, useEffect, useRef } from 'react';
import i18n from '../../../i18n';
import { Bell, Globe } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const queryClient = useQueryClient();
    const menuRef = useRef(null);

    const [currentLang, setCurrentLang] = useState(() => {
        const savedLang = localStorage.getItem("selectedLanguage");
        queryClient.invalidateQueries(); 
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

    useEffect(() => {
        document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    }, [currentLang]);

    // close menu on outside click / blur
    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-sm border-b border-gray-100 shadow-lg">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Left: brand / title */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                            AJ
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-sm font-semibold text-gray-800">Admin Panel</h1>
                            <p className="text-xs text-gray-500">Dashboard</p>
                        </div>
                    </div>

                    {/* Right: actions */}
                    <div className="flex items-center gap-3">
                        {/* Language toggle */}
                        <button
                            onClick={() => handleLanguageChange(currentLang === "ar" ? "en" : "ar")}
                            aria-label="Toggle language"
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 transition"
                        >
                            <Globe className="w-4 h-4" />
                            <span className="hidden sm:inline">{currentLang === "ar" ? "العربية" : "EN"}</span>
                        </button>

                        {/* Notifications */}
                        <button
                            type="button"
                            className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 transition"
                            aria-label="Notifications"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-1 ring-white" />
                        </button>

                        {/* User menu */}
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setIsMenuOpen(v => !v)}
                                className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 transition"
                                aria-expanded={isMenuOpen}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&q=80"
                                    alt="user avatar"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <span className="hidden md:inline-block text-sm text-gray-800">Admin</span>
                                <span className="text-gray-400 text-xs">{isMenuOpen ? '▴' : '▾'}</span>
                            </button>

                            {/* dropdown */}
                            {isMenuOpen && (
                                <div className="absolute rtl:right-0 ltr:left-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
                                    <button
                                        onClick={() => { /* navigate to profile */ }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={() => { /* navigate to settings */ }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        Settings
                                    </button>
                                    <div className="border-t border-gray-100" />
                                    <button
                                        onClick={() => { /* logout */ }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
