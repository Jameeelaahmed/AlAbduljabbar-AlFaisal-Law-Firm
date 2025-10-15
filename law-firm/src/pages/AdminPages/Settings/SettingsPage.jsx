import { useEffect } from "react";
import { useSections } from "../../../hooks/useSections";
import { useSectionsStore } from "../../../store/useSectionStore";
import SettingsSection from "../../../components/AdminComponents/Settings/SettingsSection";

import { useTranslation } from "react-i18next";
export default function SettingsPage() {
    const { data, isLoading, isError, error } = useSections();
    const { sections, setSections, updateSection } = useSectionsStore();
    const { t } = useTranslation();
    //* Sync fetched data into Zustand once
    useEffect(() => {
        if (data) setSections(data);
    }, [data, setSections]);

    const handleSectionChange = (key, field, value) => {
        updateSection(key, field, value);
    };

    const handleSaveAll = () => {
        console.log("Saving all sections:", sections);
        // TODO: add axios mutation here
    };
    if (isLoading) {
        return (
            <div className="p-8 flex justify-center items-center min-h-screen">
                <div className="text-xl text-gray-600">{t("Loading...")}</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-8">
                <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg">
                    <p className="font-semibold">خطأ  تحميل البيانات</p>
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
                    <SettingsSection
                        key={section.key}
                        section={section}
                        onChange={handleSectionChange}
                    />
                ))}
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleSaveAll}
                    className="bg-primary cursor-pointer text-white px-8 py-3 rounded-lg hover:bg-primary/80 transition"
                >
                    حفظ جميع التغييرات
                </button>
            </div>
        </div>
    );
}
