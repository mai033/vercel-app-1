import React from 'react';
import logo from '../assets/brand/logo.svg'; // Make sure the path to your logo is correct
import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  progress: number; // Represents the progress percentage (0 to 100)
}

const Header: React.FC<HeaderProps> = ({ progress }) => {
  const navigate = useNavigate(); // Use the useNavigate hook to get the navigate function

  // Define a sign out callback that navigates to the homepage
  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <header className="flex items-center text-white p-10 justify-between" style={{ backgroundColor: 'transparent', position: 'fixed', width: '100%', minWidth: '300px'}}>
      <div className="logo">
        <img src={logo} alt="Logo" className="h-8" />
      </div>
      {/* Conditionally render the sparkly progress bar */}
      {progress > 0 && (
        <div className="progress-bar bg-slate-100 rounded-full h-2 w-1/2 overflow-hidden relative">
          <div className="sparkle-overlay"></div> {/* Sparkle overlay */}
          <div
            className="progress-inner h-2 rounded-full"
            style={{ width: `${progress}%`, backgroundColor: '#1F2937' }}
          ></div>
        </div>
      )}
      <SignedIn>
        <span className="text-slate-800 font-semibold text-lg">
          <SignOutButton signOutCallback={handleSignOut}>
            Log out
          </SignOutButton>
        </span>
      </SignedIn>
      <SignedOut>
      <span className="text-slate-800 font-semibold text-lg">
        <SignInButton>
       Log in
        </SignInButton>
        </span>
      </SignedOut>
    </header>
  );
};

export default Header;
