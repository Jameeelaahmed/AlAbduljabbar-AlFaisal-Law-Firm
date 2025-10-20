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
import UnAuthorized from "../pages/UnAuthorized";

// lazy loaded components
const Dashboard = lazy(() => import("../pages/AdminPages/Dashboard/Dashboard"));
const AdminProfile = lazy(() => import("../pages/AdminPages/Profile/AdminProfile"));
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

// Newly lazy-loaded pages
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const LawServicesPage = lazy(() => import("../pages/ClientPages/ServicesPage/ServicesPage"));
const FAQPage = lazy(() => import("../pages/ClientPages/FAQ/FAQ"));
const ContactUs = lazy(() => import("../pages/ClientPages/ContactUs/ContactUs"));
const AdminContacts = lazy(() => import("../pages/AdminPages/Contacts/ContactsPage"));
const LoadingPage = lazy(() => import("../pages/LoadingPage/LoadingPage"));

// Simple inline fallback to avoid suspending the fallback itself
const InlineLoader = () => (
    <div className="w-full py-10 text-center text-gray-500">Loading...</div>
);

const routes = createBrowserRouter([
    {
        path: "/login",
        element: (
            <GuestOnlyGuard>
                <Suspense fallback={<InlineLoader />}>
                    <LoginRegister />
                </Suspense>
            </GuestOnlyGuard>
        ),
    },
    {
        path: "forget-password",
        element: (
            <GuestOnlyGuard>
                <Suspense fallback={<InlineLoader />}>
                    <ForgetPassword />
                </Suspense>
            </GuestOnlyGuard>
        )
    },
    {
        path: "verify-otp",
        element: (
            <VerifyOtpGuard>
                <Suspense fallback={<InlineLoader />}>
                    <VerifyOTP />
                </Suspense>
            </VerifyOtpGuard>
        )
    },
    {
        path: "reset-password",
        element: (
            <VerifyOtpGuard>
                <Suspense fallback={<InlineLoader />}>
                    <ResetPassword />
                </Suspense>
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
                <Suspense fallback={<InlineLoader />}>
                    <AdminLayout />
                </Suspense>
            </ProtectedRoute>
        ,
        children: [
            {
                path: "",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<InlineLoader />}>
                            <Dashboard />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "services",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<InlineLoader />}>
                            <AdminServices />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "consultationTypes",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<InlineLoader />}>
                            <ConsultationTypes />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "faq",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<InlineLoader />}>
                            <FAQ />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "settings",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<InlineLoader />}>
                            <AdminSettings />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "requests",
                element: (
                    <ProtectedRoute allowedRoles={['Admin', 'CustomerService']}>
                        <Suspense fallback={<InlineLoader />}>
                            <AdminRequests />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "requests/:requestId",
                element: (
                    <ProtectedRoute allowedRoles={['Admin', 'CustomerService']}>
                        <Suspense fallback={<InlineLoader />}>
                            <AdminRequestDetails />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "users",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<InlineLoader />}>
                            <AdminUsers />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "law-consultations",
                element: (
                    <ProtectedRoute allowedRoles={['Admin', 'CustomerService']}>
                        <Suspense fallback={<InlineLoader />}>
                            <AdminConsultations />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "law-consultations/:consultationId",
                element: (
                    <ProtectedRoute allowedRoles={['Admin', 'CustomerService']}>
                        <Suspense fallback={<InlineLoader />}>
                            <AdminConsultationDetails />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "contacts",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<InlineLoader />}>
                            <AdminContacts />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute allowedRoles={['Admin', 'CustomerService']}>
                        <Suspense fallback={<InlineLoader />}>
                            <AdminProfile />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },

        ]
    },
    {
        path: '/',
        element: (
            <Suspense fallback={<InlineLoader />}>
                <ClientLayout />
            </Suspense>
        ),
        children: [
            {
                path: '/', element:
                    <ExcludeRoles>
                        <Suspense fallback={<InlineLoader />}>
                            <Landing />
                        </Suspense>
                    </ExcludeRoles>
            },
            {
                path: '/servicespage', element:
                    <ExcludeRoles>
                        <Suspense fallback={<InlineLoader />}>
                            <LawServicesPage />
                        </Suspense>
                    </ExcludeRoles>
            },
            {
                path: '/FAQClient', element:
                    <ExcludeRoles>
                        <Suspense fallback={<InlineLoader />}>
                            <FAQPage />
                        </Suspense>
                    </ExcludeRoles>
            },
            {
                path: '/consultations', element:
                    <ExcludeRoles>
                        <Suspense fallback={<InlineLoader />}>
                            <ConsultantPage />
                        </Suspense>
                    </ExcludeRoles>
            },
            {
                path: '/contactus', element:
                    <ExcludeRoles>
                        <Suspense fallback={<InlineLoader />}>
                            <ContactUs />
                        </Suspense>
                    </ExcludeRoles>
            },

            {
                path: '/profile',
                element: (
                    <UserOnlyGuard>
                        <Suspense fallback={<InlineLoader />}>
                            <ClientProfile />
                        </Suspense>
                    </UserOnlyGuard>
                )
            }
        ]
    },
    // catch-all 404 route (must be last)
    {
        path: "*",
        element: (
            <Suspense fallback={<InlineLoader />}>
                <NotFoundPage />
            </Suspense>
        )
    }
])


export default function RoutesPages() {
    return <RouterProvider router={routes} />;
}