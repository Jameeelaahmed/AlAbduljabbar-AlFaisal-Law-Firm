# Image Upload Implementation

## Overview
All photo URL text inputs have been replaced with a modern image upload component that handles file uploads through the backend API.

## Components Updated

### 1. **BaseOfSuccessSection.jsx**
- Replaced Photo URL text input with ImageUpload component
- Handles image uploads for success base items

### 2. **CoreValuesSection.jsx**
- Replaced Photo URL text input with ImageUpload component
- Handles image uploads for core value items

### 3. **LawyersSection.jsx**
- Replaced Photo URL text input with ImageUpload component
- Handles image uploads for lawyer profile photos

## New Files Created

### 1. **ImageUpload.jsx** (`/src/components/AdminComponents/Settings/ImageUpload.jsx`)
A reusable image upload component with:
- **Drag & drop interface** - Click to upload functionality
- **Image preview** - Shows uploaded image with remove button
- **File validation** - Checks file type (images only) and size (max 5MB)
- **Loading state** - Shows "Uploading..." during upload
- **Error handling** - Displays toast notifications for errors
- **Success feedback** - Shows success message on upload

### 2. **upload.js** (`/src/api/upload.js`)
API service for image operations:
- `uploadImage(file)` - Uploads image to `/api/Upload/Image`
- `deleteImage(imageUrl)` - Deletes image from server

## Features

### Image Upload Component
- ✅ File type validation (images only)
- ✅ File size validation (max 5MB)
- ✅ Image preview with thumbnail
- ✅ Remove uploaded image
- ✅ Loading state during upload
- ✅ Toast notifications for success/error
- ✅ Integrates with Formik forms
- ✅ Uses axios instance with authentication

### Backend Integration
- Endpoint: `POST /api/General/UploadFile?FolderName={folderName}`
- Content-Type: `multipart/form-data`
- Authentication: Bearer token (automatic via axios interceptor)
- Default folder: `images`
- Response: 
  ```json
  {
    "isSuccess": true,
    "data": {
      "url": "string"
    },
    "error": {
      "description": "string"
    },
    "status": 1
  }
  ```

## Usage Example

```jsx
<ImageUpload
    name="entitySettings.coreValues[0].photoUrl"
    value={value.photoUrl}
    onChange={(url) => formik.setFieldValue('entitySettings.coreValues[0].photoUrl', url)}
    label="Photo"
/>
```

## Backend Requirements

The backend endpoint is already implemented:

```
POST /api/General/UploadFile?FolderName={folderName}
Content-Type: multipart/form-data
Authorization: Bearer {token}

Query Parameters:
- FolderName: string (default: "images")

Body:
- file: binary (image file)

Response:
{
  "isSuccess": true,
  "data": {
    "url": "https://your-cdn.com/images/uploaded-image.jpg"
  },
  "error": {
    "description": "string"
  },
  "status": 1
}
```

## Notes

- All image uploads are handled through the centralized axios instance
- Authentication tokens are automatically included in requests
- Toast notifications provide user feedback
- The component syncs with Formik form state
- Images are validated before upload to prevent unnecessary API calls
