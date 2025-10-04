import { useState } from "react";
import SettingsSectionPersetnational from "./SettingsSectionPersetnational";

export default function SettingsSectionContainer({ section, onChange }) {
    console.log(section)
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
        <SettingsSectionPersetnational
            section={section}
            onChange={onChange}
            contentAr={contentAr}
            contentEn={contentEn}
            handleArChange={handleArChange}
            handleEnChange={handleEnChange}
        />
    );
}