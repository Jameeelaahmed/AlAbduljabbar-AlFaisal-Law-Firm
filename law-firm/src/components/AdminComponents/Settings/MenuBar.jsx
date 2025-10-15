import {
    Bold,
    Italic,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Link2,
    Undo,
    Redo,
} from "lucide-react";

export const MenuBar = ({ editor }) => {
    if (!editor) return null;

    const addLink = () => {
        const url = window.prompt("Enter URL:");
        if (url) {
            let formattedUrl = url;
            if (!/^https?:\/\//i.test(url)) {
                formattedUrl = 'https://' + url;
            }
            editor.chain().focus().setLink({ href: formattedUrl }).run();
        }
    };

    const buttonClass = (isActive) =>
        `cursor-pointer p-2.5 rounded-lg hover:bg-gray-100 transition-all duration-200 ${isActive
            ? "bg-blue-100 text-blue-600"
            : "text-gray-600 hover:text-gray-900"
        }`;

    return (
        <div className="flex flex-wrap items-center gap-1 p-3 bg-gradient-to-r from-gray-50 to-gray-100">
            {/* Text formatting */}
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={buttonClass(editor.isActive("bold"))}
                title="Bold (Ctrl+B)"
                type="button"
            >
                <Bold size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={buttonClass(editor.isActive("italic"))}
                title="Italic (Ctrl+I)"
                type="button"
            >
                <Italic size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={buttonClass(editor.isActive("underline"))}
                title="Underline (Ctrl+U)"
                type="button"
            >
                <span className="font-bold underline text-sm">U</span>
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Lists */}
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={buttonClass(editor.isActive("bulletList"))}
                title="Bullet List"
                type="button"
            >
                <List size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={buttonClass(editor.isActive("orderedList"))}
                title="Numbered List"
                type="button"
            >
                <ListOrdered size={18} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Alignment */}
            <button
                onClick={() => editor.chain().focus().setTextAlign("right").run()}
                className={buttonClass(editor.isActive({ textAlign: "right" }))}
                title="Align Right"
                type="button"
            >
                <AlignRight size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign("center").run()}
                className={buttonClass(editor.isActive({ textAlign: "center" }))}
                title="Align Center"
                type="button"
            >
                <AlignCenter size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
                className={buttonClass(editor.isActive({ textAlign: "left" }))}
                title="Align Left"
                type="button"
            >
                <AlignLeft size={18} />
            </button>


            <div className="w-px h-6 bg-gray-300 mx-1" />
            {/* Links */}
            <button
                onClick={addLink}
                className={buttonClass(editor.isActive("link"))}
                title="Add Link"
                type="button"
            >
                <Link2 size={18} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Undo/Redo */}
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className={`${buttonClass(false)} disabled:opacity-30 disabled:cursor-not-allowed`}
                title="Undo (Ctrl+Z)"
                type="button"
            >
                <Undo size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className={`${buttonClass(false)} disabled:opacity-30 disabled:cursor-not-allowed`}
                title="Redo (Ctrl+Y)"
                type="button"
            >
                <Redo size={18} />
            </button>

            {/* ───────── FONT SIZE DROPDOWN ───────── */}
            <div className="ml-auto flex items-center gap-1">
                <select
                    onChange={(e) =>
                        editor.chain().focus().setFontSize(e.target.value).run()
                    }
                    value={editor.getAttributes("textStyle").fontSize || "16px"}
                    className="p-1 bg-tranparent text-gray-700"
                    title="Font Size"
                >
                    <option value="12px">12</option>
                    <option value="14px">14</option>
                    <option value="16px">16</option>
                    <option value="18px">18</option>
                    <option value="20px">20</option>
                    <option value="24px">24</option>
                    <option value="28px">28</option>
                </select>
            </div>
        </div>
    );
};
