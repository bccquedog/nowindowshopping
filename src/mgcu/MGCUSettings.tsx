import React from 'react';
import ThemeWrapper from './ThemeWrapper';
import Navbar from './Navbar';

const MGCUSettings: React.FC = () => (
  <ThemeWrapper>
    <Navbar />
    <div className="flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-extrabold mb-4 text-yellow-400 drop-shadow-lg tracking-widest">MGCU Settings</h1>
      <p className="max-w-xl mx-auto text-lg md:text-xl text-white bg-gradient-to-r from-blue-400 via-pink-500 to-yellow-400 p-4 rounded-xl shadow-lg mb-8">
        Customize your MGCU experience. The 90s were all about self-expression!
      </p>
      <div className="w-full max-w-2xl bg-white bg-opacity-80 rounded-lg p-6 shadow-lg">
        {/* TODO: Render settings options here */}
        <p className="text-gray-700">Settings coming soon...</p>
      </div>
    </div>
  </ThemeWrapper>
);

export default MGCUSettings; 