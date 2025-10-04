import React, { useEffect } from "react";
import { useSections } from "../../../hooks/useSections";
import { useSectionsStore } from "../../../store/useSectionStore";
import SettingsPagePresentational from "./SettingsPagePresentational";

export default function SettingsPageContainer() {
    const { data, isLoading, isError, error } = useSections();
    const { sections, setSections, updateSection } = useSectionsStore();

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

    return (
        <SettingsPagePresentational
            isLoading={isLoading}
            isError={isError}
            error={error}
            sections={sections}
            onSectionChange={handleSectionChange}
            onSaveAll={handleSaveAll}
        />
    );
}
