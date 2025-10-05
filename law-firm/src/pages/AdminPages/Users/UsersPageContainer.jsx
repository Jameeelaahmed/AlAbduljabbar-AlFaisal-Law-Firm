import { useState } from 'react';
import UsersPagePresentational from './UsersPagePresentational';

export default function UsersPageContainer() {
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
                        ? "bg-green-200 text-green-700 dark:bg-green-700 dark:text-white"
                        : "bg-red-200 text-red-700 dark:bg-red-700 dark:text-white"
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
        <UsersPagePresentational
            setBranchFilter={setBranchFilter}
            setRoleFilter={setRoleFilter}
            setSearch={setSearch}
            search={search}
            branchFilter={branchFilter}
            roleFilter={roleFilter}
            columns={tableColumns}
            actions={tableActions}
        />
    );
}