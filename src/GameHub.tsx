import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft,
  FaDice,
  FaCrown,
  FaHouse,
  FaCircleQuestion,
  FaUsers
} from 'react-icons/fa6';

interface GameCard {
  id: string;
  title: string;
  description: string;
  route: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  features: string[];
}

const GameHub: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  
  const games: GameCard[] = [
    {
      id: 'blackjack',
      title: 'BlackjackLux',
      description: 'Elegant 21 with basic strategy coach and luxury felt',
      route: '/blackjack',
      icon: <FaDice className="text-4xl" />,
      color: 'from-emerald-600 to-emerald-800',
      gradient: 'from-emerald-500/20 to-emerald-700/20',
      features: ['Basic Strategy Coach', 'Multi-seat Tables', 'Luxury Theme', 'AI Dealer']
    },
    {
      id: 'checkers',
      title: 'CheckersLux',
      description: 'Premium checkers with strong AI and elegant board',
      route: '/checkers',
      icon: <FaCrown className="text-4xl" />,
      color: 'from-purple-600 to-purple-800',
      gradient: 'from-purple-500/20 to-purple-700/20',
      features: ['Strong AI', 'Multiple Difficulties', 'Elegant Design', 'Tutorial System']
    },
    {
      id: 'tycoon',
      title: 'Tycoon',
      description: 'Luxury property trading with custom house rules',
      route: '/tycoon',
      icon: <FaHouse className="text-4xl" />,
      color: 'from-blue-600 to-blue-800',
      gradient: 'from-blue-500/20 to-blue-700/20',
      features: ['Custom House Rules', 'Property Trading', 'AI Opponents', 'Strategic Depth']
    },
    {
      id: 'spades',
      title: 'NWS Spades',
      description: 'Joker-Joker-Deuce variant with custom house rules',
      route: '/spades',
      icon: <FaCircleQuestion className="text-4xl" />,
      color: 'from-red-600 to-red-800',
      gradient: 'from-red-500/20 to-red-700/20',
      features: ['Custom Deck', 'House Rules', 'Team Play', 'Strategic Bidding']
    },
    {
      id: '5000',
      title: '5000 NWS',
      description: 'NWS House Rules rummy with custom joker values',
      route: '/5000',
      icon: <FaCircleQuestion className="text-4xl" />,
      color: 'from-orange-600 to-orange-800',
      gradient: 'from-orange-500/20 to-orange-700/20',
      features: ['Custom Joker Values', 'Wild Rank Rules', 'Deep Discard', 'AI Opponents']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-onyx to-onyxLight text-ivory">
      {/* Header */}
      <div className="bg-onyxLight border-b border-champagne/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/hub"
              className="p-3 rounded-lg bg-onyxLight text-champagne hover:bg-emerald transition-colors"
            >
              <FaArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-champagne">Game Hub</h1>
              <p className="text-ivory/80">Premium luxury games with elegant design</p>
            </div>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${game.color} p-8 h-80 transition-all duration-300 group-hover:shadow-2xl`}>
                  {/* Background Pattern */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-50`} />
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="text-white">
                        {game.icon}
                      </div>
                      <div className="text-white/80 text-sm font-medium">
                        Premium
                      </div>
                    </div>

                    {/* Title and Description */}
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-white">{game.title}</h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        {game.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <div className="text-white/70 text-xs font-medium uppercase tracking-wide">
                        Features
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {game.features.map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className="px-2 py-1 bg-white/20 rounded-full text-xs text-white/90 backdrop-blur-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Play Options */}
                    <div className="space-y-3">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => navigate(game.route)}
                          className="flex-1 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center space-x-2"
                        >
                          <span className="text-sm">👤</span>
                          <span className="text-sm font-medium">Single Player</span>
                        </button>
                        <button
                          onClick={() => navigate(`/multiplayer/${game.id}`)}
                          className="flex-1 px-4 py-2 bg-emerald/80 text-white rounded-lg hover:bg-emerald transition-colors flex items-center justify-center space-x-2"
                        >
                          <FaUsers className="w-4 h-4" />
                          <span className="text-sm font-medium">Multiplayer</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-16 text-center">
            <div className="bg-onyxLight rounded-2xl p-8 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-champagne mb-4">Luxury Gaming Experience</h2>
              <p className="text-ivory/80 mb-6 leading-relaxed">
                Each game features our signature onyx and champagne luxury theme, 
                sophisticated AI opponents, and professional-grade gameplay mechanics. 
                Whether you're a casual player or a strategic mastermind, our games 
                offer the perfect blend of elegance and entertainment.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-champagne font-semibold mb-2">Premium Design</div>
                  <div className="text-ivory/70">Elegant onyx and champagne theme</div>
                </div>
                <div className="text-center">
                  <div className="text-champagne font-semibold mb-2">Smart AI</div>
                  <div className="text-ivory/70">Adaptive difficulty levels</div>
                </div>
                <div className="text-center">
                  <div className="text-champagne font-semibold mb-2">Professional Quality</div>
                  <div className="text-ivory/70">Smooth animations and polished UI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHub;
