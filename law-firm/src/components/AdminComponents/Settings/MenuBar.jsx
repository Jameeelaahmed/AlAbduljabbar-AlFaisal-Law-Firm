export const MenuBar = ({ editor }) => {
    if (!editor) return null;

    const buttonClass = "p-2 rounded hover:bg-gray-100 transition-colors";
    const activeClass = "bg-[#003a42] text-white hover:bg-[#004a52]";

    return (
        <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-200">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`${buttonClass} ${editor.isActive('bold') ? activeClass : ''}`}
                type="button"
            >
                <strong>B</strong>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`${buttonClass} ${editor.isActive('italic') ? activeClass : ''}`}
                type="button"
            >
                <em>I</em>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`${buttonClass} ${editor.isActive('underline') ? activeClass : ''}`}
                type="button"
            >
                <u>U</u>
            </button>
            <div className="w-px h-8 bg-gray-300 mx-1" />
            <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`${buttonClass} ${editor.isActive({ textAlign: 'left' }) ? activeClass : ''}`}
                type="button"
            >
                ←
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`${buttonClass} ${editor.isActive({ textAlign: 'center' }) ? activeClass : ''}`}
                type="button"
            >
                ↔
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`${buttonClass} ${editor.isActive({ textAlign: 'right' }) ? activeClass : ''}`}
                type="button"
            >
                →
            </button>
        </div>
    );
};