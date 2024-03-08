import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import ClaimUser from './onboarding/ClaimUser';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Onboarding: React.FC = () => {
  const { isSignedIn } = useUser();
  const [currentStep, setCurrentStep] = useState('claimUser');
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is signed in and on the 'auth' step, move to 'aboutYou'
    if (isSignedIn) {
      navigate('/coverphoto');
    }
  }, [isSignedIn, navigate]);

  const goToNextStep = () => {
    if (currentStep === 'claimUser') {
      setCurrentStep('auth');
    } else if (currentStep === 'auth') {
      // The actual move to 'aboutYou' is handled by the useEffect hook when isSignedIn changes to true
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: '#FAFAF9' }}
    >
      <Header progress={0} />

      {!isSignedIn && currentStep === 'claimUser' && (
        <ClaimUser goToNextStep={goToNextStep} />
      )}

      <Footer />
    </div>
  );
};

export default Onboarding;