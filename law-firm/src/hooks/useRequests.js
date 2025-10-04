import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchRequests = async ({ queryKey }) => {
    const [_key, { page, perPage }] = queryKey;
    const { data } = await axios.get("/data/requests.json");
    const start = (page - 1) * perPage;
    const end = start + perPage;

    return {
        data: data.data.slice(start, end),
        meta: {
            ...data.meta,
            current_page: page,
            total_pages: Math.ceil(data.meta.total_records / perPage)
        }
    };
};

export function useRequests({ page = 1, perPage = 5 }) {
    return useQuery({
        queryKey: ["requests", { page, perPage }],
        queryFn: fetchRequests,
        keepPreviousData: true,
        staleTime: 1000 * 60 * 2,
    });
}
