import React from "react";
import GenericTablePresentational from "../../../components/AdminComponents/Table/GenericTablePresentational";

export default function UsersPagePresentational({
    setRoleFilter,
    setBranchFilter,
    setSearch,
    roleFilter,
    branchFilter,
    search,
    users,
    meta,
    currentPage,
    perPage,
    handlePageChange,
    isLoading,
}) {
    // Define columns for users table
    const columns = [
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

    // Define actions for users table
    const actions = [
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
            className: "text-gray-500 hover:bg-blue-50",
        },
    ];

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
                <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/80">
                    <span>إضافة مستخدم</span> <span className="text-xl">+</span>
                </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-wrap gap-4 mb-4 items-center">
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="border rounded-lg p-2"
                >
                    <option value="">الدور</option>
                    <option value="مسؤول">مسؤول</option>
                    <option value="دعم">دعم</option>
                    <option value="عميل">عميل</option>
                </select>

                <select
                    value={branchFilter}
                    onChange={(e) => setBranchFilter(e.target.value)}
                    className="border rounded-lg p-2"
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
                    className="flex-1 border rounded-lg p-2"
                />
            </div>

            {/* Users Table - Using Generic Table Component */}
            <GenericTablePresentational
                items={users}
                columns={columns}
                actions={actions}
                meta={meta}
                currentPage={currentPage}
                perPage={perPage}
                handlePageChange={handlePageChange}
                loading={isLoading}
            />
        </div>
    );
}