// extensions/FontSize.js
import { Extension } from '@tiptap/core'

export const FontSize = Extension.create({
    name: 'fontSize',

    addGlobalAttributes() {
        return [
            {
                types: ['textStyle'],
                attributes: {
                    fontSize: {
                        default: null,
                        renderHTML: attributes => {
                            if (!attributes.fontSize) return {}
                            return { style: `font-size: ${attributes.fontSize}` }
                        },
                        parseHTML: element => element.style.fontSize || null,
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setFontSize:
                size =>
                    ({ chain }) => {
                        return chain().setMark('textStyle', { fontSize: size }).run()
                    },
            unsetFontSize:
                () =>
                    ({ chain }) => {
                        return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run()
                    },
        }
    },
})
