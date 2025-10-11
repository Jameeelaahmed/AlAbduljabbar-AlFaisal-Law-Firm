import { Outlet } from "react-router-dom";

import Header from '../components/AdminComponents/Header/Header'
import Sidebar from "../components/AdminComponents/SidebarComponent/SidebarComponent";

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex flex-col w-full min-h-screen bg-gray-100">
                <Header />
                <main className="flex-1 min-h-screen">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
