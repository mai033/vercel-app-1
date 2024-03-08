import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { uploadToS3 } from '../../utils/uploadToS3';

const PDFUpload = () => {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFileName = localStorage.getItem('pdfFileName');
    if (storedFileName) {
      setFileName(storedFileName);
      setUploadSuccess(true); 
    }
  }, []);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (!selectedFile || !(selectedFile.type === 'application/pdf')) return;

    setFileName(selectedFile.name);
    localStorage.setItem('pdfFileName', selectedFile.name);
    setUploadSuccess(false); 

    try {
      await uploadToS3(selectedFile, setFilePreview, 'pdfUrl');
      setUploadSuccess(true);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error('Error uploading file to S3', error);
      setUploadSuccess(false);
    }
  };

  const handleAction = () => {
    navigate('/dashboard');
  };

  return (
    <React.Fragment>
      <Header progress={70} />
      <div className="flex flex-col md:flex-row min-h-screen items-center justify-center gap-4 md:gap-10 p-2 md:p-5 bg-[#FAFAF9] text-[#333]">
        <div className="w-full md:max-w-lg text-left px-4 md:px-8">
          <h1 className="text-2xl md:text-3xl font-medium mb-4">
            Upload a PDF of your available work
          </h1>
          <p className="text-md md:text-lg opacity-80">
            If you don’t have it ready, no worries. You can always upload it
            later.
          </p>
          <button
            onClick={handleAction}
            className="flex items-center justify-center bg-transparent hover:bg-black text-slate-900 font-semibold hover:text-white py-2 px-4 border border-slate-900 hover:border-transparent rounded-full gap-2 mt-4"
          >
            {filePreview ? 'Continue' : 'Skip'} <FaArrowRight />
          </button>
        </div>
        <div className="w-full md:max-w-lg flex flex-col items-center justify-center">
          <div className="flex flex-col w-full items-center justify-center gap-8 px-4 py-8 relative rounded-2xl overflow-hidden bg-[#f4f4f5] border-2 border-dashed border-[#d1d5db] hover:border-[#464b51] transition-all duration-300 ease-in-out">
            {uploadSuccess && fileName ? (
              <p className="text-md md:text-lg">{fileName}</p>
            ) : (
              <p className="text-sm text-slate-500">
                PDF, Word Document, or Plain Text File (20MB max)
              </p>
            )}
            <label
              htmlFor="work-deck"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full cursor-pointer text-sm bg-white text-[#333] border border-[#CCC] hover:bg-[#f0f0f-out"
            >
              <span>Select a file to upload</span>
              <input
                type="file"
                id="work-deck"
                onChange={handleFileChange}
                accept=".pdf"
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default PDFUpload;
