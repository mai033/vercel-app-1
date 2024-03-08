import { API_BASE_URL } from "./apiConfig";

export const uploadToS3 = async (
  file: File,
  setUrl: React.Dispatch<React.SetStateAction<string | null>>,
  localStorageKey: string
) => {
  try {
    const presignResponse = await fetch(
      `${API_BASE_URL}/generate-upload-url?fileName=${encodeURIComponent(file.name)}`
    );
    if (!presignResponse.ok) {
      throw new Error('Could not fetch presigned URL');
    }
    const { url } = await presignResponse.json();

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
    const imageUrl = url.split('?')[0];

    localStorage.setItem(localStorageKey, imageUrl);
    setUrl(imageUrl);
    console.log('Upload successful');
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
