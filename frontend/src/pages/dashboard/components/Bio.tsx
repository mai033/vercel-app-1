import React from 'react';

interface BioProps {
  setBio: (bio: string) => void; 
}

const Bio: React.FC<BioProps> = ({ setBio }) => {

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value); 
  };

  return (
    <React.Fragment>
      <div className="flex flex-col w-full">
        <textarea
          id="bio"
          name="bio"
          rows={3}
          className="w-full mt-1 border-l-0 border-r-0 border-t-0 border-b-0 border-slate-300 placeholder-gray-300 text-sm px-3 text-slate-500 focus:ring-0 focus:bg-gray-50 focus:rounded-3xl"
          placeholder="Tell us what makes you uniquely awesome as an artist..."
          onChange={handleBioChange} 
          maxLength={500}
        ></textarea>
      </div>
    </React.Fragment>
  );
};

export default Bio;