import React from "react";
import {
    LayoutDashboard,
    Users,
    FileText,
    LogOut,
    X,
    ArrowLeft,
    Settings,
    Scale,
    CalendarCheck
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function SideBarPresentational({ isSidebarOpen, handletoggleSidebar }) {
    return (
        <div
            className={`bg-primary text-gray-200 min-h-screen p-6 flex flex-col justify-between transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"
                }`}
        >
            {/* Header */}
            <div>
                <div
                    className={`flex border-b border-white/20 pb-2 ${!isSidebarOpen ? "justify-center" : "space-x-10"
                        }`}
                >
                    <div>
                        {isSidebarOpen && <p className="text-lg font-bold">عبد الجبار والفيصل</p>}
                        {isSidebarOpen && <small className="text-gray-400">لوحة التحكم</small>}
                    </div>

                    {isSidebarOpen ? (
                        <span
                            onClick={handletoggleSidebar}
                            className="flex justify-center items-center w-6 h-6 cursor-pointer"
                        >
                            <X />
                        </span>
                    ) : (
                        <span
                            onClick={handletoggleSidebar}
                            className="flex justify-center items-center w-6 h-6 cursor-pointer"
                        >
                            <ArrowLeft />
                        </span>
                    )}
                </div>

                {/* Navigation */}
                <ul className="mt-6 space-y-4">
                    <li>
                        <NavLink
                            to=""
                            className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/20 transition cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                }`}
                        >
                            <LayoutDashboard className="w-5 h-5" />
                            {isSidebarOpen && <span className="text-lg transition-all duration-300">لوحة القيادة</span>}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="services"
                            className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/20 transition cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                }`}
                        >
                            <Scale className="w-5 h-5" />
                            {isSidebarOpen && <span> الخدمات القانونية</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/requests"
                            className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/20 transition cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                }`}
                        >
                            <CalendarCheck className="w-5 h-5" />
                            {isSidebarOpen && <span>الطلبات</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/users"
                            className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/20 transition cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                }`}
                        >
                            <Users className="w-5 h-5" />
                            {isSidebarOpen && <span>المستخدمين</span>}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to=""
                            className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/20 transition cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                }`}
                        >
                            <FileText className="w-5 h-5" />
                            {isSidebarOpen && <span>التقارير</span>}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/admin/settings"
                            className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/20 transition cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                }`}
                        >
                            <Settings className="w-5 h-5" />
                            {isSidebarOpen && <span>الإعدادات</span>}
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Footer */}
            <div className="mt-6 border-t border-white/20 pt-4">
                <NavLink
                    to=""
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/50 transition"
                >
                    <LogOut className="w-5 h-5" />
                    {isSidebarOpen && <span>تسجيل الخروج</span>}
                </NavLink>
            </div>
        </div>
    );
}
