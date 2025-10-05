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
        <div className="p-6 bg-gray-50 shadow-lg">
            {/* Header */}
            <HeadlineContainer headlineLabel="إدارة المستخدمين" buttonLabel="إضافة مستخدم" buttonIcon="+" />

            {/* Filters & Search */}
            <div className="flex flex-wrap gap-4 mb-4 items-center">
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 cursor-pointer"
                >
                    <option value="">الدور</option>
                    <option value="مسؤول">مسؤول</option>
                    <option value="دعم">دعم</option>
                    <option value="عميل">عميل</option>
                </select>

                <select
                    value={branchFilter}
                    onChange={(e) => setBranchFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 cursor-pointer"
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
                    className="flex-1 border border-gray-300 rounded-lg p-2"
                />
            </div>

            {/* Users Table - Using GenericTableContainer */}
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
    );
}