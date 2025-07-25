import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const correctPassword = 'BANANA';

const Brians42nd: React.FC = () => {
  const [password, setPassword] = useState('');
  const [access, setAccess] = useState(false);
  const [rsvp, setRsvp] = useState('');
  const [showLocation, setShowLocation] = useState(false);
  const [request, setRequest] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const [showMemories, setShowMemories] = useState(false);

  // Image carousel for 90s nostalgia
  const nostalgiaImages = [
    '/assets/90s-nostalgia-1.jpg', // Placeholder for 90s gaming setup
    '/assets/90s-nostalgia-2.jpg', // Placeholder for 90s fashion
    '/assets/90s-nostalgia-3.jpg', // Placeholder for 90s snacks
    '/assets/90s-nostalgia-4.jpg', // Placeholder for 90s music
  ];

  // Auto-rotate images
  useEffect(() => {
    if (access) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % nostalgiaImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [access, nostalgiaImages.length]);

  // Confetti animation
  useEffect(() => {
    if (rsvp === 'yes') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [rsvp]);

  const handleAccess = () => {
    if (password === correctPassword) {
      setAccess(true);
      setGuestCount(Math.floor(Math.random() * 50) + 20); // Random guest count
    } else {
      setError('Incorrect password.');
    }
  };

  const handleRsvp = (response: string) => {
    setRsvp(response);
    if (response === 'yes') {
      setShowLocation(true);
      setGuestCount(prev => prev + 1);
    } else {
      setShowLocation(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'brians42nd_rsvp'), {
        rsvp,
        request,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch {
      setError('There was an error. Please try again.');
    }
  };

  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random() * 2}s`,
          }}
        >
          <div className={`w-2 h-2 rounded-full ${
            ['bg-pink-400', 'bg-purple-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-400'][Math.floor(Math.random() * 5)]
          }`} />
        </div>
      ))}
    </div>
  );

  if (!access) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-600 text-white px-4">
        <div className="animate-bounce mb-8">
          <div className="text-6xl">🎉</div>
        </div>
        <h1 className="text-4xl font-bold mb-4 animate-pulse">Enter Party Access Code</h1>
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
          <input
            placeholder="Enter Password"
            className="mb-4 text-black px-6 py-3 rounded-lg w-64 text-center font-bold text-lg"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            type="password"
          />
          <button 
            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105" 
            onClick={handleAccess}
          >
            Unlock Invite
          </button>
          {error && <div className="text-red-400 mt-4 animate-pulse">{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-600 text-white py-10 px-6 relative overflow-hidden">
      {showConfetti && <Confetti />}
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-spin-slow opacity-20">🎮</div>
        <div className="absolute top-40 right-20 animate-bounce opacity-20">🎵</div>
        <div className="absolute bottom-20 left-20 animate-pulse opacity-20">🏈</div>
        <div className="absolute bottom-40 right-10 animate-spin-slow opacity-20">📺</div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            🕹️ Proc's 42nd Birthday Celebration
          </h1>
          <p className="text-xl md:text-2xl font-semibold">Sunday, September 7 • 12 PM – 8 PM</p>
          <p className="text-2xl md:text-3xl font-bold text-yellow-400">🏈 First NFL Sunday of the 2025 Season</p>
          <p className="text-lg italic max-w-3xl mx-auto leading-relaxed">
            On Sunday, September 7, we're throwing it back while turning up — for the First NFL Sunday of the 2025 season, and my 42nd birthday celebration. Let's celebrate with good food, good drank and that unforgettable 90s–2000s energy.
          </p>
        </div>

        {/* Image Carousel */}
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">📸</div>
              <p className="text-xl font-bold">90s Nostalgia Gallery</p>
              <p className="text-sm opacity-80">Image placeholders for 90s memories</p>
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {nostalgiaImages.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentImage ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* RSVP Section */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Will You Be There?</h2>
            <div className="flex flex-wrap justify-center space-x-4 mb-6">
              <button 
                className={`px-8 py-4 rounded-xl font-bold border-2 transition-all duration-300 transform hover:scale-110 ${
                  rsvp==='yes'?'bg-green-600 border-green-400 shadow-lg shadow-green-500/50':'bg-white/10 border-white/20 hover:bg-green-600/20'
                }`} 
                onClick={() => handleRsvp('yes')}
              >
                🎉 I'm Cat
              </button>
              <button 
                className={`px-8 py-4 rounded-xl font-bold border-2 transition-all duration-300 transform hover:scale-110 ${
                  rsvp==='maybe'?'bg-yellow-500 border-yellow-300 shadow-lg shadow-yellow-500/50':'bg-white/10 border-white/20 hover:bg-yellow-500/20'
                }`} 
                onClick={() => handleRsvp('maybe')}
              >
                🤔 I'm Lukeward
              </button>
              <button 
                className={`px-8 py-4 rounded-xl font-bold border-2 transition-all duration-300 transform hover:scale-110 ${
                  rsvp==='no'?'bg-gray-600 border-gray-400 shadow-lg shadow-gray-500/50':'bg-white/10 border-white/20 hover:bg-gray-600/20'
                }`} 
                onClick={() => handleRsvp('no')}
              >
                😔 I'm Cat
              </button>
            </div>

            {/* Guest Counter */}
            <div className="text-center mb-6">
              <p className="text-lg">🎊 <span className="font-bold text-pink-400">{guestCount}</span> people are coming!</p>
            </div>

            {showLocation && (
              <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-6 rounded-xl mb-6 border border-green-400/30 animate-fade-in">
                <p className="text-xl font-semibold mb-3">🎉 Party Location:</p>
                <p className="text-lg"><strong>Château de la Proc</strong></p>
                <p className="text-lg">8308 Aletta Pl, Severn, MD 21144</p>
                <button 
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
                  onClick={() => window.open('https://maps.google.com/?q=8308+Aletta+Pl,+Severn,+MD+21144', '_blank')}
                >
                  📍 Get Directions
                </button>
              </div>
            )}

            {rsvp && !submitted && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
                <p className="text-lg font-semibold">Any song requests or 90s snacks we should bring back?</p>
                <textarea
                  placeholder="Type your requests here..."
                  className="w-full p-4 rounded-xl text-black text-lg resize-none"
                  value={request}
                  onChange={e => setRequest(e.target.value)}
                  rows={3}
                />
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  🎉 Send RSVP
                </button>
              </form>
            )}
            {submitted && (
              <div className="text-center animate-bounce">
                <div className="text-4xl mb-2">🎉</div>
                <div className="text-green-400 font-bold text-xl">RSVP received! Thank you!</div>
              </div>
            )}
          </div>
        </div>

        {/* Event Highlights */}
        <div className="flex justify-center">
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 max-w-md">
            <h3 className="text-2xl font-bold mb-4 text-pink-400">💾 Entertainment Zone</h3>
            <ul className="space-y-2 text-lg">
              <li>🎶 90's / 2000's Culture</li>
              <li>📺 90s Media + NFL RedZone</li>
              <li>🎤 Karaoke Throwback</li>
              <li>📻 Throwback Radio</li>
            </ul>
          </div>
        </div>

        {/* Food & Drinks */}
        <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 p-6 rounded-2xl border border-yellow-400/30">
          <h3 className="text-2xl font-bold mb-4 text-center text-yellow-400">🍕 90s Snack Attack</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl mb-2">🧃</div>
              <p className="font-semibold">Severn Tea & Omega Lean</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🍿</div>
              <p className="font-semibold">Pop Secret Popcorn</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🍪</div>
              <p className="font-semibold">Oreos & Chips Ahoy!</p>
            </div>
          </div>
        </div>

        {/* Special Offers */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 rounded-2xl border border-purple-400/30 text-center animate-pulse">
          <h3 className="text-2xl font-bold mb-4 text-purple-400">🎁 Special Perks</h3>
          <p className="text-lg mb-2">First 20 RSVPs get a <strong>90s Party Pack!</strong></p>
          <p className="text-sm opacity-80">Includes retro snacks, stickers, and exclusive merch</p>
        </div>

        {/* Interactive Memories Section */}
        <div className="text-center">
          <button 
            onClick={() => setShowMemories(!showMemories)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
          >
            {showMemories ? '🙈 Hide' : '📸 Show'} 90s Memories
          </button>
          
          {showMemories && (
            <div className="mt-6 grid md:grid-cols-3 gap-4 animate-fade-in">
              <div className="bg-white/10 p-4 rounded-xl">
                <div className="text-4xl mb-2">📼</div>
                <p className="font-semibold">VHS Collection</p>
                <p className="text-sm opacity-80">Classic movies & shows</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl">
                <div className="text-4xl mb-2">🎵</div>
                <p className="font-semibold">Mixtape Station</p>
                <p className="text-sm opacity-80">Create your own mix</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl">
                <div className="text-4xl mb-2">📷</div>
                <p className="font-semibold">Polaroid Corner</p>
                <p className="text-sm opacity-80">Instant memories</p>
              </div>
            </div>
          )}
        </div>

        <p className="text-center italic text-xl pt-8 animate-pulse">
          "It's my birthday, but <em>you're</em> getting the experience."
        </p>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Brians42nd; 