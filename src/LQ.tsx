import React, { useState } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const LQ: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await addDoc(collection(db, 'lq_waitlist'), {
        email,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      setError('There was an error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 dark:from-yellow-900 dark:via-pink-900 dark:to-blue-900 py-12 px-4">
      <div className="max-w-xl bg-white dark:bg-gray-900 rounded-xl shadow-lg p-10 border border-gray-200 dark:border-gray-700 text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-yellow-500 dark:text-yellow-300 tracking-widest drop-shadow-lg">Luminère Qualité</h1>
        <p className="text-2xl text-gray-700 dark:text-gray-200 mb-8 font-semibold">Coming Soon</p>
        <p className="text-md text-gray-500 dark:text-gray-400 mb-8">A new experience is on the way. Stay tuned for updates!</p>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mt-4">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email to join the waitlist"
              className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800 dark:text-white"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Join Waitlist
            </button>
            {error && <div className="text-red-600 dark:text-red-400 mt-2">{error}</div>}
          </form>
        ) : (
          <div className="mt-6 text-green-600 dark:text-green-400 font-semibold">
            Thank you! You’ve been added to the waitlist.
          </div>
        )}
      </div>
    </div>
  );
};

export default LQ; 