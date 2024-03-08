// In Home.tsx or wherever you wish to include the sidebar

import React from 'react';
import Navbar from '../../components/navbar/Navbar';

const AnalyticsView: React.FC = () => {
  return (
    <div className=''>
      <div className="flex">
      <Navbar /> {/* Include the Sidebar component */}
        <div className="flex-1">
          {/* Your existing content here, adjust layout as needed */}
          <div className="flex items-center justify-center min-h-full bg-[#FAFAF9]">
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
