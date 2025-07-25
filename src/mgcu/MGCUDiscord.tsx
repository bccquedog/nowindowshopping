import React from 'react';
import ThemeWrapper from './ThemeWrapper';
import Navbar from './Navbar';

const MGCUDiscord: React.FC = () => (
  <ThemeWrapper>
    <Navbar />
    <div className="flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-extrabold mb-4 text-green-400 drop-shadow-lg tracking-widest">MGCU Discord</h1>
      <p className="max-w-xl mx-auto text-lg md:text-xl text-white bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-400 p-4 rounded-xl shadow-lg mb-8">
        Join the MGCU community on Discord! Connect, chat, and relive the 90s with fellow fans.
      </p>
      <div className="w-full max-w-2xl bg-white bg-opacity-80 rounded-lg p-6 shadow-lg">
        {/* TODO: Render Discord invite/integration here */}
        <p className="text-gray-700">Discord integration coming soon...</p>
      </div>
    </div>
  </ThemeWrapper>
);

export default MGCUDiscord; 