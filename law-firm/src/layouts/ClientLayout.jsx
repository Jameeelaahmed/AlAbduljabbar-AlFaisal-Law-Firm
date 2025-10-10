// libs
import { lazy } from "react"
import { Outlet } from "react-router-dom"

// components
const Header = lazy(() => import("../components/ClientComponents/Header/Header"))

function ClientLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default ClientLayout
