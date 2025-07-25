import React from 'react';
import ThemeWrapper from './ThemeWrapper';
import Navbar from './Navbar';
import { books } from './booksData';
import { Link } from 'react-router-dom';

const MGCULibrary: React.FC = () => (
  <ThemeWrapper>
    <Navbar />
    <div className="flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-extrabold mb-4 text-blue-400 drop-shadow-lg tracking-widest">MGCU Library</h1>
      <p className="max-w-xl mx-auto text-lg md:text-xl text-gray-700 bg-gradient-to-r from-yellow-100 via-pink-100 to-blue-100 p-4 rounded-xl shadow mb-8">
        Explore the full collection of Marcus Graham Connected Universe novels. Click a book to start your interactive journey!
      </p>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {books.map(book => (
          <div key={book.slug} className="bg-white rounded-2xl shadow-lg border border-pink-200 hover:shadow-2xl transition-shadow duration-200 flex flex-col items-center p-6">
            <span className="text-4xl mb-3">📖</span>
            <h2 className="font-extrabold text-xl text-gray-900 mb-1 tracking-wide" style={{ fontFamily: 'Poppins, Inter, Nunito, Arial, sans-serif' }}>{book.title}</h2>
            <p className="text-pink-600 font-semibold mb-1">{book.genre}</p>
            <p className="text-gray-500 text-sm mb-3">{book.structure} — {book.chapters} Chapters</p>
            <Link
              to={`/mgcu/library/${book.slug}`}
              className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-bold py-2 px-6 rounded-full shadow hover:from-pink-600 hover:to-yellow-500 transition-colors flex items-center gap-2"
              style={{ fontFamily: 'Poppins, Inter, Nunito, Arial, sans-serif' }}
            >
              <span>Read</span> <span>→</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </ThemeWrapper>
);

export default MGCULibrary; 