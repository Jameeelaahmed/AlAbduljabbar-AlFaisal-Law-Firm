import { Upload, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const ImageUpload = ({ name, value, onChange, label = "Image" }) => {
    const [preview, setPreview] = useState('');

    // Update preview when value prop changes
    useEffect(() => {
        if (value) {
            // If value is a File object, create local preview
            if (value instanceof File) {
                const objectUrl = URL.createObjectURL(value);
                setPreview(objectUrl);
                // Cleanup object URL on unmount
                return () => URL.revokeObjectURL(objectUrl);
            } else {
                // If value is a URL string, use it directly
                setPreview(value);
            }
        } else {
            setPreview('');
        }
    }, [value]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size should be less than 5MB');
            return;
        }

        // Store the File object - will be uploaded on form save
        // Create local preview immediately
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        
        // Pass the File object to the form
        onChange(file);
    };

    const handleRemove = () => {
        setPreview('');
        onChange('');
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            
            {preview ? (
                <div className="relative inline-block">
                    <img 
                        src={preview} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id={`file-${name}`}
                    />
                    <label
                        htmlFor={`file-${name}`}
                        className="flex items-center justify-center gap-2 w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#003a42] hover:bg-gray-50 transition-colors"
                    >
                        <Upload size={20} className="text-gray-400" />
                        <span className="text-sm text-gray-600">
                            Click to select image
                        </span>
                    </label>
                </div>
            )}
            
            <p className="mt-1 text-xs text-gray-500">
                Supported formats: JPG, PNG, GIF. Max size: 5MB
            </p>
        </div>
    );
};
