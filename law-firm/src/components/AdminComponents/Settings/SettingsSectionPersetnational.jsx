import { TiptapEditor } from "./TipTapEditor"
import { } from 'lucide-react'

export default function SettingsSectionPersetnational({ section, contentAr, contentEn, handleArChange, handleEnChange }) {
    return (
        <div className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6">
            <h2 className="text-2xl font-bold mb-6 text-secondary flex items-center gap-2">
                <span className="w-1 h-8 bg-secondary rounded-full"></span>
                {section?.title?.ar}
            </h2>


            {/* Arabic Editor */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    {/* <span className="text-2xl">📘</span> */}
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
                    {/* <span className="text-2xl">📗</span> */}
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
    )
}
