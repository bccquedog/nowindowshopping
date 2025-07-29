import React, { useState } from 'react';
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

  const handleAccess = () => {
    if (password === correctPassword) setAccess(true);
    else setError('Incorrect password.');
  };

  const handleRsvp = (response: string) => {
    setRsvp(response);
    if (response === 'yes') setShowLocation(true);
    else setShowLocation(false);
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

  if (!access) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
        <h1 className="text-3xl font-bold mb-4">🎉 Enter Party Access Code</h1>
        <input
          placeholder="Enter Password"
          className="mb-2 text-black px-4 py-2 rounded"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(''); }}
          type="password"
        />
        <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded font-bold" onClick={handleAccess}>Unlock Invite</button>
        {error && <div className="text-red-400 mt-2">{error}</div>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-600 text-white py-10 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center">🕹️ Brian’s 42nd Birthday Bash</h1>
        <p className="text-center text-lg">Sunday, September 7 • 12 PM – 8 PM</p>
        <p className="text-center text-xl font-semibold">🏈 First NFL Sunday + 90s Throwback Theme</p>
        <p className="text-center italic">Rep your team. Dress like it’s ‘95.</p>

        <div className="bg-white/10 border-white/10 text-white rounded-xl shadow-lg">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Will You Be There?</h2>
            <div className="flex space-x-2 mb-4">
              <button className={`px-6 py-2 rounded font-bold border ${rsvp==='yes'?'bg-green-600 border-green-400':'bg-white/10 border-white/20'} hover:bg-green-700`} onClick={() => handleRsvp('yes')}>I'm OWT</button>
              <button className={`px-6 py-2 rounded font-bold border ${rsvp==='maybe'?'bg-yellow-500 border-yellow-300':'bg-white/10 border-white/20'} hover:bg-yellow-600`} onClick={() => handleRsvp('maybe')}>I'm Lukewarm</button>
              <button className={`px-6 py-2 rounded font-bold border ${rsvp==='no'?'bg-gray-600 border-gray-400':'bg-white/10 border-white/20'} hover:bg-gray-700`} onClick={() => handleRsvp('no')}>I'm Cat</button>
            </div>
            {showLocation && (
              <div className="bg-white/10 p-4 rounded mb-4">
                <p className="text-lg font-semibold mb-2">🎉 Party Location:</p>
                <p><strong>Château de la Proc</strong></p>
                <p>8308 Aletta Pl, Severn, MD 21144</p>
              </div>
            )}
            {rsvp && !submitted && (
              <form onSubmit={handleSubmit} className="mt-6">
                <p className="mb-2">Any song requests or 90s snacks we should bring back?</p>
                <textarea
                  placeholder="Type here…"
                  className="w-full p-2 rounded text-black"
                  value={request}
                  onChange={e => setRequest(e.target.value)}
                  rows={2}
                />
                <button type="submit" className="mt-3 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded font-bold">Send RSVP</button>
              </form>
            )}
            {submitted && <div className="mt-4 text-green-400 font-bold">RSVP received! Thank you!</div>}
          </div>
        </div>

        <div className="bg-white/5 p-4 rounded space-y-2">
          <p>💾 Sega & N64 Tourneys</p>
          <p>🎶 DJ Requests Open</p>
          <p>📺 90s Cartoons + NFL RedZone</p>
          <p>🧃Capri Suns, Kool-Aid, and more</p>
          <p>🎁 First 20 RSVPs get a 90s Party Pack!</p>
        </div>

        <p className="text-center italic pt-6">“It’s my birthday, but <em>you’re</em> getting the experience.”</p>
      </div>
    </div>
  );
};

export default Brians42nd; 