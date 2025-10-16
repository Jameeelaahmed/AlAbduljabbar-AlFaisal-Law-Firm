# Optimized Image Upload Implementation

## Overview
Images are now handled with the following optimizations:
1. **Local Preview** - Images show immediately without uploading
2. **Batch Upload** - All images upload together when form is saved
3. **Unsaved Changes Warning** - Users are warned before leaving with unsaved changes

## How It Works

### 1. Image Selection
When a user selects an image:
- File is validated (type and size)
- Local preview is created using `URL.createObjectURL()`
- File object is stored in Formik state (not uploaded yet)
- User sees the image immediately

### 2. Form Submission
When user clicks "Save Changes":
1. All File objects are collected from form values
2. Files are uploaded in a single batch request to `/api/General/UploadMultipleImages`
3. Returned URLs replace File objects in form values
4. Updated form data is submitted to backend
5. Success notification is shown

### 3. Unsaved Changes Protection
- Browser warns before closing/refreshing tab
- Navigation attempts show confirmation dialog
- Warning is cleared after successful save

## Files Modified

### Components
- **ImageUpload.jsx** - Shows local preview, stores File objects
- **BaseOfSuccessSection.jsx** - Uses ImageUpload component
- **CoreValuesSection.jsx** - Uses ImageUpload component
- **LawyersSection.jsx** - Uses ImageUpload component

### Pages
- **SettingsPage.jsx** - Handles batch upload and unsaved changes

### New Files
- **utils/imageUploadHelper.js** - Batch upload utilities
- **hooks/useUnsavedChanges.js** - Unsaved changes hooks
- **api/upload.js** - Updated with `uploadMultipleImages()`

## API Integration

### Endpoint
```
POST /api/General/UploadMultipleImages?FolderName={folderName}
```

### Request
```
Content-Type: multipart/form-data
Authorization: Bearer {token}

Body:
- files: File[] (array of image files)

Query Parameters:
- FolderName: string (default: "images")
```

### Response
```json
{
  "isSuccess": true,
  "data": {
    "urls": [
      "https://cdn.example.com/image1.jpg",
      "https://cdn.example.com/image2.jpg"
    ]
  },
  "error": {
    "description": "string"
  },
  "status": 1
}
```

## Key Functions

### `collectPendingImages(values)`
Traverses form values and collects all File objects with their paths.

**Returns:**
```javascript
{
  files: [File, File, ...],
  paths: ['lawyers[0].photoUrl', 'coreValues[1].photoUrl', ...]
}
```

### `uploadPendingImages(values, setFieldValue, folderName)`
Uploads all pending images and updates form values with URLs.

**Process:**
1. Collect all File objects
2. Upload in single batch request
3. Replace File objects with URLs using setFieldValue
4. Return updated values

### `hasPendingImages(values)`
Checks if there are any File objects in form values.

**Returns:** `boolean`

## Usage Example

### In Form Component
```jsx
import { useFormik } from 'formik';
import { uploadPendingImages } from '../utils/imageUploadHelper';
import { useUnsavedChanges } from '../hooks/useUnsavedChanges';

const formik = useFormik({
  initialValues: { /* ... */ },
  onSubmit: async (values) => {
    // Upload images first
    await uploadPendingImages(values, formik.setFieldValue);
    
    // Then submit form with URLs
    await api.put('/api/endpoint', values);
  }
});

// Track unsaved changes
useUnsavedChanges(formik.dirty);
```

### In Image Field
```jsx
<ImageUpload
  name="lawyers[0].photoUrl"
  value={lawyer.photoUrl}  // Can be File or URL string
  onChange={(file) => formik.setFieldValue('lawyers[0].photoUrl', file)}
  label="Lawyer Photo"
/>
```

## Benefits

### Performance
- ✅ No individual uploads on file selection
- ✅ Single batch request reduces server load
- ✅ Faster user experience with instant previews

### User Experience
- ✅ Immediate visual feedback
- ✅ No waiting for uploads during editing
- ✅ Protection against accidental data loss
- ✅ Clear save state indication

### Data Integrity
- ✅ All images upload together or none
- ✅ Form submission waits for uploads
- ✅ Automatic URL replacement in form data
- ✅ Error handling for failed uploads

## Error Handling

### File Validation
- File type must be image/*
- File size must be < 5MB
- Toast notification on validation failure

### Upload Errors
- Failed uploads throw error
- Form submission is blocked
- Error message shown to user
- User can retry save

### Network Issues
- Browser warns before leaving
- Unsaved File objects preserved
- User can save again when online

## Browser Compatibility

### Local Preview
Uses `URL.createObjectURL()` - supported in all modern browsers

### Unsaved Changes Warning
Uses `beforeunload` event - standard browser API

### File Upload
Uses FormData API - widely supported

## Notes

- File objects are temporary and only exist in memory
- Local previews are cleaned up on component unmount
- URLs are only generated after successful upload
- Form dirty state tracks any changes including file selections
- Navigation blocking works for React Router links
