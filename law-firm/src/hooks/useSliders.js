import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axiosInstance';

export const useSliders = () => {
  const queryClient = useQueryClient();

  // Get all sliders
  const { data: sliders, isLoading, error } = useQuery({
    queryKey: ['sliders'],
    queryFn: async () => {
      const { data } = await api.get('/api/Sliders/all');
      return data.data;
    },
  });

  // Create slider
  const createSlider = useMutation({
    mutationFn: async (sliderData) => {
      const { data } = await api.post('/api/Sliders/Create', sliderData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sliders']);
    },
  });

  // Update slider
  const updateSlider = useMutation({
    mutationFn: async ({ id, ...sliderData }) => {
      const { data } = await api.put(`/api/Sliders/${id}`, sliderData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sliders']);
    },
  });

  // Delete slider
  const deleteSlider = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/api/Sliders/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sliders']);
    },
  });

  return {
    sliders,
    isLoading,
    error,
    createSlider,
    updateSlider,
    deleteSlider,
  };
};

export default useSliders;
