import React from "react";
import GenericTableContainer from "../../../components/AdminComponents/Table/GenericTableContainer";
import { useUsers } from "../../../hooks/useUsers";
import HeadlineContainer from "../../../components/AdminComponents/Headline/HeadlineContainer";

export default function UsersPagePresentational({
    setRoleFilter,
    setBranchFilter,
    setSearch,
    roleFilter,
    branchFilter,
    search,
    columns,
    actions,
}) {

    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-50 shadow-lg">
            {/* Header */}
            <HeadlineContainer headlineLabel="إدارة المستخدمين" buttonLabel="إضافة مستخدم" buttonIcon="+" />

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
                <GenericTableContainer
                    useDataHook={useUsers}
                    columns={columns}
                    actions={actions}
                    perPage={5}
                    filters={{
                        search,
                        branch: branchFilter,
                        role: roleFilter,
                    }}
                />
            </div>
        </div>
    );
}