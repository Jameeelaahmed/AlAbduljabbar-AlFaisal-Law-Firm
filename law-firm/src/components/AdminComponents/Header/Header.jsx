import { useState, useEffect } from 'react';
import i18n from '../../../i18n';
import { Bell, Globe } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const queryClient = useQueryClient();

    const [currentLang, setCurrentLang] = useState(() => {
        const savedLang = localStorage.getItem("selectedLanguage");
        queryClient.invalidateQueries(); // 👈 forces refetch
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

    useEffect(() => {
        document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    }, [currentLang]);


    return (
        <nav className="relative bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Mobile menu button */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="size-6"
                                >
                                    <path
                                        d="M6 18L18 6M6 6l12 12"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="size-6"
                                >
                                    <path
                                        d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Right side icons */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-2">
                        {/* Language toggle */}
                        <button
                            onClick={() => handleLanguageChange(currentLang === "ar" ? "en" : "ar")} className="relative rounded-full p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <Globe className="w-5 h-5" />
                            <span className="sr-only">Change language</span>
                        </button>
                        <span className="text-gray-300 text-sm hidden sm:inline-block">
                            {currentLang === "en" ? "EN" : "AR"}
                        </span>

                        {/* Notifications */}
                        <button
                            type="button"
                            className="relative rounded-full p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="sr-only">View notifications</span>
                        </button>

                        {/* Profile dropdown */}
                        <div className="relative ml-3">
                            <button className="relative flex rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&q=80"
                                    alt="user"
                                    className="w-8 h-8 rounded-full"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {["Dashboard", "Team", "Projects", "Calendar"].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className={`block rounded-md px-3 py-2 text-base font-medium ${item === "Dashboard"
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Header
