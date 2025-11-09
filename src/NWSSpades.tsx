import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaGear, FaCircleQuestion } from 'react-icons/fa6';

const NWSSpades: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showHints, setShowHints] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-onyx to-onyxLight text-ivory">
      {/* Header */}
      <div className="bg-onyxLight border-b border-champagne/20 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link
              to="/hub"
              className="p-2 rounded-lg bg-onyxLight text-champagne hover:bg-emerald transition-colors"
            >
              <FaArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-bold text-champagne">NWS Spades</h1>
          </div>
          <div className="flex items-center space-x-4">
            {showHints && (
              <button
                onClick={() => {/* TODO: Show hint */}}
                className="p-2 rounded-lg bg-emerald text-white hover:bg-emeraldLight transition-colors"
              >
                <FaCircleQuestion className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg bg-onyxLight text-champagne hover:bg-emerald transition-colors"
            >
                              <FaGear className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Game Info */}
        <div className="bg-onyxLight rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-champagne">NWS Spades</h3>
              <p className="text-ivory/80">Joker-Joker-Deuce variant with custom house rules</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-champagne">Team 1</h3>
              <p className="text-2xl font-bold text-ivory">0</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-champagne">Team 2</h3>
              <p className="text-2xl font-bold text-ivory">0</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-champagne">Spades Broken</h3>
              <p className="text-ivory">No</p>
            </div>
          </div>
        </div>

        {/* Game Board Placeholder */}
        <div className="bg-onyxLight rounded-lg p-8 mb-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-champagne mb-4">NWS Spades Game Board</h2>
            <p className="text-ivory/80 mb-4">
              Custom house rules implementation coming soon...
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-onyx rounded-lg p-4">
                <h3 className="text-champagne font-semibold mb-2">House Rules</h3>
                <ul className="text-sm text-ivory/80 space-y-1">
                  <li>• Jokers + 2♠ trump</li>
                  <li>• 2♦, 2♥ removed</li>
                  <li>• Spades broken restriction</li>
                  <li>• 10+ bid bonus</li>
                  <li>• Blind bid option</li>
                </ul>
              </div>
              <div className="bg-onyx rounded-lg p-4">
                <h3 className="text-champagne font-semibold mb-2">Features</h3>
                <ul className="text-sm text-ivory/80 space-y-1">
                  <li>• AI opponents</li>
                  <li>• Tutorial system</li>
                  <li>• Real-time hints</li>
                  <li>• Multiplayer ready</li>
                  <li>• Luxury theme</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Game Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => {/* TODO: New game */}}
            className="px-6 py-3 bg-champagne text-onyx font-bold rounded-lg hover:bg-champagneLight transition-colors"
          >
            New Game
          </button>
          <button
            onClick={() => setShowHints(!showHints)}
            className={`px-6 py-3 font-bold rounded-lg transition-colors ${
              showHints ? 'bg-emerald text-white' : 'bg-onyxLight text-champagne'
            }`}
          >
            {showHints ? 'Hide Hints' : 'Show Hints'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NWSSpades;
