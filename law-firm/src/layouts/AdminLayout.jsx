import { Outlet } from "react-router-dom"
import SideBarContainer from './SideBar/SideBarContainer'

function AdminLayout() {
    return (
        <>
            <SideBarContainer />
            <Outlet />
        </>
    )
}

export default AdminLayout
