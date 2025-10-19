import { useQuery } from "@tanstack/react-query";
import { fetchSliders } from '../api/landing';
import { useTranslation } from "react-i18next";
import { getHomePageData } from "../api/landing";


export const useSliders = () => {
    const { i18n } = useTranslation()
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'
    console.log("currentLang",currentLang)
    return useQuery({
        queryKey: ['sliders', currentLang],
        queryFn: fetchSliders,
        staleTime: 1000 * 60 * 30,
        cacheTime: 1000 * 60 * 60,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};

export const useHomePage = () => {
    const { i18n } = useTranslation()
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'
    return useQuery({
        queryKey: ["HomePage", currentLang],
        queryFn: getHomePageData,
        staleTime: 1000 * 60 * 30,
        cacheTime: 1000 * 60 * 60,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    })
}
