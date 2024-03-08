import React, { useState, useEffect } from 'react';
import { FaCheck, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/apiConfig';

interface UsernameProps {
  goToNextStep: () => void;
}

const Username: React.FC<UsernameProps> = ({ goToNextStep }) => {
  const [username, setUsername] = useState<string>(() => {
    const savedUsername = localStorage.getItem('username');
    return savedUsername || '';
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const isUsernameValid: boolean = username.length > 3;

  useEffect(() => {
    if (isUsernameValid) {
      localStorage.setItem('username', username);
    }
  }, [username, isUsernameValid]);

  const checkUsernameExists = async (): Promise<boolean> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/checkUsername?username=${username}`
      );
      const data = await response.json();
      if (data.message === 'Username is available') {
        setErrorMessage(null);
        return true;
      } else {
        setErrorMessage('Username already exists, please choose another one');
        return false;
      }
    } catch (error) {
      console.error('Error checking username', error);
      setErrorMessage(
        'Failed to check username availability. Please try again later.'
      );
      return false;
    }
  };

  const handleClaimUsername = async () => {
    const isAvailable = await checkUsernameExists();
    if (isAvailable) {
      navigate('/auth');
    }
  };

  // Reset errorMessage when the user starts typing a new username
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  w-full py-8 px-4">
      {/* Added px-4 for padding on the sides on smaller screens */}
      <div className="text-center mb-6 md:mb-8 text-2xl md:text-3xl ">
        {/* Adjusted margins and text size for smaller screens */}
        Claim your unique username
      </div>
      <div className="flex items-center border-2 border-gray-300 rounded-full px-4 md:px-12 py-4 md:py-6 w-full md:w-1/2 max-w-lg relative mb-6 md:mb-8">
        {/* Adjusted padding, width, and margins for responsiveness */}
        <span className="text-black text-xl md:text-3xl">linkto.art</span>
        <span className="text-[#1A21C4] text-xl md:text-3xl mr-2">/</span>
        {/* This span wraps the "/" and makes it blue */}
        <input
          type="text border-none"
          className="flex-1 text-xl md:text-3xl py-1 font-medium outline-none border-none "
          placeholder="username"
          value={username}
          onChange={handleUsernameChange}
          style={{
            borderColor: '#9CA3AF',
            backgroundColor: 'transparent',
            color: isUsernameValid ? '#059669' : '',
          }}
        />
        {isUsernameValid && (
          <FaCheck className="absolute right-4 md:right-10 text-green-600 text-2xl" />
        )}
      </div>
      {errorMessage && <div className="text-black mb-5">{errorMessage}</div>}
      {isUsernameValid && (
        <button
          className="px-6 md:px-12 py-2 md:py-4 text-lg md:text-xl rounded-full bg-[#181414] text-white hover:bg-opacity-90 transition duration-150 ease-in-out font-semibold flex items-center justify-center space-x-4"
          onClick={handleClaimUsername} // Use the button to trigger handleClaimUsername
        >
          <span>Claim</span>
          <FaArrowRight size="16" /> {/* Set the size to 16px */}
        </button>
      )}
    </div>
  );
};

export default Username;
