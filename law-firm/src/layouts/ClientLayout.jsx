// libs
import { lazy } from "react"
import { Outlet } from "react-router-dom"
import Footer from "../components/ClientComponents/Footer/Footer"

// components
const Header = lazy(() => import("../components/ClientComponents/Header/Header"))

function ClientLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    )
}

export default ClientLayout
