import { Outlet } from "react-router-dom";
import SideBarContainer from "../components/AdminComponents/SideBar/SideBarContainer";
import HeaderComponentContainer from "../components/AdminComponents/Header/HeaderComponentContainer";

export default function AdminLayout() {
    return (
        <div className="flex">
            <SideBarContainer />
            <div className="flex flex-col w-full min-h-screen bg-gray-100">
                <HeaderComponentContainer />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
