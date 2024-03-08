import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUserCircle, faAddressCard, faCog, faBars, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@clerk/clerk-react';
import logo from '../../assets/brand/logo.svg';

interface NavbarItemProps {
  to: string;
  icon: IconDefinition;
  label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ to, icon, label }) => (
  <li>
    <Link to={to} className="flex items-center p-3 space-x-3 text-gray-800 hover:bg-gray-100 rounded-md">
      <FontAwesomeIcon icon={icon} className="text-lg" />
      <span>{label}</span>
    </Link>
  </li>
);

const navItems = [
  { to: "/dashboard", icon: faTachometerAlt, label: "Dashboard" },
  { to: "/analytics", icon: faUserCircle, label: "Analytics" },
  { to: "/sales", icon: faAddressCard, label: "Sales" },
  { to: "/settings", icon: faCog, label: "Settings" },
  // Add more navigation items here as needed
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const navbarRef = useRef<HTMLDivElement>(null); // Step 1 & 2

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Collapse the navbar if the click is outside
      }
    }

    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return (
    <div ref={navbarRef}>
      <button className="md:hidden p-4 focus:outline-none" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} className="text-gray-800" />
      </button>

      <div className={`navbar bg-white text-gray-800 w-64 min-h-screen shadow-md absolute inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition duration-200 ease-in-out flex flex-col justify-between`}>
        <div>
          <div className="navbar-header p-5 flex flex-col items-center border-b border-gray-200">
            <img src={logo} alt="Logo" className="h-8" />
          </div>
          <nav className="navbar-nav mt-5">
            <ul className="space-y-3">
              {navItems.map((item, index) => (
                <NavbarItem key={index} to={item.to} icon={item.icon} label={item.label} />
              ))}
            </ul>
          </nav>
        </div>

        <div>
          {user && (
            <div className="mt-auto p-5 flex flex-col items-center border-t border-gray-200">
              <img src={user.imageUrl || 'default_profile_image_url'} alt="Profile" className="h-16 w-16 rounded-full object-cover" />
              <div className="mt-2 text-center">
                <div className="text-sm font-semibold">{user.fullName || user.username}</div>
                <div className="text-xs text-gray-600">{user.primaryEmailAddress?.emailAddress}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
