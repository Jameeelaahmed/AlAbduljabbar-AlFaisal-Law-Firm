// libs
import { lazy } from "react"
import { Outlet } from "react-router-dom"
import Footer from "../components/ClientComponents/Footer/Footer"

// components
const Header = lazy(() => import("../components/ClientComponents/Header/Header"))

function ClientLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default ClientLayout
