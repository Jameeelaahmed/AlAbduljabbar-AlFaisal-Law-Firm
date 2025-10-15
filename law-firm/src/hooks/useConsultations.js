import { useQuery } from "@tanstack/react-query";
import { getAllUserConsultations } from "../api/consultations";

// 
export function useConsultations({ pageIndex = 1, pageSize = 5 } = {}) {
    return useQuery({
        queryKey: ["consultations", { pageIndex, pageSize }],
        queryFn: getAllUserConsultations,
        keepPreviousData: true,
    });
}