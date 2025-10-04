// libs
import { lazy } from "react"
import { Outlet } from "react-router-dom"

// components
const HeaderContainer = lazy(() => import("../components/Header/HeaderContainer"))

function ClientLayout() {
    return (
        <>
            <HeaderContainer />
            <Outlet />
        </>
    )
}

export default ClientLayout
