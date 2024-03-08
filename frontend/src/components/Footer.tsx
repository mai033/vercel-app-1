import React from 'react';
import { IoLogoInstagram, IoMailOutline, IoInformationCircleOutline } from 'react-icons/io5'; // Using Ionicons for demonstration

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center items-center space-x-10 p-12" style={{ backgroundColor: 'transparent', position: 'fixed', bottom: 0, width: '100%' }}>
      <a href="https://www.instagram.com/apostrophe__art/" className="flex items-center space-x-2 hover:underline">
        <IoLogoInstagram color="#1F2937" />
        <span>Instagram</span>
      </a>
      <a href="mailto:contact@example.com" className="flex items-center space-x-2 hover:underline">
        <IoMailOutline color="#1F2937" />
        <span>Contact</span>
      </a>
      <a href="/about" className="flex items-center space-x-2 hover:underline">
        <IoInformationCircleOutline color="#1F2937" />
        <span>About</span>
      </a>
    </footer>
  );
};

export default Footer;
