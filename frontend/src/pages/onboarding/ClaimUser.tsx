// ClaimUser.tsx
import React from 'react';
import Username from '../../components/Username'; // Adjust the path as necessary

interface ClaimUserProps {
  goToNextStep: () => void;
}

const ClaimUser: React.FC<ClaimUserProps> = ({ goToNextStep }) => {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#FAFAF9' }}>
      <main className="flex-grow flex items-center justify-center">
        <Username goToNextStep={goToNextStep} />
      </main>
    </div>
  );
};

export default ClaimUser;
