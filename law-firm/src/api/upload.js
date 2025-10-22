import api from "./axiosInstance";

/**
 * Upload an image file to the server
 * @param {File} file - The image file to upload
 * @param {string} folderName - The folder name to store the image (default: 'images')
 * @returns {Promise<{url: string}>} - The uploaded image URL
 */
export const uploadImage = async (file, folderName = 'images') => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await api.post(`/api/General/UploadFile?FolderName=${folderName}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // API returns: { isSuccess: true, data: { url: "string" }, error: {...}, status: 1 }
        if (response.data.isSuccess) {
            // Ensure we return the full URL
            const imageUrl = response.data.data?.url || '';

            // If the URL is already a full URL, return it as is
            if (imageUrl.startsWith('http')) {
                return imageUrl;
            }

            // Otherwise, construct the full URL using the base URL from the axios instance
            const baseUrl = api.defaults.baseURL || window.location.origin;
            const fullUrl = imageUrl.startsWith('/')
                ? `${baseUrl}${imageUrl}`
                : `${baseUrl}/${imageUrl}`;
            return fullUrl;
        } else {
            throw new Error(response.data.error?.description || 'Upload failed');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

/**
 * Upload multiple images to the server
 * @param {File[]} files - Array of image files to upload
 * @param {string} folderName - The folder name to store the images (default: 'images')
 * @returns {Promise<{urls: string[]}>} - Array of uploaded image URLs
 */
export const uploadMultipleImages = async (files, folderName = 'images') => {
    const formData = new FormData();

    // Append all files to FormData
    files.forEach((file) => {
        formData.append('files', file);
    });

    const response = await api.post(`/api/General/UploadMultipleImages?FolderName=${folderName}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    // API returns: { isSuccess: true, data: { urls: [...] }, error: {...}, status: 1 }
    if (response.data.isSuccess) {
        return response.data.data;
    } else {
        throw new Error(response.data.error?.description || 'Upload failed');
    }
};

/**
 * Delete an image from the server
 * @param {string} imageUrl - The URL of the image to delete
 * @returns {Promise<void>}
 */
export const deleteImage = async (imageUrl) => {
    const response = await api.delete('/api/Upload/Image', {
        data: { imageUrl }
    });

    return response.data;
};
