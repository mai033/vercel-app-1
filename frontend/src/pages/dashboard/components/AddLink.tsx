import React from 'react';
import { FaInstagram, FaEnvelope, FaLink } from 'react-icons/fa';

interface AddLinkProps {
  setInstagramLink: (link: string) => void;
  setEmail: (link: string) => void; 
  setAdditionalLink: (link: string) => void;
}

const AddLink: React.FC<AddLinkProps> = ({ setInstagramLink, setEmail, setAdditionalLink }) => {
  return (
    <div className="flex flex-col items-start relative">
     
      <div className="relative w-fit mt-[-1.00px] font-normal text-gray-500 text-xs tracking-[0.24px] leading-[20px] whitespace-nowrap">
        </div>
      <div className="inline-flex flex-col items-start relative">

        {/* Instagram Input */}
        <div className="flex items-center gap-3 py-2 self-stretch w-full rounded-[12px] overflow-hidden">

          <FaInstagram className="text-gray-300" style={{ minWidth: '1rem', minHeight: '1rem' }} />
          <input
            className="w-full bg-transparent placeholder-gray-300 border-none text-sm px-3 text-slate-500 focus:outline-none focus:ring-0 focus:bg-gray-50 focus:rounded-3xl hover:bg-gray-50 hover:rounded-3xl"
            type="text"
            placeholder="Add Instagram"
            onChange={(e) => setInstagramLink(e.target.value)}
          />
        </div>
        {/* Email Input */}
        <div className="flex items-center gap-3 py-2 self-stretch w-full bg-white rounded-[12px] overflow-hidden">
          <FaEnvelope className="text-gray-300" style={{ minWidth: '1rem', minHeight: '1rem' }} />
          <input
            className="w-full bg-transparent placeholder-gray-300 border-none text-sm px-3 text-slate-500 focus:outline-none focus:ring-0 focus:bg-gray-50 focus:rounded-3xl hover:bg-gray-50 hover:rounded-3xl"
            type="email"
            placeholder="Add your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Additional Link Input */}
        <div className="flex items-center gap-3 py-2 self-stretch w-full bg-white rounded-[12px] overflow-hidden">
          <FaLink className="text-gray-300" style={{ minWidth: '1rem', minHeight: '1rem' }} />
          <input
            className="w-full bg-transparent placeholder-gray-300 border-none text-sm px-3 text-slate-500 focus:outline-none focus:ring-0 focus:bg-gray-50 focus:rounded-3xl hover:bg-gray-50 hover:rounded-3xl"
            type="text"
            placeholder="Add additional link"
            onChange={(e) => setAdditionalLink(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddLink;