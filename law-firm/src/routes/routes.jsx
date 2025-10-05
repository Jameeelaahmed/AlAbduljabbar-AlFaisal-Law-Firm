// libs
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

//layout components
import AdminLayout from "../layouts/AdminLayout";
import ClientLayout from "../layouts/ClientLayout";

//lazy loaded components
const LoginRegisterContainer = lazy(() => import("../pages/AuthPages/LoginRegisterPage/LoginRegisterContainer"));
const LandingContainer = lazy(() => import("../pages/ClientPages/Landing/LandingContainer"));

// Admin Components
const AdminSettings = lazy(() => import("../pages/AdminPages/settings/SettingsPageContainer"));
const AdminRequests = lazy(() => import("../pages/AdminPages/Requests/RequestsPageContainer"));
const AdminUsers = lazy(() => import("../pages/AdminPages/Users/UsersPageContainer"));
const routes = createBrowserRouter([
    {
        path: "/login",
        element: <LoginRegisterContainer />,
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: "settings",
                element: (
                    <Suspense fallback={<div>Loading Settings...</div>}>
                        <AdminSettings />
                    </Suspense>
                ),
            },
            {
                path: "requests",
                element: (
                    <Suspense fallback={<div>Loading Settings...</div>}>
                        <AdminRequests />
                    </Suspense>
                ),
            },
            {
                path: "users",
                element: (
                    <Suspense fallback={<div>Loading Settings...</div>}>
                        <AdminUsers />
                    </Suspense>
                ),
            },
        ]
    },
    {
        path: '/support',
        element: <AdminLayout />,
        children: [

        ]
    },
    {
        path: '/',
        element: <ClientLayout />,
        children: [
            { path: '/', element: <LandingContainer /> }
        ]
    },
])


export default function RoutesPages() {
    return <RouterProvider router={routes} />;
}