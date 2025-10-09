import { Outlet } from "react-router-dom";
import SideBarContainer from "../components/AdminComponents/SideBar/SideBarContainer";
import HeaderComponentContainer from "../components/AdminComponents/Header/HeaderComponentContainer";

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <SideBarContainer />
            <div className="flex flex-col w-full min-h-screen bg-gray-100">
                <HeaderComponentContainer />
                <main className="flex-1 min-h-screen">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
