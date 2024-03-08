import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignIn, SignedOut, useUser } from '@clerk/clerk-react';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      console.log('User is signed in:', user);
      navigate('/dashboard');
    }
  }, [isSignedIn, user, navigate]);

  return (
    <div>
      <SignedOut>
        <div className="flex flex-col items-center justify-center w-full py-8 px-4 min-h-screen">
          <SignIn />
        </div>
      </SignedOut>
    </div>
  );
};

export default Auth;