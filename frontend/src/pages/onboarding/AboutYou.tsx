import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { FaArrowRight } from 'react-icons/fa';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { API_BASE_URL } from '../../utils/apiConfig';

const apiKey: string = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

// No need to accept goToNextStep as a prop anymore
const AboutYou: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [progress, setProgress] = useState<number>(20);
  const locationInputRef = useRef<HTMLInputElement | null>(null);
  const userDetailsSent = useRef<boolean>(false);

  useEffect(() => {
    const loadGoogleMapsScript = (callback: () => void) => {
      const existingScript = document.getElementById('googleMapsScript');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.id = 'googleMapsScript';
        document.body.appendChild(script);
        script.onload = () => {
          if (callback) callback();
        };
      } else if (callback) {
        callback();
      }
    };

    loadGoogleMapsScript(() => {
      if (window.google && locationInputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          locationInputRef.current,
          { types: ['(cities)'] }
        );

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          console.log(place);
        });
      } else {
        console.error('Google Maps API failed to load');
      }
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user && !userDetailsSent.current) {
        const sendUserDetailsToBackend = async () => {
          const userDetails = {
            username: localStorage.getItem('username'),
            clerkUserId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
          };

          console.log('Sending user details to backend:', userDetails);
          try {
            const response = await fetch(`${API_BASE_URL}/storeUserDetails`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userDetails),
            });

            const data = await response.json();
            if (data.success) {
              console.log('User details successfully stored:', data);
              localStorage.removeItem('username');
              userDetailsSent.current = true;
            } else {
              console.error('Failed to store user details:', data.message);
            }
          } catch (error) {
            console.error('Error sending user details to backend:', error);
          }
        };

        sendUserDetailsToBackend();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [user]);

  // Function to handle click event
  const handleContinueClick = () => {
    navigate('/coverphoto'); // Use navigate to go to /coverphoto
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: '#FAFAF9' }}
    >
      <Header progress={progress} />

      <main className="flex-grow flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          <h1 className="text-3xl mb-4 font-medium  text-left">
            First, let's get to know you
          </h1>

          <div className="flex mb-4 -mx-2">
            <div className="w-1/2 px-2">
              <input
                type="text"
                name="firstName"
                id="firstName"
                defaultValue={user?.firstName || ''}
                placeholder="First Name"
                className="mt-1 py-4 block w-full bg-transparent border border-slate-500 rounded-lg shadow-sm py-2 px-3 text-slate-700 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                required
              />
            </div>
            <div className="w-1/2 px-2">
              <input
                type="text"
                name="lastName"
                id="lastName"
                defaultValue={user?.lastName || ''}
                placeholder="Last Name"
                className="mt-1 py-4 block w-full bg-transparent border border-slate-500 rounded-lg shadow-sm py-2 px-3 text-slate-700 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <input
              ref={locationInputRef}
              type="text"
              name="location"
              id="location"
              placeholder="Location"
              className="mt-1 py-4 block w-full bg-transparent border border-slate-500 rounded-lg shadow-sm py-2 px-3 text-slate-700 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="px-6 md:px-12 py-2 md:py-4 w-full text-lg md:text-xl rounded-full bg-[#181414] text-white hover:bg-opacity-90 transition duration-150 ease-in-out font-semibold flex items-center justify-center space-x-2"
              onClick={handleContinueClick} // Use the button to trigger navigation
            >
              <span>Continue</span>
              <FaArrowRight />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutYou;
