import api from '../api/axiosInstance'

export const fetchSliders = async () => {
    const response = await api.get('/api/Sliders/all');
    // Sort by order
    const sortedData = response.data.data.sort((a, b) => a.order - b.order);
    return sortedData;
};

export const getHomePageData = async () => {
    const { data: response } = await api.get("/api/Homepage");

    if (!response.isSuccess) {
        throw new Error(response?.error?.description || "Failed to add note");
    }

    return response.data;
}