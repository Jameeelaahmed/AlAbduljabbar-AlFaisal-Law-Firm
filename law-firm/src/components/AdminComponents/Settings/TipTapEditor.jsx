import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useFormik, FormikProvider } from 'formik';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import CharacterCount from '@tiptap/extension-character-count';
import { Upload, Plus, Trash2, Save, AlertCircle, CheckCircle } from 'lucide-react';

// TiptapEditor Component
const TiptapEditor = ({ content, onChange, placeholder, dir = 'ltr' }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
            }),
            CharacterCount,
        ],
        content: content || '<p></p>',
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    React.useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content || '<p></p>');
        }
    }, [content, editor]);

    const charCount = editor?.storage.characterCount.characters() || 0;
    const wordCount = editor?.storage.characterCount.words() || 0;

    return (
        <div className="rounded-lg overflow-hidden bg-white border border-gray-200">
            <MenuBar editor={editor} />
            <div dir={dir} className="p-4 min-h-[180px] bg-white">
                <EditorContent
                    editor={editor}
                    className="outline-none prose prose-sm max-w-none"
                />
            </div>
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <div className="flex gap-4">
                    <span>
                        <span className="text-gray-700 font-medium">{charCount}</span> characters
                    </span>
                    <span>
                        <span className="text-gray-700 font-medium">{wordCount}</span> words
                    </span>
                </div>
            </div>
        </div>
    );
};