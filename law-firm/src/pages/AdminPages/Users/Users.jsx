import { useState } from 'react';
import { useUsers } from "../../../hooks/useUsers";
import GenericTable from '../../../components/AdminComponents/Table/GenericTable';
import Headline from '../../../components/AdminComponents/Headline/Headline';

function Users() {
    const [search, setSearch] = useState("");
    const [branchFilter, setBranchFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");

    const tableColumns = [
        {
            key: "name",
            header: "اسم المستخدم",
        },
        {
            key: "email",
            header: "البريد الإلكتروني",
        },
        {
            key: "role",
            header: "الدور",
            render: (role) => (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary/10 text-secondary dark:bg-blue-900 dark:text-blue-200">
                    {role}
                </span>
            ),
        },
        {
            key: "branch",
            header: "الفرع",
        },
        {
            key: "status",
            header: "الحالة",
            render: (status) => (
                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${status === "نشط" || status === "active"
                        ? "bg-succeededBg text-succeeded dark:bg-succeededBg dark:text-succeeded"
                        : "bg-deniedBg text-denied dark:bg-deniedBg dark:text-denied"
                        }`}
                >
                    {status}
                </span>
            ),
        },
    ];

    const tableActions = [
        {
            label: "تعديل",
            onClick: (user) => {
                console.log("Edit user:", user);
                // Add your edit logic here
            },
            className: "text-gray-500 hover:bg-blue-50",
        },
        {
            label: "حذف",
            onClick: (user) => {
                console.log("Delete user:", user);
                // Add your delete logic here
            },
            className: "text-gray-500 hover:bg-red-50",
        },
    ];
    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-50 shadow-lg">
            {/* Header */}
            <Headline headlineLabel="إدارة المستخدمين" buttonLabel="إضافة مستخدم" buttonIcon="+" />

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 sm:p-3 cursor-pointer bg-white shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm sm:text-base w-full sm:w-auto min-w-[120px]"
                >
                    <option value="">الدور</option>
                    <option value="مسؤول">مسؤول</option>
                    <option value="دعم">دعم</option>
                    <option value="عميل">عميل</option>
                </select>

                <select
                    value={branchFilter}
                    onChange={(e) => setBranchFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 sm:p-3 cursor-pointer bg-white shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm sm:text-base w-full sm:w-auto min-w-[120px]"
                >
                    <option value="">الفرع</option>
                    <option value="الرياض">الرياض</option>
                    <option value="جدة">جدة</option>
                    <option value="الدمام">الدمام</option>
                    <option value="مكة">مكة</option>
                </select>

                <input
                    type="text"
                    placeholder="ابحث عن المستخدمين بالاسم، البريد الإلكتروني..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-2 sm:p-3 bg-white shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm sm:text-base placeholder:text-xs sm:placeholder:text-sm min-w-[250px] sm:min-w-[300px]"
                />
            </div>

            {/* Users Table - Using GenericTableContainer */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <GenericTable
                    useDataHook={useUsers}
                    columns={tableColumns}
                    actions={tableActions}
                    perPage={5}
                    filters={{
                        search,
                        branch: branchFilter,
                        role: roleFilter,
                    }}
                />
            </div>
        </div>
    )
}

export default Users
