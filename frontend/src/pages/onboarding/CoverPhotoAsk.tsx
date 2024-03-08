import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { AiOutlinePicture } from 'react-icons/ai';
import { FaArrowRight } from 'react-icons/fa';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { uploadToS3 } from '../../utils/uploadToS3'; 
import { resizeImage } from '../../utils/imageResizer'; 

const CoverPhotoUpload = () => {
  const { user } = useUser();
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const navigate = useNavigate();

  // Function to handle file selection, resize, and upload
  const handleCoverPhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    // Resize the image before uploading to S3
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    try {
      const resizedFile = await resizeImage(file, maxFileSize);
      await uploadToS3(resizedFile, setCoverPhoto, 'coverPhotoUrl');
    } catch (error) {
      console.error('Error resizing or uploading file:', error);
    }
  };

  const handleContinueOrSkip = () => {
    navigate('/pdfupload'); 
  };

  const userName = user?.firstName || 'there';

  return (
    <React.Fragment>
      <Header progress={50} />
      <div className="flex flex-col md:flex-row min-h-screen items-center justify-center gap-4 md:gap-10 p-2 md:p-5 bg-[#FAFAF9] text-[#333]">
        <div className="w-full md:max-w-lg text-left px-4 md:px-8">
          <h1 className="text-2xl md:text-3xl font-medium mb-4">
            {coverPhoto
              ? `Looking good, ${userName}!`
              : `Nice to meet you, ${userName}!`}
          </h1>
          <p className="text-md md:text-lg opacity-80">
            {coverPhoto
              ? 'You can always change your cover photo in your settings after you’re all set up.'
              : 'Let’s choose a cover photo for your profile. This will be what people see at the top of your profile page.'}
          </p>
          {/* Button always visible and adjusted to handle both continue and skip actions */}
          <button
            onClick={handleContinueOrSkip}
            className="flex items-center justify-center bg-transparent hover:bg-black text-slate-900 font-semibold hover:text-white py-2 px-4 border border-slate-900 hover:border-transparent rounded-full gap-2 mt-4"
          >
            {coverPhoto ? 'Continue' : 'Skip'} <FaArrowRight />
          </button>
        </div>
        <div className="w-full md:max-w-lg flex flex-col items-center justify-center">
          <div className="flex flex-col w-full items-center justify-center gap-8 px-4 py-8 relative rounded-2xl overflow-hidden bg-[#f4f4f5] border-2 border-dashed border-[#d1d5db] hover:border-[#464b51] transition-all duration-300 ease-in-out">
            {coverPhoto ? (
              <img
                src={coverPhoto}
                alt="Cover Preview"
                className="w-full h-auto rounded-2xl transition-transform duration-300 ease-in-out hover:scale-105"
              />
            ) : (
              <>
                <div className="text-lg text-[#4B5563]">
                  Drag and drop or click to select a cover photo
                </div>
                <div className="w-16 h-16 bg-[#181414] rounded-full flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faImage}
                    className="text-white text-2xl"
                  />
                </div>
              </>
            )}
            <label
              htmlFor="cover-photo-upload"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full cursor-pointer text-sm bg-white text-[#333] border border-[#CCC] hover:bg-[#f0f0f0] transition-all duration-300 ease-in-out"
            >
              <p>Select a file to upload</p>
              <AiOutlinePicture />
            </label>
            <input
              type="file"
              onChange={handleCoverPhotoUpload}
              accept="image/png, image/jpeg"
              className="hidden"
              id="cover-photo-upload"
            />
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default CoverPhotoUpload;
