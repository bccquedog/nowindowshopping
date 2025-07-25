import React from 'react';
import ThemeWrapper from './ThemeWrapper';
import Navbar from './Navbar';

const MGCUChapter: React.FC = () => (
  <ThemeWrapper>
    <Navbar />
    <div className="flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-2xl font-extrabold mb-4 text-pink-500 drop-shadow-lg tracking-widest">Chapter 1: The Beginning</h1>
      <div className="max-w-2xl mx-auto text-lg md:text-xl text-white bg-gradient-to-r from-yellow-400 via-blue-400 to-pink-500 p-6 rounded-xl shadow-lg mb-8">
        <p>Chapter content goes here. Relive the 90s with every choice you make!</p>
      </div>
      <div className="flex gap-4 justify-center">
        <a href="#prev" className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all">Previous</a>
        <a href="#next" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition-all">Next</a>
      </div>
    </div>
  </ThemeWrapper>
);

export default MGCUChapter; 