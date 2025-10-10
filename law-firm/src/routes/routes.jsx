// libs
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoutes";
//layout components
import AdminLayout from "../layouts/AdminLayout";
import ClientLayout from "../layouts/ClientLayout";
import DashboardContainer from "../pages/AdminPages/Dashboard/DashboardContainer";

//lazy loaded components
const LoginRegisterContainer = lazy(() => import("../pages/AuthPages/LoginRegisterPage/LoginRegisterContainer"));
const LandingContainer = lazy(() => import("../pages/ClientPages/Landing/LandingContainer"));

// Admin Components
const AdminSettings = lazy(() => import("../pages/AdminPages/settings/SettingsPageContainer"));
const AdminRequests = lazy(() => import("../pages/AdminPages/Requests/RequestsPageContainer"));
const AdminRequestDetails = lazy(() => import("../pages/AdminPages/Requests/RequestsDetailsContainer"));
const AdminUsers = lazy(() => import("../pages/AdminPages/Users/UsersPageContainer"));
const AdminServices = lazy(() => import("../pages/AdminPages/Services/ServicesContainer"));
const routes = createBrowserRouter([
    {
        path: "/login",
        element: <LoginRegisterContainer />,
    },
    {
        path: '/admin',
        element:
            <ProtectedRoute allowedRoles={['Admin']}>
                <AdminLayout />
            </ProtectedRoute>
        ,
        children: [
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<div>Loading Serivices...</div>}>
                            <DashboardContainer />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "services",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<div>Loading Serivices...</div>}>
                            <AdminServices />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "settings",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<div>Loading Settings...</div>}>
                            <AdminSettings />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "requests",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<div>Loading Settings...</div>}>
                            <AdminRequests />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "requests/:requestId",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<div>Loading Request Details...</div>}>
                            <AdminRequestDetails />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "users",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<div>Loading Settings...</div>}>
                            <AdminUsers />
                        </Suspense>
                    </ProtectedRoute>
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
            {
                path: '/', element:
                    <ProtectedRoute allowedRoles={['User']}>
                        <LandingContainer />
                    </ProtectedRoute>
            }
        ]
    },
])


export default function RoutesPages() {
    return <RouterProvider router={routes} />;
}