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

import { API_BASE_URL } from './apiConfig';

export const uploadToS3 = async (
  file: File,
  setUrl: React.Dispatch<React.SetStateAction<string | null>>,
  localStorageKey: string
) => {
  try {
    // Include the contentType in the request for a pre-signed URL
    const presignResponse = await fetch(
      `${API_BASE_URL}/generate-upload-url?fileName=${encodeURIComponent(
        file.name
      )}&contentType=${encodeURIComponent(file.type)}`
    );
    if (!presignResponse.ok) {
      throw new Error('Could not fetch presigned URL');
    }
    const { url } = await presignResponse.json();

    // Use the PUT method with the file and Content-Type header for the upload
    const uploadResponse = await fetch(url, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error('Upload to S3 failed');
    }
    // Extract the base URL (without query parameters) to use as the image URL
    const imageUrl = url.split('?')[0];

    // Store the URL in local storage and update state
    localStorage.setItem(localStorageKey, imageUrl);
    setUrl(imageUrl);
    console.log('Upload successful');
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
