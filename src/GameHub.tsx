import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft,
  FaDice,
  FaCrown,
  FaHouse,
  FaCircleQuestion,
  FaUsers,
  FaUser,
  FaLayerGroup
} from 'react-icons/fa6';

interface GameCard {
  id: string;
  title: string;
  description: string;
  route: string;
  icon: React.ReactNode;
  accent: string;
  features: string[];
}

const GameHub: React.FC = () => {
  const navigate = useNavigate();
  
  const games: GameCard[] = [
    {
      id: 'blackjack',
      title: 'BlackjackLux',
      description: 'Elegant 21 with basic strategy coach and luxury felt',
      route: '/blackjack',
      icon: <FaDice className="text-4xl" />,
      accent: 'text-emerald-700 bg-emerald-50 border-emerald-100',
      features: ['Basic Strategy Coach', 'Multi-seat Tables', 'Luxury Theme', 'AI Dealer']
    },
    {
      id: 'checkers',
      title: 'CheckersLux',
      description: 'Premium checkers with strong AI and elegant board',
      route: '/checkers',
      icon: <FaCrown className="text-4xl" />,
      accent: 'text-indigo-700 bg-indigo-50 border-indigo-100',
      features: ['Strong AI', 'Multiple Difficulties', 'Elegant Design', 'Tutorial System']
    },
    {
      id: 'tycoon',
      title: 'Tycoon',
      description: 'Luxury property trading with custom house rules',
      route: '/tycoon',
      icon: <FaHouse className="text-4xl" />,
      accent: 'text-sky-700 bg-sky-50 border-sky-100',
      features: ['Custom House Rules', 'Property Trading', 'AI Opponents', 'Strategic Depth']
    },
    {
      id: 'spades',
      title: 'NWS Spades',
      description: 'Joker-Joker-Deuce variant with custom house rules',
      route: '/spades',
      icon: <FaCircleQuestion className="text-4xl" />,
      accent: 'text-rose-700 bg-rose-50 border-rose-100',
      features: ['Custom Deck', 'House Rules', 'Team Play', 'Strategic Bidding']
    },
    {
      id: '5000',
      title: '5000 NWS',
      description: 'NWS House Rules rummy with custom joker values',
      route: '/5000',
      icon: <FaCircleQuestion className="text-4xl" />,
      accent: 'text-amber-700 bg-amber-50 border-amber-100',
      features: ['Custom Joker Values', 'Wild Rank Rules', 'Deep Discard', 'AI Opponents']
    },
    {
      id: 'holdem',
      title: 'HoldemLux',
      description: 'Elegant Texas Hold\'em with adaptive AI and luxury table',
      route: '/holdem',
      icon: <FaCircleQuestion className="text-4xl" />,
      accent: 'text-stone-700 bg-stone-50 border-stone-200',
      features: ['Adaptive AI', 'Position-Aware', 'Luxury Theme', 'Multiplayer Ready']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="border-b border-gray-200 bg-white/95 px-4 py-4 shadow-sm backdrop-blur sm:px-6">
        <div className="game-header-inner">
          <div className="flex items-center gap-4">
            <Link
              to="/hub"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <FaArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-950 sm:text-3xl">Game Hub</h1>
              <p className="text-sm text-gray-600">Table games, cards, and strategy boards in one simple place.</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 sm:flex">
            <FaLayerGroup className="text-blue-600" />
            {games.length} playable rooms
          </div>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -3 }}
                className="group"
              >
                <div className="h-full min-h-[300px] rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 group-hover:border-blue-200 group-hover:shadow-md">
                  <div className="flex h-full flex-col justify-between gap-5">
                    <div className="flex items-center justify-between">
                      <div className={`rounded-lg border p-3 ${game.accent}`}>
                        {game.icon}
                      </div>
                      <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold uppercase text-gray-500">
                        Play
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gray-950">{game.title}</h3>
                      <p className="text-sm leading-relaxed text-gray-600">
                        {game.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-semibold uppercase text-gray-500">
                        Features
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {game.features.map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-600"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => navigate(game.route)}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <FaUser className="h-4 w-4" />
                        Solo
                      </button>
                      <button
                        onClick={() => navigate(`/multiplayer/${game.id}`)}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                      >
                        <FaUsers className="h-4 w-4" />
                        Group
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="game-panel mt-8">
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
              <div>
                <div className="game-stat-label">Theme</div>
                <div className="mt-1 text-gray-600">Clean cards, calmer color, and easier scanning.</div>
              </div>
              <div>
                <div className="game-stat-label">Modes</div>
                <div className="mt-1 text-gray-600">Solo play and multiplayer entries stay one click away.</div>
              </div>
              <div>
                <div className="game-stat-label">Pace</div>
                <div className="mt-1 text-gray-600">Cards, stats, and actions are grouped for faster scanning.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHub;
