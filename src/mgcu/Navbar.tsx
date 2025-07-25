import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/mgcu', label: 'Home' },
  { to: '/mgcu/library', label: 'Library' },
  { to: '/mgcu/universe', label: 'Universe' },
  { to: '/mgcu/characters', label: 'Characters' },
  { to: '/mgcu/about', label: 'About' },
  { to: '/mgcu/settings', label: 'Settings' },
  { to: '/mgcu/discord', label: 'Discord' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="w-full flex flex-wrap justify-center items-center py-3 mb-8 bg-white bg-opacity-90 shadow-md rounded-b-2xl border-b-4 border-pink-200 sticky top-0 z-20 relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <Link
          to="/hub"
          className="bg-gradient-to-r from-blue-400 to-pink-400 text-white font-bold py-2 px-4 rounded-full shadow hover:from-blue-500 hover:to-pink-500 transition-colors text-sm flex items-center gap-2"
          style={{ fontFamily: 'Poppins, Inter, Nunito, Arial, sans-serif' }}
        >
          ← Back to Hub
        </Link>
      </div>
      <div className="flex-1 flex flex-wrap justify-center items-center">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`mx-2 px-4 py-2 rounded-full font-semibold text-base transition-all duration-200 relative
              ${location.pathname === link.to ? 'text-pink-600' : 'text-gray-700 hover:text-pink-500'}
            `}
            style={{ fontFamily: 'Poppins, Inter, Nunito, Arial, sans-serif' }}
          >
            {link.label}
            {location.pathname === link.to && (
              <span className="block h-1 rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-400 mt-1 w-8 mx-auto"></span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar; 