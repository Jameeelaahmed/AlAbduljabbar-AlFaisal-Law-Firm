import React from "react";
import { LayoutDashboard, Users, FileText, LogOut, X, ArrowLeft } from "lucide-react";

export default function SideBarPresentational({ isSidebarOpen, handletoggleSidebar }) {
    return (
        <div
            className={`bg-primary text-gray-200 min-h-screen p-6 flex flex-col justify-between transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"
                }`}
        >
            {/* Header */}
            <div>
                <div className={`flex border-b border-white/20 pb-2 ${!isSidebarOpen ? "justify-center" : "space-x-10"}`}>
                    <div className="">
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
                        <a
                            href="#"
                            className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/20 transition cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                }`}
                        >
                            <LayoutDashboard className={'w-5 h-5'} />
                            {isSidebarOpen && <span className="text-lg transition-all duration-300">لوحة القيادة</span>}
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/20 transition cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                }`}
                        >
                            <Users className="w-5 h-5" />
                            {isSidebarOpen && <span>المستخدمين</span>}
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/20 transition cursor-pointer ${!isSidebarOpen ? "justify-center" : ""
                                }`}
                        >
                            <FileText className="w-5 h-5" />
                            {isSidebarOpen && <span>التقارير</span>}
                        </a>
                    </li>
                </ul>

            </div>

            {/* Footer */}
            <div className="mt-6 border-t border-white/20 pt-4">
                <a
                    href="#"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/50 transition"
                >
                    <LogOut className="w-5 h-5" />

                    {isSidebarOpen && <span>تسجيل الخروج</span>}
                </a>
            </div>
        </div >
    );
}
