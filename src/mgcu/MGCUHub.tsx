import React from 'react';
import { Link } from 'react-router-dom';
import ThemeWrapper from './ThemeWrapper';
import Navbar from './Navbar';
import { books, formatSeconds } from './booksData';

const MGCUHub: React.FC = () => {
  const featured = books.find((b) => b.audiobook);

  return (
    <ThemeWrapper>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center p-4 md:p-8 max-w-6xl mx-auto">
        <div className="text-center mb-10 mt-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-3 text-pink-500 drop-shadow-lg tracking-widest">
            MGCU
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-yellow-500 mb-4">
            Marcus Graham Connected Universe
          </h2>
          <p className="max-w-2xl mx-auto text-gray-700 md:text-lg">
            A shared world of romance, drama, and reckoning. Standalone novels that share characters,
            cameos, and a city that keeps showing up.
          </p>
        </div>

        {featured && featured.audiobook && (
          <Link
            to={`/mgcu/library/${featured.slug}`}
            className="w-full mb-10 bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-pink-200 hover:shadow-pink-200/50 hover:shadow-2xl transition-shadow group"
          >
            <div className="flex flex-col md:flex-row">
              {featured.coverUrl && (
                <img
                  src={featured.coverUrl}
                  alt={featured.title}
                  className="w-full md:w-72 aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <div className="p-6 md:p-8 flex-1">
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs font-bold tracking-wider uppercase mb-3">
                  🎧 New Audiobook
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
                  {featured.title}
                </h3>
                <p className="text-pink-600 font-semibold mb-1">{featured.genre}</p>
                <p className="text-gray-500 text-sm mb-3">
                  {featured.chapters} chapters · {formatSeconds(featured.audiobook.totalSeconds)} runtime
                </p>
                <p className="text-gray-700 mb-4 line-clamp-3">{featured.description}</p>
                <span className="inline-flex items-center gap-2 text-pink-500 font-bold group-hover:gap-3 transition-all">
                  Listen now <span>→</span>
                </span>
              </div>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 w-full mb-6">
          <NavTile to="/mgcu/library" emoji="📚" label="Library" color="from-pink-500 to-pink-600" />
          <NavTile to="/mgcu/universe" emoji="🌌" label="Universe" color="from-yellow-400 to-yellow-500" />
          <NavTile to="/mgcu/characters" emoji="👥" label="Characters" color="from-blue-400 to-blue-500" />
          <NavTile to="/mgcu/about" emoji="📝" label="About" color="from-purple-500 to-purple-600" />
          <NavTile to="/mgcu/discord" emoji="💬" label="Discord" color="from-green-400 to-green-500" />
        </div>
      </div>
    </ThemeWrapper>
  );
};

interface TileProps {
  to: string;
  emoji: string;
  label: string;
  color: string;
}

const NavTile: React.FC<TileProps> = ({ to, emoji, label, color }) => (
  <Link
    to={to}
    className={`bg-gradient-to-br ${color} hover:brightness-110 text-white font-bold p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center gap-2`}
  >
    <span className="text-3xl">{emoji}</span>
    <span>{label}</span>
  </Link>
);

export default MGCUHub;
