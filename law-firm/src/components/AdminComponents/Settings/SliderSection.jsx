import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2, Edit, X, Save } from 'lucide-react';
import useSliders from '../../../hooks/useSliders';
import { toast } from 'react-toastify';

const SliderSection = () => {
  const { t } = useTranslation();
  const { sliders, isLoading, createSlider, updateSlider, deleteSlider } = useSliders();
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const validationSchema = Yup.object({
    titleEn: Yup.string().required(t('validation.required')),
    titleAr: Yup.string().required(t('validation.required')),
    descriptionEn: Yup.string().required(t('validation.required')),
    descriptionAr: Yup.string().required(t('validation.required')),
    order: Yup.number().required(t('validation.required')).positive(t('validation.positive')),
  });

  const formik = useFormik({
    initialValues: {
      titleEn: '',
      titleAr: '',
      descriptionEn: '',
      descriptionAr: '',
      order: 1,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = { ...values };
        
        if (imageFile) {
          // Handle image upload here if needed
          // formData.imageUrl = await uploadImage(imageFile);
        }

        if (editingId) {
          await updateSlider.mutateAsync({ id: editingId, ...formData });
          toast.success(t('slider.updated'));
        } else {
          await createSlider.mutateAsync(formData);
          toast.success(t('slider.created'));
        }

        resetForm();
        setEditingId(null);
        setImageFile(null);
        setImagePreview('');
      } catch (error) {
        toast.error(error.response?.data?.message || t('error.generic'));
      }
    },
  });

  const handleEdit = (slider) => {
    setEditingId(slider.id);
    formik.setValues({
      titleEn: slider.titleEn || '',
      titleAr: slider.titleAr || slider.title || '',
      descriptionEn: slider.descriptionEn || '',
      descriptionAr: slider.descriptionAr || slider.description || '',
      order: slider.order || 1,
    });
    if (slider.imageUrl) {
      setImagePreview(slider.imageUrl);
    }
  };

  const handleCancel = () => {
    formik.resetForm();
    setEditingId(null);
    setImageFile(null);
    setImagePreview('');
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('slider.confirmDelete'))) {
      try {
        await deleteSlider.mutateAsync(id);
        toast.success(t('slider.deleted'));
      } catch (error) {
        toast.error(error.response?.data?.message || t('error.generic'));
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">{t('slider.formTitle')}</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('slider.titleEn')} *
              </label>
              <input
                type="text"
                name="titleEn"
                value={formik.values.titleEn}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              {formik.touched.titleEn && formik.errors.titleEn && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.titleEn}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('slider.titleAr')} *
              </label>
              <input
                type="text"
                name="titleAr"
                value={formik.values.titleAr}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                dir="rtl"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              {formik.touched.titleAr && formik.errors.titleAr && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.titleAr}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('slider.descriptionEn')} *
              </label>
              <textarea
                name="descriptionEn"
                value={formik.values.descriptionEn}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              {formik.touched.descriptionEn && formik.errors.descriptionEn && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.descriptionEn}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('slider.descriptionAr')} *
              </label>
              <textarea
                name="descriptionAr"
                value={formik.values.descriptionAr}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                dir="rtl"
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              {formik.touched.descriptionAr && formik.errors.descriptionAr && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.descriptionAr}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('slider.order')} *
              </label>
              <input
                type="number"
                name="order"
                min="1"
                value={formik.values.order}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-24 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              {formik.touched.order && formik.errors.order && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.order}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('slider.image')}
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="slider-image-upload"
                />
                <label
                  htmlFor="slider-image-upload"
                  className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {t('common.chooseFile')}
                </label>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="ml-4 h-12 w-auto object-cover rounded"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <X className="h-4 w-4 mr-2" />
                {t('common.cancel')}
              </button>
            )}
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Save className="h-4 w-4 mr-2" />
              {editingId ? t('common.update') : t('common.add')}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">{t('slider.listTitle')}</h2>
        {sliders?.length === 0 ? (
          <p className="text-gray-500">{t('slider.noSliders')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('slider.image')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('slider.titleEn')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('slider.order')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('common.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sliders?.map((slider) => (
                  <tr key={slider.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {slider.imageUrl && (
                        <img
                          src={slider.imageUrl}
                          alt={slider.titleEn}
                          className="h-10 w-16 object-cover rounded"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {slider.titleEn || slider.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {slider.descriptionEn || slider.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {slider.order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(slider)}
                        className="text-primary-600 hover:text-primary-900 mr-4"
                        title={t('common.edit')}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(slider.id)}
                        className="text-red-600 hover:text-red-900"
                        title={t('common.delete')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderSection;
