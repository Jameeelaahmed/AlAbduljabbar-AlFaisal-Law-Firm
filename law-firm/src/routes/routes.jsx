// libs
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoutes";
import VerifyOtpGuard from "./VerifyOtpGuard";
import ExcludeRoles from "./ExcludeRoles";
import GuestOnlyGuard from "./GuestOnlyGuard";
import UserOnlyGuard from "./UserOnlyGuard";
//layout components

import AdminLayout from "../layouts/AdminLayout";
import ClientLayout from "../layouts/ClientLayout";
const Dashboard = lazy(() => import("../pages/AdminPages/Dashboard/Dashboard"));
import NotFoundPage from "../pages/NotFoundPage";
import UnAuthorized from "../pages/UnAuthorized";
import LawServicesPage from "../pages/ClientPages/ServicesPage/ServicesPage";
import FAQPage from "../pages/ClientPages/FAQ/FAQ";
import ContactUs from "../pages/ClientPages/ContactUs/ContactUs";
import AdminContacts from "../pages/AdminPages/Contacts/ContactsPage";
const AdminProfile = lazy(() => import("../pages/AdminPages/Profile/AdminProfile"));
import LoadingPage from "../pages/LoadingPage/LoadingPage";

//lazy loaded components
const LoginRegister = lazy(() => import("../pages/AuthPages/LoginRegisterPage/LoginRegisterPage"));
const Landing = lazy(() => import("../pages/ClientPages/Landing/Landing"));
const ForgetPassword = lazy(() => import('../pages/ForgetPassword/ForgetPasswordPage'))
const VerifyOTP = lazy(() => import("../pages/ForgetPassword/VerifyOTP"))
const ResetPassword = lazy(() => import("../pages/ForgetPassword/ResetPasswordPage"))
const FAQ = lazy(() => import("../pages/AdminPages/FAQ/FAQ"));
const ConsultationTypes = lazy(() => import("../pages/AdminPages/ConsultationTypes/ConsultationTypes"));
const ConsultantPage = lazy(() => import("../pages/ClientPages/ConsultantPage/ConsultantPage"))
const ClientProfile = lazy(() => import("../pages/ClientPages/Profile/Profile"))
// Admin Components
const AdminSettings = lazy(() => import("../pages/AdminPages/Settings/SettingsPage"));
const AdminRequests = lazy(() => import("../pages/AdminPages/Requests/Requests"));
const AdminRequestDetails = lazy(() => import("../pages/AdminPages/Requests/RequestsDetails"));
const AdminUsers = lazy(() => import("../pages/AdminPages/Users/Users"));
const AdminServices = lazy(() => import("../pages/AdminPages/Services/Services"));
const AdminConsultations = lazy(() => import("../pages/AdminPages/Consultations/ConsultationsPage"))
const AdminConsultationDetails = lazy(() => import("../pages/AdminPages/Consultations/ConsultationDetailsPage"))

const routes = createBrowserRouter([
    {
        path: "/login",
        element: (
            <GuestOnlyGuard>
                <LoginRegister />
            </GuestOnlyGuard>
        ),
    },
    {
        path: "forget-password",
        element: (
            <GuestOnlyGuard>
                <ForgetPassword />
            </GuestOnlyGuard>
        )
    },
    {
        path: "verify-otp",
        element: (
            <VerifyOtpGuard>
                <VerifyOTP />
            </VerifyOtpGuard>
        )
    },
    {
        path: "reset-password",
        element: (
            <VerifyOtpGuard>
                <ResetPassword />
            </VerifyOtpGuard>
        )
    },
    {
        path: "unauthorized",
        element: (
            <UnAuthorized />
        )
    },
    {
        path: '/admin',
        element:
            <ProtectedRoute allowedRoles={['Admin', 'CustomerService']}>
                <Suspense fallback={<LoadingPage />}>
                    <AdminLayout />
                </Suspense>
            </ProtectedRoute>
        ,
        children: [
            {
                path: "",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Dashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: "services",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <AdminServices />
                    </ProtectedRoute>
                ),
            },
            {
                path: "consultationTypes",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <ConsultationTypes />
                    </ProtectedRoute>
                ),
            },
            {
                path: "faq",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <FAQ />
                    </ProtectedRoute>
                ),
            },
            {
                path: "settings",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <AdminSettings />
                    </ProtectedRoute>
                ),
            },
            {
                path: "requests",
                element: (
                    <ProtectedRoute allowedRoles={['Admin', 'CustomerService']}>
                        <AdminRequests />
                    </ProtectedRoute>
                ),
            },
            {
                path: "requests/:requestId",
                element: (
                    <ProtectedRoute allowedRoles={['Admin', 'CustomerService']}>
                        <AdminRequestDetails />
                    </ProtectedRoute>
                ),
            },
            {
                path: "users",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <AdminUsers />
                    </ProtectedRoute>
                ),
            },
            {
                path: "law-consultations",
                element: (
                    <ProtectedRoute allowedRoles={['Admin', 'CustomerService']}>
                        <AdminConsultations />
                    </ProtectedRoute>
                ),
            },
            {
                path: "law-consultations/:consultationId",
                element: (
                    <ProtectedRoute allowedRoles={['Admin', 'CustomerService']}>
                        <AdminConsultationDetails />
                    </ProtectedRoute>
                ),
            },
            {
                path: "contacts",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <AdminContacts />
                    </ProtectedRoute>
                ),
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute allowedRoles={['Admin', 'CustomerService']}>
                        <AdminProfile />
                    </ProtectedRoute>
                ),
            },

        ]
    },
    {
        path: '/',
        element: (
            <Suspense fallback={<LoadingPage />}>
                <ClientLayout />
            </Suspense>
        ),
        children: [
            {
                path: '/', element:
                    <ExcludeRoles>
                        <Landing />
                    </ExcludeRoles>
            },
            {
                path: '/servicespage', element:
                    <ExcludeRoles>
                        <LawServicesPage />
                    </ExcludeRoles>
            },
            {
                path: '/FAQClient', element:
                    <ExcludeRoles>
                        <FAQPage />
                    </ExcludeRoles>
            },
            {
                path: '/consultations', element:
                    <ExcludeRoles>
                        <ConsultantPage />
                    </ExcludeRoles>
            },
            {
                path: '/contactus', element:
                    <ExcludeRoles>
                        <ContactUs />
                    </ExcludeRoles>
            },

            {
                path: '/profile',
                element: (
                    <UserOnlyGuard>
                        <ClientProfile />
                    </UserOnlyGuard>
                )
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