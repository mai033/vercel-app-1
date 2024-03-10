// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faImage } from '@fortawesome/free-solid-svg-icons';
// import { uploadToS3 } from '../../../utils/uploadToS3';
// import { resizeImage } from '../../../utils/imageResizer';

// interface CoverPhotoProps {
//   coverPhotoUrl: string | null;
//   setCoverPhotoUrl: React.Dispatch<React.SetStateAction<string | null>>;
// }

// const CoverPhoto: React.FC<CoverPhotoProps> = ({
//   coverPhotoUrl,
//   setCoverPhotoUrl,
// }) => {

//   const handleCoverPhotoUpload = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (!file || !file.type.startsWith('image/')) return;

//     console.log(
//       `Original file size: ${(file.size / 1024 / 1024).toFixed(2)} MB`

//     );

//     try {

//       const resizedFile = await resizeImage(file, 4 * 1024 * 1024) as File;

//       console.log(
//         `Resized file size: ${(resizedFile.size / 1024 / 1024).toFixed(2)} MB`
//       );

//       await uploadToS3(
//         resizedFile,
//         (newUrl) => {
//           if (typeof newUrl === 'string') {
//             setCoverPhotoUrl(newUrl); // This assures TypeScript that newUrl is a string
//             localStorage.setItem('coverPhotoUrl', newUrl);
//           } else {
//             // Handle the case where newUrl is not a string (e.g., null or undefined)
//             console.error('Failed to upload image or get a new URL');
//             // Optionally, set the cover photo URL to null or a fallback URL
//             setCoverPhotoUrl(null);
//           }
//         },
//         'coverPhotoUrl'
//       );

//     } catch (error) {
//       console.error('Error resizing and uploading file:', error);
//     }
//   };

//   return (
//     <div className="flex flex-col w-full h-full max-h-1/2 items-center justify-center px-4 py-8 relative rounded-2xl overflow-hidden text-center border-2 border-dashed border-gray-300 bg-gray-50">
//       <label
//         htmlFor="cover-photo-upload"
//         className="cursor-pointer flex flex-col items-center justify-center gap-8"
//       >
//         {coverPhotoUrl ? (
//           <>
//             <img
//               src={coverPhotoUrl}
//               alt="Cover Preview"
//               className="w-full h-auto max-w-xs max-h-xs rounded-2xl object-cover"
//             />
//             <span className="text-gray-600">
//               Click to change the cover photo
//             </span>
//           </>
//         ) : (
//           <div className="flex flex-col items-center justify-center gap-4">
//             <div className="text-lg text-gray-600">
//               Click anywhere to select a cover photo
//             </div>
//             <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
//               <FontAwesomeIcon icon={faImage} className="text-white text-3xl" />
//             </div>
//           </div>
//         )}
//         <input
//           type="file"
//           onChange={handleCoverPhotoUpload}
//           accept="image/png, image/jpeg"
//           className="hidden"
//           id="cover-photo-upload"
//         />
//       </label>
//     </div>
//   );
// };

// export default CoverPhoto;

// test with hardcoded url
// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faImage } from '@fortawesome/free-solid-svg-icons';

// interface CoverPhotoProps {
//   coverPhotoUrl: string | null; // Even if we don't use it in this test, it's part of your component's props.
//   setCoverPhotoUrl: React.Dispatch<React.SetStateAction<string | null>>;
// }

// const CoverPhoto: React.FC<CoverPhotoProps> = ({
//   coverPhotoUrl,
//   setCoverPhotoUrl,
// }) => {

//   // Hardcoded URL for testing
//   const hardcodedUrl = "https://qtqs1sbnlmd3dw5p.public.blob.vercel-storage.com/KubeVX-1IiTT4h1kxgTqLM6vlN1vWh77VeKA7.png";

//   return (
//     <div className="flex flex-col w-full h-full max-h-1/2 items-center justify-center px-4 py-8 relative rounded-2xl overflow-hidden text-center border-2 border-dashed border-gray-300 bg-gray-50">
//       {hardcodedUrl ? (
//         <>
//           <img
//             src={hardcodedUrl} // Use the hardcoded URL here
//             alt="Cover Preview"
//             className="w-full h-auto max-w-xs max-h-xs rounded-2xl object-cover"
//           />
//           <span className="text-gray-600">
//             Click to change the cover photo
//           </span>
//         </>
//       ) : (
//         <div className="flex flex-col items-center justify-center gap-4">
//           <div className="text-lg text-gray-600">
//             Click anywhere to select a cover photo
//           </div>
//           <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
//             <FontAwesomeIcon icon={faImage} className="text-white text-3xl" />
//           </div>
//         </div>
//       )}

//       <input
//         type="file"
//         onChange={() => {} /* This remains empty for now since we're hardcoding the URL */}
//         accept="image/png, image/jpeg"
//         className="hidden"
//         id="cover-photo-upload"
//       />
//     </div>
//   );
// };

// export default CoverPhoto;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { uploadToS3 } from '../../../utils/uploadToS3';
import { resizeImage } from '../../../utils/imageResizer';
import { uploadToVercelBlob } from '../../../utils/uploadToVercelBlob';

interface CoverPhotoProps {
  coverPhotoUrl: string | null;
  setCoverPhotoUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

const CoverPhoto: React.FC<CoverPhotoProps> = ({
  coverPhotoUrl,
  setCoverPhotoUrl,
}) => {
  const handleCoverPhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxFileSize = 5 * 1024 * 1024; // 5MB, adjust this value as needed

    resizeImage(file, maxFileSize).then((resizedFile) => {
      // Assuming resizedFile is a Blob, convert it to a File object
      const fileToUpload = new File([resizedFile], file.name, { type: file.type });

      uploadToVercelBlob(
        fileToUpload,
        (url) => {
          // Here you use setCoverPhotoUrl which was passed as a prop
          setCoverPhotoUrl(url); // This updates the parent component's state
          localStorage.setItem('coverPhotoUrl', url); // Correctly store the URL in localStorage
        },
        'coverPhotoUrl' // Key under which to store the URL in localStorage
      ).catch((error) => {
        console.error('Error uploading resized file:', error);
      });
    }).catch((error) => {
      console.error('Error resizing file:', error);
    });
  };

  return (
    <div className="flex flex-col w-full h-full max-h-1/2 items-center justify-center px-4 py-8 relative rounded-2xl overflow-hidden text-center border-2 border-dashed border-gray-300 bg-gray-50">
      <label
        htmlFor="cover-photo-upload"
        className="cursor-pointer flex flex-col items-center justify-center gap-8"
      >
        {coverPhotoUrl ? (
          <>
            <img
              src={coverPhotoUrl}
              alt="Cover Preview"
              className="w-full h-auto max-w-xs max-h-xs rounded-2xl object-cover"
            />
            <span className="text-gray-600">
              Click to change the cover photo
            </span>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-lg text-gray-600">
              Click anywhere to select a cover photo
            </div>
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faImage} className="text-white text-3xl" />
            </div>
          </div>
        )}
        <input
          type="file"
          onChange={handleCoverPhotoUpload}
          accept="image/png, image/jpeg"
          className="hidden"
          id="cover-photo-upload"
        />
      </label>
    </div>
  );
};

export default CoverPhoto;
