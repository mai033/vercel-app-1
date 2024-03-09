import { put as uploadToBlob } from '@vercel/blob';

export const uploadToVercelBlob = async (
  file: File,
  setUrl: React.Dispatch<React.SetStateAction<string | null>>,
  localStorageKey: string
) => {
  try {
    const blob = await uploadToBlob(file.name, file, {
      access: 'public',
      // Assuming you're using environment variables as recommended
      token: import.meta.env.VITE_BLOB_READ_WRITE_TOKEN,
    });

    const imageUrl = blob.url;
    localStorage.setItem(localStorageKey, imageUrl);
    setUrl(imageUrl);
    console.log('Upload successful to Vercel Blob:', imageUrl);
  } catch (error) {
    console.error('Error uploading file to Vercel Blob:', error);
  }
};
