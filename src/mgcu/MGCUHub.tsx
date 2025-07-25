import React from 'react';
import ThemeWrapper from './ThemeWrapper';
import Navbar from './Navbar';

const MGCUHub: React.FC = () => (
  <ThemeWrapper>
    <Navbar />
    <div className="mgcu-theme min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-5xl font-extrabold mb-4 text-pink-500 drop-shadow-lg tracking-widest animate-bounce">MGCU</h1>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400">Marcus Graham Connected Universe</h2>
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-white bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-400 p-4 rounded-xl shadow-lg mb-8">
        Welcome to the wildest, boldest, most interactive literary universe of the 90s and beyond. Dive into books, explore the lore, and meet unforgettable characters—all in a world where every choice is a vibe.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <a href="/mgcu/library" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-200 text-lg">📚 Library</a>
        <a href="/mgcu/universe" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-200 text-lg">🌌 Universe</a>
        <a href="/mgcu/characters" className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-200 text-lg">👥 Characters</a>
        <a href="/mgcu/about" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-200 text-lg">📝 About</a>
        <a href="/mgcu/discord" className="bg-green-400 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-200 text-lg">💬 Discord</a>
      </div>
    </div>
  </ThemeWrapper>
);

export default MGCUHub; 