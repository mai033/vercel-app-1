import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaArrowRight } from 'react-icons/fa';

const Bio: React.FC = () => {
  const [bio, setBio] = useState('');

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  const handleSkip = () => {
    console.log("Skip or Continue button clicked");
    // Implement skip or continue logic here
  };

  return (
    <React.Fragment>
      <Header progress={90} />
      <div className="flex flex-col items-center justify-center min-h-screen gap-10 p-5">
        <div className="w-full max-w-4xl mx-auto text-left">
          <h1 className="text-3xl font-medium mb-4">Next, add your bio</h1>
          <p className="text-xl text-gray-500 mb-4">
            This is your chance to tell others more about your work, what drives you, and what you're passionate about. Use this space to give your profile a personal touch.
          </p>
          <div className="relative w-full">
            <span className="absolute right-4 top-1 text-sm text-gray-500">
              {bio.length}/500 characters
            </span>
            <label htmlFor="bio" className="block text-lg font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="Tell us a bit about you."
              value={bio}
              onChange={handleBioChange}
              maxLength={500}
            ></textarea>
          </div>
        </div>
        <button
          onClick={handleSkip}
          className={`px-6 md:px-12 py-2 md:py-4 text-lg md:text-xl rounded-full ${bio.length > 0 ? 'bg-blue-500 text-white' : 'bg-transparent text-black'} hover:bg-blue-600 hover:text-white transition duration-150 ease-in-out font-medium flex items-center justify-center gap-4 border border-black`}
        >
          {bio.length > 0 ? "Continue" : "Skip"} <FaArrowRight />
        </button>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Bio;
