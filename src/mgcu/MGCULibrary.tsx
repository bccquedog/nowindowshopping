import React from 'react';
import ThemeWrapper from './ThemeWrapper';
import Navbar from './Navbar';
import { books } from './booksData';
import { Link } from 'react-router-dom';

const MGCULibrary: React.FC = () => (
  <ThemeWrapper>
    <Navbar />
    <div className="flex flex-col items-center p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-2 text-blue-400 drop-shadow-lg tracking-widest text-center">
        MGCU Library
      </h1>
      <p className="max-w-2xl mx-auto text-center text-gray-700 mb-8">
        The full collection of Marcus Graham Connected Universe novels. Audio-ready titles include the
        🎧 badge — click in to listen or download.
      </p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Link
            key={book.slug}
            to={`/mgcu/library/${book.slug}`}
            className="group bg-white rounded-2xl shadow-lg border border-pink-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 flex flex-col overflow-hidden"
            style={{ fontFamily: 'Poppins, Inter, Nunito, Arial, sans-serif' }}
          >
            <div className="aspect-square bg-gradient-to-br from-pink-100 via-yellow-50 to-blue-100 flex items-center justify-center overflow-hidden relative">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={`${book.title} cover`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                    if (img.parentElement) {
                      img.parentElement.innerHTML = '<span class="text-7xl">📖</span>';
                    }
                  }}
                />
              ) : (
                <span className="text-7xl">📖</span>
              )}
              {book.audiobook && (
                <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs font-bold shadow-lg">
                  🎧 Audio
                </span>
              )}
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h2 className="font-extrabold text-lg text-gray-900 mb-1 tracking-wide line-clamp-2">
                {book.title}
              </h2>
              <p className="text-pink-600 text-sm font-semibold mb-1 line-clamp-1">{book.genre}</p>
              <p className="text-gray-500 text-xs mb-3">{book.chapters} chapters</p>
              <p className="text-gray-600 text-sm flex-1 line-clamp-3">{book.uniqueAngle}</p>
              <div className="mt-4">
                <span className="inline-flex items-center gap-1 text-pink-500 font-semibold text-sm group-hover:gap-2 transition-all">
                  Open <span>→</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </ThemeWrapper>
);

export default MGCULibrary;
