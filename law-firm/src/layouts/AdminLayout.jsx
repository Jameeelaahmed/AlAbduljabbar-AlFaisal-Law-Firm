import { Outlet } from "react-router-dom";
import SideBarContainer from "../components/AdminComponents/SideBar/SideBarContainer";

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <SideBarContainer />
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
}
