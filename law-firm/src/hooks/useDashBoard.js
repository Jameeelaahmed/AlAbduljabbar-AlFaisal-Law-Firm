import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../api/dashboard";
import { useTranslation } from "react-i18next";

export const useDashboard = () => {
    const { i18n } = useTranslation()
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'
    return useQuery({
        queryKey: ["Dashboard", currentLang],
        queryFn: getDashboardData,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 5,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    })
}