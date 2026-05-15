import React, { useState } from 'react';
import type { Raffle } from './types';

interface RaffleCheckoutProps {
  raffle: Raffle;
}

const RaffleCheckout: React.FC<RaffleCheckoutProps> = ({ raffle }) => {
  const [ticketCount, setTicketCount] = useState(1);
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;
  const totalCents = raffle.pricePerTicket * ticketCount;

  const handleCheckout = async () => {
    setError(null);
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    setLoading(true);
    try {
      const baseUrl = window.location.origin;
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          raffleId: raffle.id,
          ticketCount,
          pricePerTicket: raffle.pricePerTicket,
          email: email.trim(),
          displayName: displayName.trim() || undefined,
          successUrl: `${baseUrl}/raffle/${raffle.id}?success=true`,
          cancelUrl: `${baseUrl}/raffle/${raffle.id}?canceled=true`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Buy Tickets</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display name (optional)</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="How you want to be shown if you win"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of tickets</label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setTicketCount((c) => Math.max(1, c - 1))}
              className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center text-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              -
            </button>
            <span className="text-xl font-semibold w-12 text-center">{ticketCount}</span>
            <button
              type="button"
              onClick={() => setTicketCount((c) => c + 1)}
              className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center text-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              +
            </button>
          </div>
        </div>
        <div className="text-lg font-semibold text-gray-900 dark:text-white">
          Total: {formatPrice(totalCents)}
        </div>
        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        )}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-3 px-6 bg-gray-900 dark:bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Redirecting to checkout...' : `Buy ${ticketCount} Ticket${ticketCount > 1 ? 's' : ''}`}
        </button>
      </div>
    </div>
  );
};

export default RaffleCheckout;
