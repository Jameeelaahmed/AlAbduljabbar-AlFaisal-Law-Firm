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
const MyRequestDetails = lazy(() => import("../pages/ClientPages/Profile/MyRequestDetails"))
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
import Loading from "../components/Common/Loading";



const routes = createBrowserRouter([
    {
        path: "/login",
        element: (
            <GuestOnlyGuard>
                <Suspense fallback={<Loading />}>
                    <LoginRegister />
                </Suspense>
            </GuestOnlyGuard>
        ),
    },
    {
        path: "forget-password",
        element: (
            <GuestOnlyGuard>
                <Suspense fallback={<Loading />}>
                    <ForgetPassword />
                </Suspense>
            </GuestOnlyGuard>
        )
    },
    {
        path: "verify-otp",
        element: (
            <VerifyOtpGuard>
                <Suspense fallback={<Loading />}>
                    <VerifyOTP />
                </Suspense>
            </VerifyOtpGuard>
        )
    },
    {
        path: "reset-password",
        element: (
            <VerifyOtpGuard>
                <Suspense fallback={<Loading />}>
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
                <Suspense fallback={<Loading />}>
                    <AdminLayout />
                </Suspense>
            </ProtectedRoute>
        ,
        children: [
            {
                path: "",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<Loading />}>
                            <Dashboard />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "services",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<Loading />}>
                            <AdminServices />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "consultationTypes",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<Loading />}>
                            <ConsultationTypes />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "faq",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<Loading />}>
                            <FAQ />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "settings",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<Loading />}>
                            <AdminSettings />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "requests",
                element: (
                    <ProtectedRoute allowedRoles={['Admin', 'CustomerService']}>
                        <Suspense fallback={<Loading />}>
                            <AdminRequests />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "requests/:requestId",
                element: (
                    <ProtectedRoute allowedRoles={['Admin', 'CustomerService']}>
                        <Suspense fallback={<Loading />}>
                            <AdminRequestDetails />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "users",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<Loading />}>
                            <AdminUsers />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "law-consultations",
                element: (
                    <ProtectedRoute allowedRoles={['Admin', 'CustomerService']}>
                        <Suspense fallback={<Loading />}>
                            <AdminConsultations />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "law-consultations/:consultationId",
                element: (
                    <ProtectedRoute allowedRoles={['Admin', 'CustomerService']}>
                        <Suspense fallback={<Loading />}>
                            <AdminConsultationDetails />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "contacts",
                element: (
                    <ProtectedRoute allowedRoles={['Admin']}>
                        <Suspense fallback={<Loading />}>
                            <AdminContacts />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute allowedRoles={['Admin', 'CustomerService']}>
                        <Suspense fallback={<Loading />}>
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
            <Suspense fallback={<Loading />}>
                <ClientLayout />
            </Suspense>
        ),
        children: [
            {
                path: '/', element:
                    <ExcludeRoles>
                        <Suspense fallback={<Loading />}>
                            <Landing />
                        </Suspense>
                    </ExcludeRoles>
            },
            {
                path: '/servicespage', element:
                    <ExcludeRoles>
                        <Suspense fallback={<Loading />}>
                            <LawServicesPage />
                        </Suspense>
                    </ExcludeRoles>
            },
            {
                path: '/FAQClient', element:
                    <ExcludeRoles>
                        <Suspense fallback={<Loading />}>
                            <FAQPage />
                        </Suspense>
                    </ExcludeRoles>
            },
            {
                path: '/consultations', element:
                    <ExcludeRoles>
                        <Suspense fallback={<Loading />}>
                            <ConsultantPage />
                        </Suspense>
                    </ExcludeRoles>
            },
            {
                path: '/contactus', element:
                    <ExcludeRoles>
                        <Suspense fallback={<Loading />}>
                            <ContactUs />
                        </Suspense>
                    </ExcludeRoles>
            },

            {
                path: '/profile',
                element: (
                    <UserOnlyGuard>
                        <Suspense fallback={<Loading />}>
                            <ClientProfile />
                        </Suspense>
                    </UserOnlyGuard>
                )
            },
            {
                path: '/profile/myRequestDetails/:requestId',
                element: (
                    <UserOnlyGuard>
                        <Suspense fallback={<Loading />}>
                            <MyRequestDetails />
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
            <Suspense fallback={<Loading />}>
                <NotFoundPage />
            </Suspense>
        )
    }
])


export default function RoutesPages() {
    return <RouterProvider router={routes} />;
}