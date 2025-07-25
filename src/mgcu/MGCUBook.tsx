import React from 'react';
import ThemeWrapper from './ThemeWrapper';
import Navbar from './Navbar';

const MGCUBook: React.FC = () => (
  <ThemeWrapper>
    <Navbar />
    <div className="flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-3xl font-extrabold mb-4 text-yellow-400 drop-shadow-lg tracking-widest">Book Title</h1>
      <p className="max-w-xl mx-auto text-lg md:text-xl text-white bg-gradient-to-r from-blue-400 via-pink-500 to-yellow-400 p-4 rounded-xl shadow-lg mb-8">
        Book description and 90s nostalgia here. Choose a chapter to begin!
      </p>
      <div className="w-full max-w-lg grid grid-cols-1 gap-4">
        {/* TODO: Render chapter links here */}
        <a href="/mgcu/library/sample-book/1" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-full shadow transition-all">Chapter 1: The Beginning</a>
      </div>
    </div>
  </ThemeWrapper>
);

export default MGCUBook; 