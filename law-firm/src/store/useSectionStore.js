import { create } from "zustand";

export const useSectionsStore = create((set) => ({
    sections: [],

    setSections: (newSections) => set({ sections: newSections }),

    updateSection: (key, field, value) =>
        set((state) => ({
            sections: state.sections.map((section) =>
                section.key === key
                    ? {
                        ...section,
                        content: {
                            ...section.content,
                            [field === "contentAr" ? "ar" : "en"]: value,
                        },
                    }
                    : section
            ),
        })),

    resetSections: () => set({ sections: [] }),
}));
