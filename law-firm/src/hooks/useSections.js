// hooks/useSections.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSections = async () => {
    const { data } = await axios.get("/data/sections.json");
    return Object.entries(data).map(([key, value]) => ({
        key,
        title: value.title,
        content: value.content,
    }));
};

export function useSections() {
    return useQuery({
        queryKey: ["sections"],
        queryFn: fetchSections,
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });
}
