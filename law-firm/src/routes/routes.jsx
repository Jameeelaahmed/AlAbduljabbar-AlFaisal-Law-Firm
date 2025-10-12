// libs
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoutes";
//layout components

import AdminLayout from "../layouts/AdminLayout";
import ClientLayout from "../layouts/ClientLayout";
const Dashboard = lazy(() => import("../pages/AdminPages/Dashboard/Dashboard"));
import NotFoundPage from "../pages/NotFoundPage";

//lazy loaded components
const LoginRegister = lazy(() => import("../pages/AuthPages/LoginRegisterPage/LoginRegisterPage"));
const Landing = lazy(() => import("../pages/ClientPages/Landing/Landing"));

// Admin Components
const AdminSettings = lazy(() => import("../pages/AdminPages/Settings/SettingsPage"));
const AdminRequests = lazy(() => import("../pages/AdminPages/Requests/Requests"));
const AdminRequestDetails = lazy(() => import("../pages/AdminPages/Requests/RequestsDetails"));
const AdminUsers = lazy(() => import("../pages/AdminPages/Users/Users"));
const AdminServices = lazy(() => import("../pages/AdminPages/Services/Services"));
const routes = createBrowserRouter([
    {
        path: "/login",
        element: <LoginRegister />,
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
                path: "",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<div>Loading Dashboard...</div>}>
                            <Dashboard />
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
            //     ]
            // },
            // {
            //     path: '/support',
            //     element: <AdminLayout />,
            //     children: [

        ]
    },
    {
        path: '/',
        element: <ClientLayout />,
        children: [
            {
                path: '/', element:
                    // <ProtectedRoute allowedRoles={['User']}>
                    <Landing />
                // </ProtectedRoute>
            }
        ]
    },
    // catch-all 404 route (must be last)
    {
        path: "*",
        element: <NotFoundPage />
    }
])


export default function RoutesPages() {
    return <RouterProvider router={routes} />;
}