import api from '../api/axiosInstance'

export const fetchSliders = async () => {
    const response = await api.get('/api/Sliders/all');
    // Sort by order
    const sortedData = response.data.data.sort((a, b) => a.order - b.order);
    return sortedData;
};