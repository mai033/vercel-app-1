import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

interface Props {
  onToggleSubscription: (status: boolean) => void;
  isSubscribed: boolean;
  setIsSubscribed: (status: boolean) => void;
}

const Subscribe: React.FC<Props> = ({
  onToggleSubscription,
  isSubscribed,
  setIsSubscribed,
}) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(email); // Log email for subscription logic
  };

  const toggleSubscription = () => {
    const newSubscriptionStatus = !isSubscribed;
    setIsSubscribed(newSubscriptionStatus);
    onToggleSubscription(newSubscriptionStatus);
  };

  return (
    <div className="flex items-center justify-between rounded-lg">
      <div className="flex flex-col items-start">
        <div className="text-gray-500 text-sm mb-2">MAILING LIST</div>
        <p className="text-gray-500 text-xs">
          Collect emails from people who visit your page
        </p>
      </div>
      <button
        onClick={toggleSubscription}
        className="flex items-center justify-center"
      >
        <FontAwesomeIcon
          icon={isSubscribed ? faToggleOn : faToggleOff}
          className="text-2xl text-gray-900"
        />
      </button>
    </div>
  );
};

export default Subscribe;
