import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ThemeWrapper from './ThemeWrapper';
import Navbar from './Navbar';
import { findBook } from './booksData';
import MGCUAudiobookPlayer from './MGCUAudiobookPlayer';

const MGCUBook: React.FC = () => {
  const { book: slug } = useParams<{ book: string }>();
  const book = slug ? findBook(slug) : undefined;

  if (!book) {
    return (
      <ThemeWrapper>
        <Navbar />
        <div className="flex flex-col items-center justify-center text-center p-8">
          <h1 className="text-3xl font-extrabold mb-4 text-pink-500">Book not found</h1>
          <Link to="/mgcu/library" className="text-blue-500 underline">
            Back to library
          </Link>
        </div>
      </ThemeWrapper>
    );
  }

  return (
    <ThemeWrapper>
      <Navbar />
      <div className="flex flex-col items-center p-4 md:p-8 max-w-6xl mx-auto">
        <div className="w-full flex flex-col md:flex-row gap-6 mb-8">
          {book.coverUrl && (
            <img
              src={book.coverUrl}
              alt={`${book.title} cover`}
              className="w-48 md:w-64 aspect-square object-cover rounded-2xl shadow-2xl flex-shrink-0 mx-auto md:mx-0"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-gray-900 tracking-tight">
              {book.title}
            </h1>
            <p className="text-pink-600 font-semibold mb-1">{book.genre}</p>
            <p className="text-gray-500 text-sm mb-4">
              {book.structure} · {book.chapters} chapters
            </p>
            {book.description && (
              <p className="text-gray-800 leading-relaxed mb-4">{book.description}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-white bg-opacity-70 rounded-lg p-3 border border-pink-100">
                <p className="font-semibold text-gray-700 mb-1">Core themes</p>
                <p className="text-gray-600">{book.coreThemes}</p>
              </div>
              <div className="bg-white bg-opacity-70 rounded-lg p-3 border border-pink-100">
                <p className="font-semibold text-gray-700 mb-1">MGCU ties</p>
                <p className="text-gray-600">{book.mgcuTies}</p>
              </div>
            </div>
          </div>
        </div>

        {book.audiobook ? (
          <>
            <div className="w-full text-center mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs font-bold tracking-wider uppercase shadow">
                🎧 Audiobook
              </span>
            </div>
            <MGCUAudiobookPlayer
              bookTitle={book.title}
              bookSlug={book.slug}
              audiobook={book.audiobook}
            />
          </>
        ) : (
          <div className="w-full max-w-2xl bg-white bg-opacity-80 rounded-2xl p-6 text-center shadow">
            <p className="text-gray-700 mb-2">Audiobook coming soon for this title.</p>
            <Link to="/mgcu/library" className="text-pink-500 font-semibold hover:underline">
              ← Back to library
            </Link>
          </div>
        )}
      </div>
    </ThemeWrapper>
  );
};

export default MGCUBook;
