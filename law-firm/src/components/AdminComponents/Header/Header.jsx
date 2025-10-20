import { useState, useEffect, useRef } from 'react';
import i18n from '../../../i18n';
import { Globe, User } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from '../../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import NotificationBell from '../../Common/NotificationBell';
function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const menuRef = useRef(null);
    const logout = useAuthStore((state) => state.logout)
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
        <nav className="sticky top-0 z-30 bg-white/70 backdrop-blur-sm border-b border-gray-100 shadow-lg">
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
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 transition cursor-pointer"
                        >
                            <Globe className="w-4 h-4" />
                            <span className="hidden sm:inline">{currentLang === "ar" ? "العربية" : "EN"}</span>
                        </button>

                        {/* Notifications */}
                        <div className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 transition cursor-pointer">
                            <NotificationBell />
                        </div>

                        {/* User menu */}
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setIsMenuOpen(v => !v)}
                                className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
                                aria-expanded={isMenuOpen}
                            >
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                    <User className="w-5 h-5 text-gray-500" />
                                </div>
                                {/* <span className="hidden md:inline-block text-sm text-gray-800">Admin</span> */}
                                <span className="text-gray-400 text-xs">{isMenuOpen ? '▴' : '▾'}</span>
                            </button>

                            {/* dropdown */}
                            {isMenuOpen && (
                                <div className={`absolute ${i18n.dir() === 'rtl' ? 'left-0' : 'right-0'} mt-2 w-48 bg-white rounded-md shadow-xl border border-gray-200 overflow-hidden z-50 transition-all duration-200 ease-in-out transform origin-top-${i18n.dir() === 'rtl' ? 'left' : 'right'}`}>
                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            navigate('/admin/profile');
                                        }}
                                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-150 flex items-center space-x-2"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            navigate('/admin/settings');
                                        }}
                                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-150 flex items-center space-x-2"
                                    >
                                        Settings
                                    </button>
                                    <div className="border-t border-gray-100" />
                                    <button
                                        onClick={() => logout()}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
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
