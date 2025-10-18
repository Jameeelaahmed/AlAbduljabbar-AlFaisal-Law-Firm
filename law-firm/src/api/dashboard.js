import api from './axiosInstance';

export const getDashboardData = async () => {
    const { data:response } = await api.get('/api/Dashborad/Summary');
    if (!response.isSuccess) throw new Error('Failed to fetch data');
    
    return response.data;
};