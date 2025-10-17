import api from '../api/axiosInstance'

export const getContacts = async ({queryKey}) => {
    const [
        _key,
        { pageIndex = 1, pageSize = 5 },
    ] = queryKey;
    const { data:response } = await api.get('/api/ContactUsForms/all', { params: { PageIndex: pageIndex, PageSize: pageSize } });
    if (!response.isSuccess) throw new Error('Failed to fetch data');
    
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
    