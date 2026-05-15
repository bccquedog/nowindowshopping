import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { FaArrowLeft, FaStar } from 'react-icons/fa6';
import { getRaffleById } from './raffleService';
import RaffleCountdown from './RaffleCountdown';
import RaffleCheckout from './RaffleCheckout';
import type { Raffle } from './types';

const RaffleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const [raffle, setRaffle] = useState<Raffle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getRaffleById(id)
      .then(setRaffle)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false));
  }, [id]);

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white" />
      </div>
    );
  }

  if (error || !raffle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error ?? 'Raffle not found'}</p>
          <Link to="/raffle" className="text-blue-600 dark:text-blue-400 hover:underline">
            Back to Raffles
          </Link>
        </div>
      </div>
    );
  }

  const isActive = raffle.status === 'active';
  const isCompleted = raffle.status === 'completed';
  const isCooldown = raffle.status === 'cooldown';
  const canBuy = isActive;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          to="/raffle"
          className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
        >
          <FaArrowLeft className="w-5 h-5" />
          Back to Raffles
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="aspect-video bg-gray-200 dark:bg-gray-700">
            {raffle.imageUrl ? (
              <img src={raffle.imageUrl} alt={raffle.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FaStar className="text-6xl text-gray-400" />
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{raffle.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{raffle.description}</p>

            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300">
                {formatPrice(raffle.pricePerTicket)} per ticket
              </span>
              <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300">
                {raffle.winnerCount} winner{raffle.winnerCount > 1 ? 's' : ''}
              </span>
            </div>

            {isActive && (
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Time remaining</h3>
                <RaffleCountdown raffle={raffle} />
              </div>
            )}

            {isCooldown && (
              <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                <p className="text-amber-800 dark:text-amber-200 font-medium">
                  Raffle ended. Winners will be announced shortly.
                </p>
              </div>
            )}

            {isCompleted && raffle.winners && raffle.winners.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Winners</h3>
                <ul className="space-y-2">
                  {raffle.winners.map((w, i) => (
                    <li
                      key={w.entryId}
                      className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg"
                    >
                      <span className="font-bold text-amber-600 dark:text-amber-400">#{i + 1}</span>
                      <span className="text-gray-900 dark:text-white">
                        {w.displayName || w.email}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {canBuy && (
              <RaffleCheckout raffle={raffle} />
            )}
            {searchParams.get('success') === 'true' && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-800 dark:text-green-200">
                Payment successful! Your entry has been recorded.
              </div>
            )}
            {searchParams.get('canceled') === 'true' && (
              <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-amber-800 dark:text-amber-200">
                Checkout was canceled.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaffleDetail;
