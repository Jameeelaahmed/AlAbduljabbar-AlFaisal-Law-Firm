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
      console.log('Creating slider with data:', sliderData);
      try {
        // Prepare the payload with PascalCase field names
        const payload = {
          TitleEn: sliderData.titleEn,
          TitleAr: sliderData.titleAr,
          DescriptionEn: sliderData.descriptionEn,
          DescriptionAr: sliderData.descriptionAr,
          Order: sliderData.order,
          ImageUrl: sliderData.imageUrl // This should already be a string URL from the upload
        };
        
        console.log('Sending slider payload:', JSON.stringify(payload, null, 2));
        const { data } = await api.post('/api/Sliders/Create', payload);
        console.log('Slider created successfully:', data);
        return data;
      } catch (error) {
        console.error('Error creating slider:', error.response?.data || error.message);
        // Extract and format validation errors if they exist
        if (error.response?.data?.errors) {
          const errorMessages = Object.entries(error.response.data.errors)
            .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
            .join('\n');
          throw new Error(`Validation failed: ${errorMessages}`);
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sliders']);
    },
  });

  // Update slider
  const updateSlider = useMutation({
    mutationFn: async ({ id, ...sliderData }) => {
      try {
        // Prepare the payload with PascalCase field names
        const payload = {
          TitleEn: sliderData.titleEn,
          TitleAr: sliderData.titleAr,
          DescriptionEn: sliderData.descriptionEn,
          DescriptionAr: sliderData.descriptionAr,
          Order: sliderData.order,
          ImageUrl: sliderData.imageUrl // This should already be a string URL from the upload
        };

        console.log('Updating slider with payload:', JSON.stringify(payload, null, 2));
        const { data } = await api.put(`/api/Sliders/${id}`, payload);
        console.log('Slider updated successfully:', data);
        return data;
      } catch (error) {
        console.error('Error updating slider:', error.response?.data || error.message);
        // Extract and format validation errors if they exist
        if (error.response?.data?.errors) {
          const errorMessages = Object.entries(error.response.data.errors)
            .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
            .join('\n');
          throw new Error(`Validation failed: ${errorMessages}`);
        }
        throw error;
      }
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

  // Fetch a single slider by ID
  const fetchSliderById = async (id) => {
    try {
      const { data } = await api.get(`/api/Sliders/update/${id}`);
      if (data.isSuccess) {
        return data.data; // Return the slider data
      }
      throw new Error(data.error?.description || 'Failed to fetch slider');
    } catch (error) {
      console.error('Error fetching slider:', error);
      throw error;
    }
  };

  return {
    sliders,
    isLoading,
    error,
    createSlider,
    updateSlider,
    deleteSlider,
    fetchSliderById,
  };
};

export default useSliders;
