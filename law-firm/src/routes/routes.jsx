// libs
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

//layout components
import AdminLayout from "../layouts/AdminLayout";
import ClientLayout from "../layouts/ClientLayout";

//lazy loaded components
const LoginRegisterContainer = lazy(() => import("../pages/AuthPages/LoginRegisterPage/LoginRegisterContainer"));
const LandingContainer = lazy(() => import("../pages/ClientPages/Landing/LandingContainer"));

const routes = createBrowserRouter([
    {
        path: "/login",
        element: <LoginRegisterContainer />,
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [

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