import React, { useState, useEffect } from 'react';
import type { Raffle } from './types';

interface RaffleCountdownProps {
  raffle: Raffle;
  onExpired?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function getTimeLeft(endsAt: Date | { seconds: number; nanoseconds: number } | undefined): TimeLeft | null {
  if (!endsAt) return null;
  const end = endsAt instanceof Date ? endsAt : new Date(endsAt.seconds * 1000 + endsAt.nanoseconds / 1e6);
  const now = new Date();
  const total = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return { days, hours, minutes, seconds, total };
}

const RaffleCountdown: React.FC<RaffleCountdownProps> = ({ raffle, onExpired }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    getTimeLeft(raffle.endsAt)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const next = getTimeLeft(raffle.endsAt);
      setTimeLeft(next);
      if (next && next.total === 0 && onExpired) {
        onExpired();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [raffle.endsAt, onExpired]);

  if (!timeLeft) return null;

  if (timeLeft.total === 0) {
    return (
      <div className="text-lg font-semibold text-amber-600 dark:text-amber-400">
        Raffle ended
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <div className="flex flex-col items-center min-w-[4rem]">
        <span className="text-2xl sm:text-3xl font-bold tabular-nums text-gray-900 dark:text-white">
          {String(timeLeft.days).padStart(2, '0')}
        </span>
        <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Days</span>
      </div>
      <div className="flex flex-col items-center min-w-[4rem]">
        <span className="text-2xl sm:text-3xl font-bold tabular-nums text-gray-900 dark:text-white">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Hours</span>
      </div>
      <div className="flex flex-col items-center min-w-[4rem]">
        <span className="text-2xl sm:text-3xl font-bold tabular-nums text-gray-900 dark:text-white">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Min</span>
      </div>
      <div className="flex flex-col items-center min-w-[4rem]">
        <span className="text-2xl sm:text-3xl font-bold tabular-nums text-gray-900 dark:text-white">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Sec</span>
      </div>
    </div>
  );
};

export default RaffleCountdown;
