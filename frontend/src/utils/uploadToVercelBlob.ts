// import { put as uploadToBlob } from '@vercel/blob';

// export const uploadToVercelBlob = async (
//   file: File,
//   setUrl: React.Dispatch<React.SetStateAction<string | null>>,
//   localStorageKey: string
// ) => {
//   try {
//     const blob = await uploadToBlob(file.name, file, {
//       access: 'public',
//       // Assuming you're using environment variables as recommended
//       token: import.meta.env.VITE_BLOB_READ_WRITE_TOKEN,
//     });

//     const imageUrl = blob.url;
//     localStorage.setItem(localStorageKey, imageUrl);
//     setUrl(imageUrl);
//     console.log('Upload successful to Vercel Blob:', imageUrl);
//   } catch (error) {
//     console.error('Error uploading file to Vercel Blob:', error);
//   }
// };

// utils/uploadToVercelBlob.ts
import { put as uploadToBlob } from '@vercel/blob';

export const uploadToVercelBlob = async (
  file: File,
  setUrl: React.Dispatch<React.SetStateAction<string | null>>,
  localStorageKey: string
): Promise<{ url: string }> => {
  // Ensure the function returns a Promise with an object containing a url string
  try {
    const response = await uploadToBlob(file.name, file, {
      access: 'public',
      token: process.env.VITE_BLOB_READ_WRITE_TOKEN, // Make sure this is correctly set in your environment
    });

    if (response.url) {
      setUrl(response.url);
      localStorage.setItem(localStorageKey, response.url);
      return { url: response.url }; // Return the URL in an object
    } else {
      throw new Error('Upload failed: no URL returned.');
    }
  } catch (error) {
    console.error('Error uploading file to Vercel Blob:', error);
    throw error; // Rethrow to be caught by the calling function
  }
};
