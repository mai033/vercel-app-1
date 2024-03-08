import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { uploadToS3 } from '../../../utils/uploadToS3';

const PDFUpload: React.FC<{
  setPdfUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setCvUrl: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ setPdfUrl, setCvUrl }) => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvFilePreview, setCvFilePreview] = useState<string | null>(null);

  // Initially, try to set file names from local storage
  useEffect(() => {
    const pdfFileName = localStorage.getItem('pdfFileName');
    if (pdfFileName) {
      setFile(new File([], pdfFileName));
    }

    const cvFileName = localStorage.getItem('cvName');
    if (cvFileName) {
      setCvFile(new File([], cvFileName));
    }
  }, []);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
    if (selectedFile) {
      uploadFile(selectedFile, setPdfUrl, 'pdfUrl', 'pdfFileName');
    }
  };

  const handleCvFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setCvFile(selectedFile);
    if (selectedFile) {
      uploadFile(selectedFile, setCvUrl, 'cvUrl', 'cvName');
    }
  };
  
  const uploadFile = async (file: File, setUrl: React.Dispatch<React.SetStateAction<string | null>>, urlKey: string, fileNameKey: string) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (fileNameKey === 'pdfFileName') {
        setFilePreview(reader.result as string);
      } else {
        setCvFilePreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  
    await uploadToS3(file, (newUrl) => {
      if (typeof newUrl === 'string') {
        setUrl(newUrl); // Assures TypeScript that newUrl is a string.
        localStorage.setItem(urlKey, newUrl);
      } else {
        // If newUrl is not a string, handle accordingly.
        // For example, set to null or handle the error.
        setUrl(null);
        console.error("Received non-string URL from upload.");
      }
    }, urlKey);
  
    localStorage.setItem(fileNameKey, file.name);
  };
  

  return (
    <div className="flex flex-col items-center gap-[12px] relative">
      <div className="flex-col items-start flex gap-[4px] relative self-stretch w-full flex-[0_0_auto]  ">
        <div className="relative w-fit mt-[-1.00px] font-normal text-gray-500 text-xs tracking-[0.24px] leading-[20px] whitespace-nowrap">
          WORK
        </div>

        <label htmlFor="work-deck" className="items-center flex gap-[4px] relative self-stretch w-full flex-[0_0_auto] cursor-pointer hover:bg-gray-50 hover:rounded-xl">

          <div className="flex items-center justify-center gap-[6px] px-[40px] py-[16px] relative flex-1 grow rounded-[8px] border border-dashed border-gray-4">
            <FontAwesomeIcon
              icon={faPlus}
              className="!relative !w-[12px] !h-[12px]"
              color="#828282"
            />
            {file && (
              <p className="relative font-normal text-gray-3 text-sm text-center tracking-[0] leading-[normal]">
                {file.name}{' '}
              </p>
            )}
            {!file && (
              <p className="relative font-normal text-gray-3 text-sm text-center tracking-[0] leading-[normal] text-gray-500">
                Upload PDF of available works
              </p>
            )}
          </div>
          <input
            type="file"
            id="work-deck"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt"
            style={{ display: 'none' }}
          />
        </label>
      </div>
      <div className="flex-col items-start flex gap-[4px] relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative w-fit font-normal text-gray-500 text-xs tracking-[0.24px] leading-[20px] whitespace-nowrap">CV</div>
        <label htmlFor="cv-deck" className="items-center flex gap-[4px] relative self-stretch w-full flex-[0_0_auto] cursor-pointer">
          <div className="flex items-center justify-center gap-[6px] px-[40px] py-[16px] relative flex-1 grow rounded-[8px] border border-dashed border-gray-4 hover:bg-gray-50 hover:rounded-xl">
            <FontAwesomeIcon icon={faPlus} className="!relative !w-[12px] !h-[12px]" color="#828282" />
            {cvFile && (
              <p className="relative font-normal text-gray-3 text-sm text-center tracking-[0] leading-[normal]">
                {cvFile.name}
              </p>
            )}
            {!cvFile && (
              <p className="relative font-normal text-gray-3 text-sm text-center tracking-[0] leading-[normal] text-gray-500">
                Upload CV
              </p>
            )}
          </div>
          <input
            type="file"
            id="cv-deck"
            onChange={handleCvFileChange}
            accept=".pdf,.doc,.docx,.txt"
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </div>
  );
};

export default PDFUpload;
