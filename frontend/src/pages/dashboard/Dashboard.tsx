// working version
// import React, { useState, useEffect } from 'react';
// import NameFields from './components/NameFields';
// import CoverPhoto from './components/CoverPhoto';
// import Location from './components/Location';
// import PDFUpload from './components/PDFUpload';
// import AddLink from './components/AddLink';
// import Bio from './components/Bio';
// import Subscribe from './components/Subscribe';
// import { API_BASE_URL } from '../../utils/apiConfig';

// const Dashboard = () => {
//   const [username, setUsername] = useState(
//     localStorage.getItem('username') || ''
//   );
//   const [email, setEmail] = useState('');
//   const [location, setLocation] = useState('');
//   const [bio, setBio] = useState('');
//   const [instagramLink, setInstagramLink] = useState('');
//   const [additionalLink, setAdditionalLink] = useState('');
//   const [work, setWork] = useState<string | string[]>([]);
//   // const [cv, setCv] = useState('');
//   const [coverPhoto, setCoverPhoto] = useState<string | null>('');
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null);
//   const [cvUrl, setCvUrl] = useState<string | null>(null);

//   useEffect(() => {
//     const storedCoverPhotoUrl = localStorage.getItem('coverPhotoUrl');
//     if (storedCoverPhotoUrl) {
//       setCoverPhoto(storedCoverPhotoUrl);
//     }

//     // Fetch the PDF URL from local storage
//     const storedPdfUrl = localStorage.getItem('pdfUrl');
//     if (storedPdfUrl) {
//       setPdfUrl(storedPdfUrl);
//     }
//   }, []);

//   interface SelectedLocation {
//     formatted_address: string;
//     // Include other properties you might use
//   }

//   const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
//     console.log(place); // Or whatever you want to do with the place object
//   };

//   const handleSubscriptionToggle = (status: boolean) => {
//     setIsSubscribed(status);
//   };

//   const handleSubmit = async () => {
//     const formattedWork = Array.isArray(work)
//       ? [...work]
//       : work.split(',').map((item: string) => item.trim());
//     if (pdfUrl) {
//       formattedWork.push(pdfUrl);
//     }

//     const userData = {
//       username,
//       email,
//       location,
//       bio,
//       instagram: instagramLink,
//       additionalLink,
//       work: formattedWork,
//       cv: cvUrl,
//       coverPhoto,
//       isSubscribed,
//     };

//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/storeUserDetails`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(userData),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('Submission successful', data);
//       localStorage.removeItem('username');
//       localStorage.removeItem('coverPhotoUrl');
//       localStorage.removeItem('pdfUrl');
//       localStorage.removeItem('pdfFileName');
//       localStorage.removeItem('cvUrl');
//       localStorage.removeItem('cvName');
//       setUsername('');
//     } catch (error) {
//       console.error('Failed to submit:', error);
//     }
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-center min-h-full bg-[#FAFAF9]">
//         <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-3xl p-3">
//           <div className="flex flex-wrap mx-3">
//             <div className="w-full md:w-1/2 p-3">
//               <CoverPhoto
//                 coverPhotoUrl={coverPhoto}
//                 setCoverPhotoUrl={setCoverPhoto}
//               />
//             </div>
//             <div className="w-full md:w-1/2 p-3">
//               <NameFields setUsername={setUsername} />
//               <Location onPlaceSelected={handlePlaceSelected} />
//               <Bio setBio={setBio} />
//               <AddLink
//                 setInstagramLink={setInstagramLink}
//                 setAdditionalLink={setAdditionalLink}
//                 setEmail={setEmail}
//               />
//               <PDFUpload setPdfUrl={setPdfUrl} setCvUrl={setCvUrl} />
//               <Subscribe
//                 onToggleSubscription={handleSubscriptionToggle}
//                 isSubscribed={isSubscribed}
//                 setIsSubscribed={setIsSubscribed}
//               />
//               <button
//                 onClick={handleSubmit}
//                 className="bg-black hover:bg-opacity-90 text-white font-bold py-2 px-4 mt-5 rounded-full"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import NameFields from './components/NameFields';
import CoverPhoto from './components/CoverPhoto';
import Location from './components/Location';
import PDFUpload from './components/PDFUpload';
import AddLink from './components/AddLink';
import Bio from './components/Bio';
import Subscribe from './components/Subscribe';
import { API_BASE_URL } from '../../utils/apiConfig';

const Dashboard = () => {
  const [username, setUsername] = useState(
    localStorage.getItem('username') || ''
  );
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [additionalLink, setAdditionalLink] = useState('');
  const [work, setWork] = useState<string | string[]>([]);
  // const [cv, setCv] = useState('');
  const [coverPhoto, setCoverPhoto] = useState<string | null>('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [cvUrl, setCvUrl] = useState<string | null>(null);

  useEffect(() => {
    const storedCoverPhotoUrl = localStorage.getItem('coverPhotoUrl');
    if (storedCoverPhotoUrl) {
      setCoverPhoto(storedCoverPhotoUrl);
    }

    // Fetch the PDF URL from local storage
    const storedPdfUrl = localStorage.getItem('pdfUrl');
    if (storedPdfUrl) {
      setPdfUrl(storedPdfUrl);
    }
  }, []);

  interface SelectedLocation {
    formatted_address: string;
    // Include other properties you might use
  }

  const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
    if (place.formatted_address) {
      setLocation(place.formatted_address);
      console.log('Location selected:', place.formatted_address);
    }
  };

  const handleSubscriptionToggle = (status: boolean) => {
    setIsSubscribed(status);
  };

  const handleSubmit = async () => {
    const formattedWork = Array.isArray(work)
      ? [...work]
      : work.split(',').map((item: string) => item.trim());
    if (pdfUrl) {
      formattedWork.push(pdfUrl);
    }

    const userData = {
      username,
      email,
      location,
      bio,
      instagram: instagramLink,
      additionalLink,
      work: formattedWork,
      cv: cvUrl,
      coverPhoto,
      isSubscribed,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/storeUserDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Submission successful', data);
      localStorage.removeItem('username');
      localStorage.removeItem('coverPhotoUrl');
      localStorage.removeItem('pdfUrl');
      localStorage.removeItem('pdfFileName');
      localStorage.removeItem('cvUrl');
      localStorage.removeItem('cvName');
      setUsername('');
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-full bg-[#FAFAF9]">
        <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-3xl p-3">
          <div className="flex flex-wrap mx-3">
            <div className="w-full md:w-1/2 p-3">
              <CoverPhoto
                coverPhotoUrl={coverPhoto}
                setCoverPhotoUrl={setCoverPhoto}
              />
            </div>
            <div className="w-full md:w-1/2 p-3">
              <NameFields setUsername={setUsername} />
              <Location onPlaceSelected={handlePlaceSelected} />
              <Bio setBio={setBio} />
              <AddLink
                setInstagramLink={setInstagramLink}
                setAdditionalLink={setAdditionalLink}
                setEmail={setEmail}
              />
              <PDFUpload setPdfUrl={setPdfUrl} setCvUrl={setCvUrl} />
              <Subscribe
                onToggleSubscription={handleSubscriptionToggle}
                isSubscribed={isSubscribed}
                setIsSubscribed={setIsSubscribed}
              />
              <button
                onClick={handleSubmit}
                className="bg-black hover:bg-opacity-90 text-white font-bold py-2 px-4 mt-5 rounded-full"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
