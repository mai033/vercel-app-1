import React from 'react';
import { useUser } from '@clerk/clerk-react';

// If not already defined elsewhere
interface NameFieldsProps {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}


// Ensure NameFieldsProps is defined outside of the component
const NameFields: React.FC<NameFieldsProps> = ({ setUsername }) => {
  const { user } = useUser(); // This hook provides the current user's information
  
  // Component logic and return statement
  return (
    <div className="flex">
      <div className="w-full">
        <input
          type="text"
          name="firstName"
          id="firstName"
          defaultValue={user?.firstName || ''}
          placeholder="Your name"
          className="w-full border-none text-3xl text-gray-900 rounded-lg px-3 placeholder-gray-300 focus:outline-none focus:ring-0 focus:border-b focus:border-gray-500"
          required
        />
      </div>
    </div>
  );
};

export default NameFields;
