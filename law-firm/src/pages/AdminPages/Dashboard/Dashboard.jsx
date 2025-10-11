import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Dashboard page
 * - Replace the mock data / counts with your real hooks (e.g. useAllRequests, useAllServices, useAllClients)
 * - Keeps RTL/LTR alignment based on i18n language (assumes "ar" = RTL)
 */
function Dashboard() {
    const { t, i18n } = useTranslation();
    const isRtl = (i18n?.language || document.documentElement.dir) === "ar";

    // TODO: replace these mocks with real data from your hooks / API
    const [requests] = useState([
        { id: 1, title: "طلب تسجيل شركة", client: "أحمد علي", branch: 2, status: "Open", date: "2024-01-15T10:00:00Z", activityCount: 8 },
        { id: 2, title: "تحديث بيانات الخدمة", client: "نور محمد", branch: 1, status: "Closed", date: "2024-01-14T15:30:00Z", activityCount: 5 },
        { id: 3, title: "استشارة قانونية", client: "سالم عبد", branch: [1, 2], status: "In Progress", date: "2024-01-13T09:15:00Z", activityCount: 12 },
        { id: 4, title: "طلب دعم", client: "ليلى حسن", branch: 1, status: "Open", date: "2024-01-12T02:45:00Z", activityCount: 3 },
        { id: 5, title: "انشاء تقرير", client: "خالد عمر", branch: 2, status: "Closed", date: "2024-01-11T11:20:00Z", activityCount: 7 },
    ]);
    const [services] = useState([
        { id: 1, name: "تأسيس شركة" },
        { id: 2, name: "استشارات" },
        { id: 3, name: "خدمات توثيق" },
    ]);
    const [clients] = useState([
        { id: 1, name: "أحمد علي" },
        { id: 2, name: "نور محمد" },
        { id: 3, name: "سالم عبد" },
        { id: 4, name: "ليلى حسن" },
    ]);
    const [customerServiceAgents] = useState([
        { id: 1, name: "Agent 1" },
        { id: 2, name: "Agent 2" }
    ]);

    const totalRequests = requests.length;
    const currentServices = services.length;
    const totalClients = clients.length;
    const customerServiceCount = customerServiceAgents.length;

    // normalize branch to numbers -> label
    const branchLabel = (raw) => {
        if (raw == null) return "unknown";
        if (Array.isArray(raw)) {
            const has1 = raw.includes(1) || raw.includes("1");
            const has2 = raw.includes(2) || raw.includes("2");
            if (has1 && has2) return "Both";
            if (has1) return "Egypt";
            if (has2) return "Saudi";
            return String(raw);
        }
        const s = String(raw).trim();
        if (s === "1") return "Egypt";
        if (s === "2") return "Saudi";
        if (s === "3") return "Both";
        return s;
    };

    const branchCounts = useMemo(() => {
        const counts = { Egypt: 0, Saudi: 0, Both: 0 };
        requests.forEach((r) => {
            const label = branchLabel(r.branch);
            if (label === "Egypt") counts.Egypt++;
            else if (label === "Saudi") counts.Saudi++;
            else if (label === "Both") counts.Both++;
        });
        return counts;
    }, [requests]);

    // most active requests by activityCount desc
    const mostActive = useMemo(() => {
        return [...requests].sort((a, b) => (b.activityCount || 0) - (a.activityCount || 0)).slice(0, 6);
    }, [requests]);

    const formatDate = (iso) => {
        try {
            const d = new Date(iso);
            return d.toLocaleString(i18n.language || undefined);
        } catch {
            return iso;
        }
    };

    const containerAlign = isRtl ? "text-right" : "text-left";

    return (
        <div className={`p-6 bg-gray-50 min-h-screen ${containerAlign}`}>
            <div className={`flex items-center justify-between mb-6 `}>
                <h1 className="text-2xl font-semibold">{t("Dashboard.Dashboard") || (isRtl ? "لوحة التحكم" : "Dashboard")}</h1>
            </div>

            {/* stats */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6`}>
                <StatCard label={t("Dashboard.Total Requests")} value={totalRequests} />
                <StatCard label={t("Dashboard.Current Services")} value={currentServices} />
                <StatCard label={t("Dashboard.Clients")} value={totalClients} />
                <StatCard label={t("Dashboard.Customer Service")} value={customerServiceCount} />
            </div>

            {/* main content: table + branch summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white shadow rounded p-4">
                    <h2 className="font-medium mb-4">{t("Dashboard.Most Active Requests")}</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="text-sm text-gray-500 border-b">
                                    <th className="py-2 px-3">{t("Dashboard.Date")}</th>
                                    <th className="py-2 px-3">{t("Dashboard.Activity")}</th>
                                    <th className="py-2 px-3">{t("Dashboard.Client")}</th>
                                    <th className="py-2 px-3">{t("Dashboard.Branch")}</th>
                                    <th className="py-2 px-3 text-right">{t("Dashboard.Count")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mostActive.map((r) => (
                                    <tr key={r.id} className="text-sm text-gray-700 border-b last:border-b-0">
                                        <td className="py-3 px-3 align-top">{formatDate(r.date)}</td>
                                        <td className="py-3 px-3 align-top">{r.title}</td>
                                        <td className="py-3 px-3 align-top">{r.client}</td>
                                        <td className="py-3 px-3 align-top">{isRtl ? (branchLabel(r.branch) === "Egypt" ? "مصر" : branchLabel(r.branch) === "Saudi" ? "المملكة العربية السعودية" : "كلاهما") : branchLabel(r.branch)}</td>
                                        <td className="py-3 px-3 align-top text-right">{r.activityCount ?? "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white shadow rounded p-4">
                    <h3 className="font-medium mb-4">{t("Dashboard.Requests by Branch")}</h3>
                    <div className="space-y-4">
                        <BarRow label={"Saudi"} count={branchCounts.Saudi} max={totalRequests} color="bg-amber-700" />
                        <BarRow label={"Egypt"} count={branchCounts.Egypt} max={totalRequests} color="bg-emerald-700" />
                        <BarRow label={"Both"} count={branchCounts.Both} max={totalRequests} color="bg-slate-400" />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* Small presentational components */

function StatCard({ label, value }) {
    return (
        <div className="bg-white rounded shadow p-4 flex items-center justify-between">
            <div>
                <div className="text-sm text-gray-500">{label}</div>
                <div className="text-2xl font-semibold mt-1">{value}</div>
            </div>
            <div className="text-gray-200 text-3xl font-bold opacity-30 select-none">{/* decorative */}</div>
        </div>
    );
}

function BarRow({ label, count, max = 1, color = "bg-emerald-500" }) {
    const pct = max > 0 ? Math.round((count / max) * 100) : 0;
    return (
        <div>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                <div>{label}</div>
                <div className="font-semibold">{count}</div>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded overflow-hidden">
                <div className={`${color} h-full`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}

export default Dashboard;
