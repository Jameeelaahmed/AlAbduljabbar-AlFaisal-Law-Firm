// libs
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
// data
import i18n from "../i18n"
import { getHomePageData, fetchSliders } from "../api/landing"
import * as categoryApi from "../api/category"
// components
import Header from "../components/ClientComponents/Header/Header"
import Footer from "../components/ClientComponents/Footer/Footer"

function ClientLayout() {
    const queryClient = useQueryClient()

    // Warm up the home page (route chunk + its data) while the browser is
    // idle, so switching to the home page doesn't wait for downloads on
    // production. All prefetches reuse the exact chunk/query keys the home
    // page uses, and are ignored if the data is already cached.
    useEffect(() => {
        const warmUpHome = () => {
            const currentLang = i18n.language || localStorage.getItem("selectedLanguage") || "ar"

            // Same chunk the route lazy-loads
            import("../pages/ClientPages/Landing/Landing")

            // Same query keys the home page components use
            queryClient.prefetchQuery({
                queryKey: ["HomePage", currentLang],
                queryFn: getHomePageData,
                staleTime: 1000 * 60 * 30,
            })
            queryClient.prefetchQuery({
                queryKey: ["allCategories", currentLang],
                queryFn: categoryApi.getAllCategories,
                staleTime: 1000 * 60 * 30,
            })
            queryClient.prefetchQuery({
                queryKey: ["sliders", currentLang],
                queryFn: fetchSliders,
                staleTime: 1000 * 60 * 30,
            })
        }

        let cancel
        if ("requestIdleCallback" in window) {
            const id = window.requestIdleCallback(warmUpHome)
            cancel = () => window.cancelIdleCallback(id)
        } else {
            const timeoutId = setTimeout(warmUpHome, 1500)
            cancel = () => clearTimeout(timeoutId)
        }
        return cancel
    }, [queryClient])

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
