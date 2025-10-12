import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import CharacterCount from "@tiptap/extension-character-count";
import { useEffect } from "react";
import { MenuBar } from "./MenuBar";
import { FontSize, TextStyle } from "@tiptap/extension-text-style";

export const TiptapEditor = ({ content, onChange, placeholder, dir = "ltr" }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Link.configure({
                openOnClick: false,
            }),
            CharacterCount,
            TextStyle,
            FontSize
        ],
        content: content || "<p></p>",
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content || "<p></p>");
        }
    }, [content, editor]);

    const charCount = editor?.storage.characterCount.characters() || 0;
    const wordCount = editor?.storage.characterCount.words() || 0;

    return (
        <div className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <MenuBar editor={editor} />
            <div dir={dir} className="p-4 min-h-[180px] bg-white">
                <EditorContent
                    editor={editor}
                    className="outline-none prose prose-sm max-w-none focus-within:prose-blue"
                />
            </div>
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <div className="flex gap-4">
                    <span className="font-medium">
                        <span className="text-gray-700">{charCount}</span> characters
                    </span>
                    <span className="font-medium">
                        <span className="text-gray-700">{wordCount}</span> words
                    </span>
                </div>
                {placeholder && !editor?.getText() && (
                    <span className="text-gray-400 italic">{placeholder}</span>
                )}
            </div>
        </div>
    );
};