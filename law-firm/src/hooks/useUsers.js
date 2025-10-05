import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async ({ queryKey }) => {
    const [_key, { page, perPage }] = queryKey;
    const { data } = await axios.get("/data/users.json");
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

export function useUsers({ page = 1, perPage = 5 }) {
    return useQuery({
        queryKey: ["users", { page, perPage }],
        queryFn: fetchUsers,
        keepPreviousData: true,
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
}
