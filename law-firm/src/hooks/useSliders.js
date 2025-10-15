import { useQuery } from "@tanstack/react-query";
import { fetchSliders } from '../api/landing'
export const useSliders = () => {
    return useQuery({
        queryKey: ['sliders'],
        queryFn: fetchSliders,
        staleTime: 1000 * 60 * 30,
        cacheTime: 1000 * 60 * 60,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};
