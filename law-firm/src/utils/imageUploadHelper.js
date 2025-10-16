import { uploadMultipleImages } from '../api/upload';

/**
 * Collect all File objects from form values
 * @param {Object} values - Formik values object
 * @returns {Object} - { files: File[], paths: string[] }
 */
export const collectPendingImages = (values) => {
    const files = [];
    const paths = [];

    const traverse = (obj, currentPath = '') => {
        if (!obj || typeof obj !== 'object') return;

        for (const key in obj) {
            const value = obj[key];
            const path = currentPath ? `${currentPath}.${key}` : key;

            if (value instanceof File) {
                files.push(value);
                paths.push(path);
            } else if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    traverse(item, `${path}[${index}]`);
                });
            } else if (typeof value === 'object') {
                traverse(value, path);
            }
        }
    };

    traverse(values);
    return { files, paths };
};

/**
 * Upload all pending images and update form values with URLs
 * @param {Object} values - Formik values object
 * @param {Function} setFieldValue - Formik setFieldValue function
 * @param {string} folderName - Folder name for uploads
 * @returns {Promise<Object>} - Updated values with image URLs
 */
export const uploadPendingImages = async (values, setFieldValue, folderName = 'images') => {
    const { files, paths } = collectPendingImages(values);

    if (files.length === 0) {
        return values; // No images to upload
    }

    try {
        // Upload all images at once
        const result = await uploadMultipleImages(files, folderName);
        const urls = result.urls || result;

        // Update form values with URLs
        paths.forEach((path, index) => {
            setFieldValue(path, urls[index]);
        });

        return values;
    } catch (error) {
        console.error('Error uploading images:', error);
        throw error;
    }
};

/**
 * Check if there are any pending File objects in form values
 * @param {Object} values - Formik values object
 * @returns {boolean}
 */
export const hasPendingImages = (values) => {
    const { files } = collectPendingImages(values);
    return files.length > 0;
};
