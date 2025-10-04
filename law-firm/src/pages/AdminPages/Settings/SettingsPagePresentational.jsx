import React from "react";
import SettingsSectionContainer from "../../../components/AdminComponents/Settings/SettingsSectionContainer";

export default function SettingsPagePresentational({
    isLoading,
    isError,
    error,
    sections,
    onSectionChange,
    onSaveAll,
}) {
    if (isLoading) {
        return (
            <div className="p-8 flex justify-center items-center min-h-screen">
                <div className="text-xl text-gray-600">جاري التحميل...</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-8">
                <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg">
                    <p className="font-semibold">خطأ في تحميل البيانات</p>
                    <p className="text-sm mt-1">{error?.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-10">
            <h1 className="text-3xl font-bold text-primary">إدارة محتوى الصفحة</h1>

            <div className="space-y-8">
                {sections.map((section) => (
                    <SettingsSectionContainer
                        key={section.key}
                        section={section}
                        onChange={onSectionChange}
                    />
                ))}
            </div>

            <div className="flex justify-end">
                <button
                    onClick={onSaveAll}
                    className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/80 transition"
                >
                    حفظ جميع التغييرات
                </button>
            </div>
        </div>
    );
}
