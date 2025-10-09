import { TiptapEditor } from "./TipTapEditor"

export default function SettingsSectionPersetnational({ section, contentAr, contentEn, handleArChange, handleEnChange }) {
    return (
        <div className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6">
            <h2 className="text-2xl font-bold mb-6 text-secondary flex items-center gap-2">
                {section?.title?.ar}
            </h2>
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Arabic Editor */}
                <div className="mb-6 lg:w-1/2">
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
                <div className="lg:w-1/2">
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
        </div>
    )
}
