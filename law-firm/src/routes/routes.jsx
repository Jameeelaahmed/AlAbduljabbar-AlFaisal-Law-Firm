// libs
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoutes";
import VerifyOtpGuard from "./VerifyOtpGuard";
//layout components

import AdminLayout from "../layouts/AdminLayout";
import ClientLayout from "../layouts/ClientLayout";
const Dashboard = lazy(() => import("../pages/AdminPages/Dashboard/Dashboard"));
import NotFoundPage from "../pages/NotFoundPage";
import UnAuthorized from "../pages/UnAuthorized";
import LawServicesPage from "../pages/ClientPages/ServicesPage/ServicesPage";
import FAQPage from "../pages/ClientPages/FAQ/FAQ";
import ContactUs from "../pages/ClientPages/ContactUs/ContactUs";

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
const AdminContacts = lazy(() => import("../pages/AdminPages/Contacts/ContactsPage"));

const routes = createBrowserRouter([
    {
        path: "/login",
        element: <LoginRegister />,
    },
    {
        path: "forget-password",
        element: <ForgetPassword />
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
                path: "consultationTypes",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<div>Loading Consultation Types...</div>}>
                            <ConsultationTypes />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "faq",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<div>Loading Faq...</div>}>
                            <FAQ />
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
                    <ProtectedRoute allowedRoles={['Admin', 'CustomerService']}>
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
            {
                path: "law-consultations",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<div>Loading Settings...</div>}>
                            <AdminConsultations />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "law-consultations/:consultationId",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<div>Loading Request Details...</div>}>
                            < AdminConsultationDetails />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "contacts",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<div>Loading Request Details...</div>}>
                            < AdminContacts />
                        </Suspense>
                    </ProtectedRoute>
                )
            }
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
            },
            {
                path: '/servicespage', element:
                    // <ProtectedRoute allowedRoles={['User']}>
                    <LawServicesPage />
                // </ProtectedRoute>
            },
            {
                path: '/FAQClient', element:
                    // <ProtectedRoute allowedRoles={['User']}>
                    <FAQPage />
                // </ProtectedRoute>
            },
            {
                path: '/consultations', element:
                    // <ProtectedRoute allowedRoles={['User']}>
                    <ConsultantPage />
                // </ProtectedRoute>
            },
            {
                path: '/contactus', element:
                    // <ProtectedRoute allowedRoles={['User']}>
                    <ContactUs />
                // </ProtectedRoute>
            },

            {
                path: '/profile',
                element: <ClientProfile />
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