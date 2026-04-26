// Libraries
import { useEffect, useState } from 'react'
// Components
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../store/useAuthStore';
import {
    LayoutDashboard,
    Users,
    Headset,
    LogOut,
    X,
    ArrowLeft,
    Settings,
    Scale,
    CalendarCheck,
    HelpCircle,
    Handshake,
    Share2,
    Menu
} from "lucide-react";
import { NavLink } from "react-router-dom";
function Sidebar() {
    const { t } = useTranslation();
    const { user } = useAuthStore();
    const isCustomerService = user?.lastRole === 'CustomerService';
    const logout = useAuthStore((state) => state.logout)

    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        // Check if screen is large (>= 1024px) on initial load
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 1024;
        }
        return true;
    });
    const [showSidebarIcon, setShowSidebarIcon] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 1024;
        }
        return false;
    });

    useEffect(() => {
        const handleResize = () => {
            const isLargeScreen = window.innerWidth >= 1024;
            setIsSidebarOpen(isLargeScreen);
            setShowSidebarIcon(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function handletoggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    // Helper to close sidebar on navigation for md/sm screens
    const handleNavClick = () => {
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <>
            {/* Sidebar Trigger Icon for md and smaller screens */}
            {showSidebarIcon && !isSidebarOpen && (
                <button
                    className="fixed top-4 ltr:left-4 rtl:right-4 z-50 bg-primary text-white p-2 rounded-full shadow-lg lg:hidden"
                    onClick={handletoggleSidebar}
                    aria-label="Open sidebar"
                >
                    <Menu className="w-6 h-6" />
                </button>
            )}

            {/* Overlay for small and medium screens */}
            {isSidebarOpen && showSidebarIcon && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 block lg:hidden"
                    onClick={handletoggleSidebar}
                />
            )}

            {/* Sidebar - only visible on large screens or when opened via icon */}
            <div
                className={`
    bg-primary text-gray-200 min-h-screen flex flex-col
    transition-all duration-300
    ${isSidebarOpen ? "w-64" : "w-20"}
    ${isSidebarOpen ? "fixed lg:sticky" : "sticky"} 
    top-0 ltr:left-0 rtl:right-0 h-screen z-40  
    ${showSidebarIcon ? (isSidebarOpen ? "block" : "hidden") : "block"}
    lg:block
`}
            >
                {/* Header and Navigation Container */}
                <div className="p-6 flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <div
                        className={`flex border-b border-white/20 pb-2 mb-6 ${!isSidebarOpen ? "justify-center" : "justify-between items-center"
                            }`}
                    >
                        <div>
                            {isSidebarOpen && <p className="text-lg font-bold">عبد الجبار </p>}
                            {isSidebarOpen && <small className="text-gray-400">{t('sidebar.subtitle')}</small>}
                        </div>

                        {isSidebarOpen ? (
                            <span
                                onClick={handletoggleSidebar}
                                className="flex justify-center items-center w-6 h-6 cursor-pointer hover:bg-white/20 rounded transition-colors"
                            >
                                <X />
                            </span>
                        ) : (
                            <span
                                onClick={handletoggleSidebar}
                                className="flex justify-center items-center w-6 h-6 cursor-pointer hover:bg-white/20 rounded transition-colors"
                            >
                                <ArrowLeft />
                            </span>
                        )}
                    </div>

                    {/* Navigation - Scrollable if content overflows */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                        <ul className="space-y-2">
                            {/* Requests link - always visible */}
                            {
                                isCustomerService && (
                                    <>
                                        <li>
                                            <NavLink
                                                to="/admin/requests"
                                                onClick={handleNavClick}
                                                className={({ isActive }) =>
                                                    `flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                                    } ${isActive
                                                        ? "bg-white/30 text-white shadow-lg"
                                                        : "hover:bg-white/20"
                                                    }`
                                                }
                                            >
                                                <CalendarCheck className="w-5 h-5 shrink-0" />
                                                {isSidebarOpen && <span className="text-sm font-medium">{t("sidebar.requests")}</span>}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/admin/consultationTypes"
                                                onClick={handleNavClick}
                                                className={({ isActive }) =>
                                                    `flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                                    } ${isActive
                                                        ? "bg-white/30 text-white shadow-lg"
                                                        : "hover:bg-white/20"
                                                    }`
                                                }
                                            >
                                                <Share2 className="w-5 h-5 shrink-0" />
                                                {isSidebarOpen && <span className="text-sm font-medium">{t("consultationTypes")}</span>}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/admin/law-consultations"
                                                end
                                                onClick={handleNavClick}
                                                className={({ isActive }) =>
                                                    `flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                                    } ${isActive
                                                        ? "bg-white/30 text-white shadow-lg"
                                                        : "hover:bg-white/20"
                                                    }`
                                                }
                                            >
                                                <Handshake className="w-5 h-5 shrink-0" />
                                                {isSidebarOpen && <span className="text-sm font-medium">{t("sidebar.consultationsrequests")}</span>}
                                            </NavLink>
                                        </li>
                                    </>
                                )}
                            {/* Admin-only navigation items */}
                            {!isCustomerService && (
                                <>
                                    <li>
                                        <NavLink
                                            to=""
                                            end
                                            onClick={handleNavClick}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                                } ${isActive
                                                    ? "bg-white/30 text-white shadow-lg"
                                                    : "hover:bg-white/20"
                                                }`
                                            }
                                        >
                                            <LayoutDashboard className="w-5 h-5 shrink-0" />
                                            {isSidebarOpen && <span className="text-sm font-medium transition-all duration-300">{t("sidebar.dashboard")}</span>}
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="services"
                                            onClick={handleNavClick}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                                } ${isActive
                                                    ? "bg-white/30 text-white shadow-lg"
                                                    : "hover:bg-white/20"
                                                }`
                                            }
                                        >
                                            <Scale className="w-5 h-5 shrink-0" />
                                            {isSidebarOpen && <span className="text-sm font-medium">{t("sidebar.LawServices")}</span>}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="consultationTypes"
                                            onClick={handleNavClick}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                                } ${isActive
                                                    ? "bg-white/30 text-white shadow-lg"
                                                    : "hover:bg-white/20"
                                                }`
                                            }
                                        >
                                            <Share2 className="w-5 h-5 shrink-0" />
                                            {isSidebarOpen && <span className="text-sm font-medium">{t("consultationTypes")}</span>}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/admin/requests"
                                            onClick={handleNavClick}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                                } ${isActive
                                                    ? "bg-white/30 text-white shadow-lg"
                                                    : "hover:bg-white/20"
                                                }`
                                            }
                                        >
                                            <CalendarCheck className="w-5 h-5 shrink-0" />
                                            {isSidebarOpen && <span className="text-sm font-medium">{t("sidebar.requests")}</span>}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/admin/law-consultations"
                                            end
                                            onClick={handleNavClick}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                                } ${isActive
                                                    ? "bg-white/30 text-white shadow-lg"
                                                    : "hover:bg-white/20"
                                                }`
                                            }
                                        >
                                            <Handshake className="w-5 h-5 shrink-0" />
                                            {isSidebarOpen && <span className="text-sm font-medium transition-all duration-300">{t("sidebar.consultationsrequests")}</span>}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/admin/users"
                                            onClick={handleNavClick}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                                } ${isActive
                                                    ? "bg-white/30 text-white shadow-lg"
                                                    : "hover:bg-white/20"
                                                }`
                                            }
                                        >
                                            <Users className="w-5 h-5 shrink-0" />
                                            {isSidebarOpen && <span className="text-sm font-medium">{t("sidebar.users")}</span>}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/admin/faq"
                                            onClick={handleNavClick}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                                } ${isActive
                                                    ? "bg-white/30 text-white shadow-lg"
                                                    : "hover:bg-white/20"
                                                }`
                                            }
                                        >
                                            <HelpCircle className="w-5 h-5 shrink-0" />
                                            {isSidebarOpen && <span className="text-sm font-medium">{t("faq")}</span>}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/admin/contacts"
                                            onClick={handleNavClick}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                                } ${isActive
                                                    ? "bg-white/30 text-white shadow-lg"
                                                    : "hover:bg-white/20"
                                                }`
                                            }
                                        >
                                            <Headset className="w-5 h-5 shrink-0" />
                                            {isSidebarOpen && <span className="text-sm font-medium">{t("Contacts.Management")}</span>}
                                        </NavLink>
                                    </li>


                                    <li>
                                        <NavLink
                                            to="/admin/settings"
                                            onClick={handleNavClick}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                                } ${isActive
                                                    ? "bg-white/30 text-white shadow-lg"
                                                    : "hover:bg-white/20"
                                                }`
                                            }
                                        >
                                            <Settings className="w-5 h-5 shrink-0" />
                                            {isSidebarOpen && <span className="text-sm font-medium">{t("sidebar.settings")}</span>}
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Fixed Logout Button at Bottom */}
                <div className="p-6 border-t border-white/20 bg-primary shrink-0">
                    <button
                        className={`cursor-pointer flex items-center gap-2 p-3 rounded-lg hover:bg-red-500/20 hover:text-red-300 transition-all w-full ${!isSidebarOpen ? "justify-center" : "text-left"
                            }`}
                        onClick={() => {
                            logout();
                        }}
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        {isSidebarOpen && <span className="text-sm font-medium">{t("sidebar.logout")}</span>}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar
