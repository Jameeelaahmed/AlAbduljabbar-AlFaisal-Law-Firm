import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDashboard } from "../../../hooks/useDashBoard";
import { Loading } from "../../../components/Common/Loading";

/**
 * Dashboard page
 * Displays key metrics and recent activity for the admin dashboard
 * - Uses real data from the API via useDashboard hook
 * - Supports RTL/LTR based on i18n language ("ar" = RTL)
 */
function Dashboard() {
    const { t, i18n } = useTranslation();
    const isRtl = (i18n?.language || document.documentElement.dir) === "ar";
    const { data: dashboardData, isLoading } = useDashboard();

    // Get branch name with localization
    const getBranchName = (branchId) => {
        const branches = {
            1: isRtl ? "مصر" : "Egypt",
            2: isRtl ? "المملكة العربية السعودية" : "Saudi Arabia",
            3: isRtl ? "كلاهما" : "Both"
        };
        return branches[branchId] || branchId;
    };

    // Format date based on current locale
    const formatDate = (isoString) => {
        if (!isoString) return '';
        try {
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            return new Date(isoString).toLocaleString(i18n.language || 'en-US', options);
        } catch (e) {
            console.error('Error formatting date:', e);
            return isoString;
        }
    };

    // Calculate branch statistics
    const branchStats = useMemo(() => {
        if (!dashboardData?.branchesRequestsAnalysis) return {};

        return dashboardData.branchesRequestsAnalysis.reduce((acc, branch) => {
            acc[branch.branchId] = {
                name: getBranchName(branch.branchId),
                count: branch.totalRequests
            };
            return acc;
        }, {});
    }, [dashboardData]);

    // Get total requests across all branches
    const totalRequests = useMemo(() => {
        if (!dashboardData?.branchesRequestsAnalysis) return 0;
        return dashboardData.branchesRequestsAnalysis.reduce((sum, branch) => sum + branch.totalRequests, 0);
    }, [dashboardData]);

    const containerAlign = isRtl ? "text-right" : "text-left";

    // Loading state
    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <div className={`p-6 bg-gray-50 min-h-screen ${containerAlign}`}>
            <div className={`flex items-center justify-between mb-6`}>
                <h1 className="text-2xl font-semibold">{t("Dashboard.Dashboard") || (isRtl ? "لوحة التحكم" : "Dashboard")}</h1>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6`}>
                <StatCard
                    label={t("Dashboard.Total Requests")}
                    value={dashboardData.totalRequests || 0}
                />
                <StatCard
                    label={t("Dashboard.Active Requests")}
                    value={dashboardData.activeRequests || 0}
                />
                <StatCard
                    label={t("Dashboard.Total Users")}
                    value={dashboardData.totalUsers || 0}
                />
                <StatCard
                    label={t("Dashboard.Customer Service")}
                    value={dashboardData.totalCustomerServices || 0}
                />
            </div>

            {/* Main content: table + branch summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Most Active Requests */}
                <div className="lg:col-span-2 bg-white shadow rounded p-4">
                    <h2 className="font-medium mb-4">{t("Dashboard.Most Active Requests")}</h2>
                    {dashboardData.mostActiveRequests?.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead>
                                    <tr className="text-sm text-gray-500 border-b">
                                        <th className="py-2 px-3">{t("Dashboard.Date")}</th>
                                        <th className="py-2 px-3">{t("Dashboard.Title")}</th>
                                        <th className="py-2 px-3">{t("Dashboard.Client")}</th>
                                        <th className="py-2 px-3">{t("Dashboard.Branch")}</th>
                                        <th className="py-2 px-3 text-right">{t("Dashboard.Notes")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dashboardData.mostActiveRequests.map((request) => (
                                        <tr key={request.id} className="text-sm text-gray-700 border-b last:border-b-0 hover:bg-gray-50">
                                            <td className="py-3 px-3 align-top whitespace-nowrap">
                                                {formatDate(request.createdAt)}
                                            </td>
                                            <td className="py-3 px-3 align-top max-w-xs truncate" title={request.title}>
                                                {request.title}
                                            </td>
                                            <td className="py-3 px-3 align-top">
                                                <div className="flex items-center">
                                                    {request.userPhoto && (
                                                        <img
                                                            src={request.userPhoto}
                                                            alt={request.userName}
                                                            className="w-6 h-6 rounded-full mr-2"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.style.display = 'none';
                                                            }}
                                                        />
                                                    )}
                                                    <span>{request.userName || 'N/A'}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-3 align-top">
                                                {getBranchName(request.branchId)}
                                            </td>
                                            <td className="py-3 px-3 align-top text-right">
                                                {request.notesCount || 0}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            {t("No active requests found")}
                        </div>
                    )}
                </div>

                {/* Branch Statistics */}
                <div className="bg-white shadow rounded p-4">
                    <h3 className="font-medium mb-4">{t("Dashboard.Requests by Branch")}</h3>
                    <div className="space-y-4">
                        {dashboardData.branchesRequestsAnalysis?.map((branch) => (
                            <BarRow
                                key={branch.branchId}
                                label={getBranchName(branch.branchId)}
                                count={branch.totalRequests}
                                max={totalRequests}
                                color={branch.branchId === 1 ? 'bg-emerald-700' : branch.branchId === 2 ? 'bg-amber-700' : 'bg-slate-400'}
                            />
                        ))}
                        {(!dashboardData.branchesRequestsAnalysis || dashboardData.branchesRequestsAnalysis.length === 0) && (
                            <div className="text-center py-4 text-gray-500">
                                {t("No branch data available")}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* Small presentational components */

function StatCard({ label, value, icon: Icon }) {
    return (
        <div className="bg-white rounded-lg shadow p-5 flex items-center justify-between border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div>
                <div className="text-sm text-gray-500 font-medium">{label}</div>
                <div className="text-2xl font-bold mt-1 text-gray-800">
                    {value?.toLocaleString() || '0'}
                </div>
            </div>
            {Icon && (
                <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                    <Icon className="w-6 h-6" />
                </div>
            )}
        </div>
    );
}

function BarRow({ label, count = 0, max = 1, color = "bg-emerald-500" }) {
    const pct = max > 0 ? Math.round((count / max) * 100) : 0;

    return (
        <div>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                <span className="font-medium">{label}</span>
                <div className="flex items-center">
                    <span className="font-semibold mr-1">{count}</span>
                    <span className="text-xs text-gray-400">
                        ({pct}%)
                    </span>
                </div>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`${color} h-full transition-all duration-500 ease-out`}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

export default Dashboard;
