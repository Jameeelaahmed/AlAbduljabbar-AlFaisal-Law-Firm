import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axiosInstance';
import { useTranslation } from "react-i18next";
import { fetchSliders } from '../api/landing';

export const useSliders = () => {
  const queryClient = useQueryClient();
  const { i18n } = useTranslation()
  const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'

  // Get all sliders
  const { data: sliders, isLoading, error } = useQuery({
    queryKey: ['sliders', currentLang],
    queryFn: fetchSliders,
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  // Create slider
  const createSlider = useMutation({
    mutationFn: async (sliderData) => {
      console.log(sliderData);
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
