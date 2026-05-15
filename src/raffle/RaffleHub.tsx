import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaStar } from 'react-icons/fa6';
import { getActiveRaffles, getUpcomingRaffles, getCompletedRaffles } from './raffleService';
import type { Raffle } from './types';

const RaffleHub: React.FC = () => {
  const [activeRaffles, setActiveRaffles] = useState<Raffle[]>([]);
  const [upcomingRaffles, setUpcomingRaffles] = useState<Raffle[]>([]);
  const [completedRaffles, setCompletedRaffles] = useState<Raffle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [active, upcoming, completed] = await Promise.all([
          getActiveRaffles(),
          getUpcomingRaffles(),
          getCompletedRaffles(),
        ]);
        setActiveRaffles(active);
        setUpcomingRaffles(upcoming);
        setCompletedRaffles(completed);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load raffles');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  const RaffleCard = ({ raffle, variant }: { raffle: Raffle; variant: 'active' | 'upcoming' | 'completed' }) => {
    const endsAt = raffle.endsAt instanceof Date ? raffle.endsAt : new Date((raffle.endsAt as { seconds: number }).seconds * 1000);
    const isActive = variant === 'active';
    const isCompleted = variant === 'completed';

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
        <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
          {raffle.imageUrl ? (
            <img src={raffle.imageUrl} alt={raffle.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FaStar className="text-4xl text-gray-400" />
            </div>
          )}
          {isActive && (
            <span className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded">
              Live
            </span>
          )}
          {isCompleted && (
            <span className="absolute top-2 left-2 px-2 py-1 bg-amber-500 text-white text-xs font-semibold rounded">
              Completed
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{raffle.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{raffle.description}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700 dark:text-gray-300">{formatPrice(raffle.pricePerTicket)}/ticket</span>
            {!isCompleted && (
              <span className="text-gray-500 dark:text-gray-400">
                {isActive ? `Ends ${endsAt.toLocaleDateString()}` : `Starts ${(raffle.startsAt instanceof Date ? raffle.startsAt : new Date((raffle.startsAt as { seconds: number }).seconds * 1000)).toLocaleDateString()}`}
              </span>
            )}
          </div>
          <Link
            to={`/raffle/${raffle.id}`}
            className="mt-4 block w-full py-2 text-center bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            {isCompleted ? 'View Results' : 'View Details'}
          </Link>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <Link to="/hub" className="text-blue-600 dark:text-blue-400 hover:underline">
            Back to Hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/hub"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <FaArrowLeft className="w-5 h-5" />
            Back to Hub
          </Link>
          <Link
            to="/raffle/admin"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Admin
          </Link>
        </div>

        <div className="text-center mb-12">
          <FaStar className="text-5xl mx-auto mb-4 text-amber-500" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Raffles</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Enter for a chance to win exclusive items. Each raffle has a countdown—buy tickets before time runs out!
          </p>
        </div>

        {activeRaffles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Active Raffles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeRaffles.map((raffle, i) => (
                <motion.div
                  key={raffle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <RaffleCard raffle={raffle} variant="active" />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {upcomingRaffles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upcoming</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingRaffles.map((raffle, i) => (
                <motion.div
                  key={raffle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (activeRaffles.length + i) * 0.1 }}
                >
                  <RaffleCard raffle={raffle} variant="upcoming" />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {completedRaffles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FaStar className="text-amber-500" />
              Past Winners
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedRaffles.slice(0, 6).map((raffle, i) => (
                <motion.div
                  key={raffle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (activeRaffles.length + upcomingRaffles.length + i) * 0.1 }}
                >
                  <RaffleCard raffle={raffle} variant="completed" />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {activeRaffles.length === 0 && upcomingRaffles.length === 0 && completedRaffles.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <FaStar className="text-6xl mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No raffles yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Check back soon for new raffles, or create one in the admin panel.
            </p>
            <Link
              to="/raffle/admin"
              className="inline-block px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
            >
              Go to Admin
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RaffleHub;
