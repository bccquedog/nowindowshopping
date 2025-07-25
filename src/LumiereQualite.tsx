import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LumiereQualite: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState('heritage');

  const collections = [
    {
      id: 'heritage',
      name: 'Heritage Collection',
      description: 'Timeless classics that embody tradition and sophistication',
      watches: [
        { name: 'Chronograph Classique', price: '$2,850', image: 'https://via.placeholder.com/300x200/1a1a1a/ffffff?text=Chronograph+Classique' },
        { name: 'Automatic Elegance', price: '$1,950', image: 'https://via.placeholder.com/300x200/1a1a1a/ffffff?text=Automatic+Elegance' },
        { name: 'Moon Phase Royal', price: '$3,200', image: 'https://via.placeholder.com/300x200/1a1a1a/ffffff?text=Moon+Phase+Royal' }
      ]
    },
    {
      id: 'modern',
      name: 'Modern Collection',
      description: 'Contemporary designs that push the boundaries of innovation',
      watches: [
        { name: 'Skeleton Avant-Garde', price: '$4,100', image: 'https://via.placeholder.com/300x200/1a1a1a/ffffff?text=Skeleton+Avant-Garde' },
        { name: 'Chronometer Sport', price: '$2,650', image: 'https://via.placeholder.com/300x200/1a1a1a/ffffff?text=Chronometer+Sport' },
        { name: 'Minimalist Pure', price: '$1,750', image: 'https://via.placeholder.com/300x200/1a1a1a/ffffff?text=Minimalist+Pure' }
      ]
    },
    {
      id: 'limited',
      name: 'Limited Edition',
      description: 'Exclusive pieces for the discerning collector',
      watches: [
        { name: 'Tourbillon Prestige', price: '$12,500', image: 'https://via.placeholder.com/300x200/1a1a1a/ffffff?text=Tourbillon+Prestige' },
        { name: 'Perpetual Calendar', price: '$8,900', image: 'https://via.placeholder.com/300x200/1a1a1a/ffffff?text=Perpetual+Calendar' },
        { name: 'Grand Complication', price: '$15,200', image: 'https://via.placeholder.com/300x200/1a1a1a/ffffff?text=Grand+Complication' }
      ]
    }
  ];

  const currentCollection = collections.find(c => c.id === selectedCollection);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="relative">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <Link 
            to="/hub" 
            className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Hub
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wider">
            LUMINÈRE QUALITÉ
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Where elegance meets precision craftsmanship. Each timepiece is a testament to timeless beauty and exceptional quality.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <span>Swiss Made</span>
            <span>•</span>
            <span>Handcrafted</span>
            <span>•</span>
            <span>Limited Production</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 bg-opacity-90 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-8 py-4">
            {collections.map(collection => (
              <button
                key={collection.id}
                onClick={() => setSelectedCollection(collection.id)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCollection === collection.id
                    ? 'bg-white text-gray-900 font-semibold'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {collection.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Collection Content */}
      <main className="container mx-auto px-4 py-16">
        {currentCollection && (
          <div className="space-y-12">
            {/* Collection Header */}
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">{currentCollection.name}</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                {currentCollection.description}
              </p>
            </div>

            {/* Watches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentCollection.watches.map((watch, index) => (
                <div key={index} className="bg-gray-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group">
                  <div className="relative">
                    <img 
                      src={watch.image} 
                      alt={watch.name}
                      className="w-full h-64 object-cover group-hover:brightness-110 transition-all"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-full bg-white text-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{watch.name}</h3>
                    <p className="text-2xl font-bold text-yellow-400 mb-4">{watch.price}</p>
                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span>Swiss Movement</span>
                      <span>Sapphire Crystal</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Features Section */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Craftsmanship Excellence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Swiss Precision</h3>
              <p className="text-gray-300">Each movement is meticulously crafted in Switzerland, ensuring unparalleled accuracy and reliability.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Materials</h3>
              <p className="text-gray-300">Only the finest materials are selected - from 18k gold cases to sapphire crystal dials.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Artisan Finishing</h3>
              <p className="text-gray-300">Every detail is hand-finished by master craftsmen, creating timepieces of extraordinary beauty.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Experience Luminère Qualité</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover the perfect blend of tradition and innovation. Each watch tells a story of excellence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
              Schedule Consultation
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
              View Catalog
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">© 2024 Luminère Qualité. All rights reserved.</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Warranty</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LumiereQualite; 