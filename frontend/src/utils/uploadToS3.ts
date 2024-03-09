// import { API_BASE_URL } from './apiConfig';

// export const uploadToS3 = async (
//   file: File,
//   setUrl: React.Dispatch<React.SetStateAction<string | null>>,
//   localStorageKey: string
// ) => {
//   try {
//     const presignResponse = await fetch(
//       `${API_BASE_URL}/generate-upload-url?fileName=${encodeURIComponent(
//         file.name
//       )}`
//     );
//     if (!presignResponse.ok) {
//       throw new Error('Could not fetch presigned URL');
//     }
//     const { url } = await presignResponse.json();

//     const uploadResponse = await fetch(url, {
//       method: 'PUT',
//       body: file,
//       headers: {
//         'Content-Type': file.type,
//       },
//     });

//     if (!uploadResponse.ok) {
//       throw new Error('Upload to S3 failed');
//     }
//     const imageUrl = url.split('?')[0];

//     localStorage.setItem(localStorageKey, imageUrl);
//     setUrl(imageUrl);
//     console.log('Upload successful');
//   } catch (error) {
//     console.error('Error uploading file:', error);
//   }
// };

// doesnt work
// import { API_BASE_URL } from './apiConfig';

// export const uploadToS3 = async (
//   file: File,
//   setUrl: React.Dispatch<React.SetStateAction<string | null>>,
//   localStorageKey: string
// ) => {
//   try {
//     // Include the contentType in the request for a pre-signed URL
//     const presignResponse = await fetch(
//       `${API_BASE_URL}/generate-upload-url?fileName=${encodeURIComponent(
//         file.name
//       )}&contentType=${encodeURIComponent(file.type)}`
//     );
//     if (!presignResponse.ok) {
//       throw new Error('Could not fetch presigned URL');
//     }
//     const { url } = await presignResponse.json();

//     // Use the PUT method with the file and Content-Type header for the upload
//     const uploadResponse = await fetch(url, {
//       method: 'PUT',
//       body: file,
//       headers: {
//         'Content-Type': file.type,
//       },
//     });

//     if (!uploadResponse.ok) {
//       throw new Error('Upload to S3 failed');
//     }
//     // Extract the base URL (without query parameters) to use as the image URL
//     const imageUrl = url.split('?')[0];

//     // Store the URL in local storage and update state
//     localStorage.setItem(localStorageKey, imageUrl);
//     setUrl(imageUrl);
//     console.log('Upload successful');
//   } catch (error) {
//     console.error('Error uploading file:', error);
//   }
// };

import { API_BASE_URL } from './apiConfig';

export const uploadToS3 = async (
  file: File,
  setUrl: React.Dispatch<React.SetStateAction<string | null>>,
  localStorageKey: string
) => {
  try {
    // Fetch presigned POST data from your server
    const presignResponse = await fetch(
      `${API_BASE_URL}/generate-upload-url?fileName=${encodeURIComponent(
        file.name
      )}&contentType=${encodeURIComponent(file.type)}`
    );
    if (!presignResponse.ok) {
      throw new Error('Could not fetch presigned URL');
    }
    const presignedPostData = await presignResponse.json();

    // Construct formData with fields from presigned POST data and the file
    const formData = new FormData();
    Object.keys(presignedPostData.fields).forEach((key) => {
      formData.append(key, presignedPostData.fields[key]);
    });
    formData.append('file', file);

    // Use the URL and formData to make the POST request to S3
    const uploadResponse = await fetch(presignedPostData.url, {
      method: 'POST',
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error('Upload to S3 failed');
    }

    // Construct the URL to the uploaded file
    const imageUrl = `${presignedPostData.url}/${encodeURIComponent(
      presignedPostData.fields.key
    )}`;
    localStorage.setItem(localStorageKey, imageUrl);
    setUrl(imageUrl);
    console.log('Upload successful');
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
