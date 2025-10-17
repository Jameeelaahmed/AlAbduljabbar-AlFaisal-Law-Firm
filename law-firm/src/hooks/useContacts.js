import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { getContacts } from "../api/contacts";

export const useContacts = ({ pageIndex = 1, pageSize = 5 } = {}) => {
    const { i18n } = useTranslation()
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'

    return useQuery({
        queryKey: ['contacts', { pageIndex, pageSize },currentLang],
        queryFn: getContacts,
        keepPreviousData: true,
    });
}