import api from "./axiosInstance"
export const getAllUserConsultations = async ({ queryKey }) => {
    const [_key, { pageIndex = 1, pageSize = 5 }] = queryKey

    const { data: response } = await api.get("/api/UserConsultations/All", {
        params: { pageIndex, pageSize },
    });

    console.log(response);
    if (!response?.isSuccess) {
        throw new Error(response?.error?.description || "Failed to fetch requests");
    }

    return {
        data: response.data,
        meta: {
            current_page: pageIndex,
            page_size: pageSize,
            total_records: response.data.length,
            total_pages: Math.max(1, Math.ceil(response.data.length / pageSize)),
        },
    };
}