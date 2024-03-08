import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

interface LocationProps {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
}

declare global {
  interface Window {
    google: any;
  }
}

const apiKey: string = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

const Location: React.FC<LocationProps> = ({ onPlaceSelected }) => {
  const locationInputRef = useRef<HTMLInputElement>(null);

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
        const autocomplete = new window.google.maps.places.Autocomplete(locationInputRef.current, { types: ['(cities)'] });
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          onPlaceSelected(place);
        });
      }
    });
  }, [onPlaceSelected]);

  return (
    <div className="flex">
      <div className="w-fit px-2  h-8">
        <div className="w-full h-full flex items-center gap-[8px] px-[12px] py-[4px] relative rounded-[100px] border border-solid hover:bg-gray-50 hover:rounded-3xl">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-[8px] h-[10.64px] m-2 text-slate-400" />
          <input
            ref={locationInputRef}
            type="text border-none"
            name="location"
            id="location"
            placeholder="Location"
            className="bg-transparent border-none text-sm text-gray-4 placeholder-gray-400 focus:outline-none "
            // Adjusted Tailwind CSS classes for styling according to the new design
          />
        </div>
      </div>
    </div>
  );
  
};

export default Location;
