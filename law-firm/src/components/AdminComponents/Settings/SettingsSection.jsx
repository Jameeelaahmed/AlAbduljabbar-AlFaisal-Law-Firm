import { useState } from "react";
import { TiptapEditor } from "./TipTapEditor"

export default function SettingsSection({ section, onChange }) {
    const [contentAr, setContentAr] = useState(section?.content.ar || "");
    const [contentEn, setContentEn] = useState(section?.content.en || "");

    const handleArChange = (html) => {
        setContentAr(html);
        if (onChange) {
            onChange(section.key, "contentAr", html);
        }
    };

    const handleEnChange = (html) => {
        setContentEn(html);
        if (onChange) {
            onChange(section.key, "contentEn", html);
        }
    };

    return (
        <div className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6">
            <h2 className="text-2xl font-bold mb-6 text-secondary flex items-center gap-2">
                {section?.title?.ar}
            </h2>

            {/* Arabic Editor */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <label className="font-semibold text-secondary text-lg">Arabic Content</label>
                </div>
                <TiptapEditor
                    content={contentAr}
                    onChange={handleArChange}
                    placeholder="اكتب المحتوى هنا..."
                    dir="rtl"
                />
            </div>

            {/* English Editor */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <label className="font-semibold text-secondary text-lg">English Content</label>
                </div>
                <TiptapEditor
                    content={contentEn}
                    onChange={handleEnChange}
                    placeholder="Write content here..."
                    dir="ltr"
                />
            </div>
        </div>
    );
}