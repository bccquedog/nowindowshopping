import React from 'react';
import ThemeWrapper from './ThemeWrapper';
import Navbar from './Navbar';

const MGCUUniverse: React.FC = () => (
  <ThemeWrapper>
    <Navbar />
    <div className="flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-extrabold mb-4 text-purple-500 drop-shadow-lg tracking-widest">MGCU Universe</h1>
      <p className="max-w-xl mx-auto text-lg md:text-xl text-white bg-gradient-to-r from-blue-400 via-yellow-400 to-pink-500 p-4 rounded-xl shadow-lg mb-8">
        Dive into the timeline, lore, and wildest events of the Marcus Graham Connected Universe. The 90s never ended here!
      </p>
      <div className="w-full max-w-2xl bg-white bg-opacity-80 rounded-lg p-6 shadow-lg">
        {/* TODO: Render timeline/lore here */}
        <p className="text-gray-700">Timeline and lore coming soon...</p>
      </div>
    </div>
  </ThemeWrapper>
);

export default MGCUUniverse; 