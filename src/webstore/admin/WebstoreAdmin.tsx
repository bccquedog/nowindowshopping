import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStore, FaChartLine, FaBoxesStacked, FaArrowLeft, FaArrowRightFromBracket as FaRightFromBracket } from 'react-icons/fa6';
import InventoryManager from './InventoryManager';
import InsightsDashboard from './InsightsDashboard';

const WebstoreAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'insights'>('inventory');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Using the same password as AdminDashboard for consistency in MVP
  const ADMIN_PASSWORD = 'NWSAdmin2024!';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🏪</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Webstore Admin</h1>
            <p className="text-gray-600">Enter password to manage inventory</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Admin Password"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Access Admin
            </button>
          </form>
          <button
            onClick={() => navigate('/webstore')}
            className="mt-6 w-full text-blue-600 hover:text-blue-700 text-sm"
          >
            ← Back to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/webstore')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Back to Store"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FaStore className="text-blue-600" />
                NWS Liquidation Engine
              </h1>
            </div>
            
            <nav className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'inventory' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FaBoxesStacked />
                Inventory
              </button>
              <button
                onClick={() => setActiveTab('insights')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'insights' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FaChartLine />
                Insights
              </button>
              <div className="h-6 w-px bg-gray-200 mx-2" />
              <button
                onClick={() => setIsAuthenticated(false)}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <FaRightFromBracket />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'inventory' ? <InventoryManager /> : <InsightsDashboard />}
      </main>
    </div>
  );
};

export default WebstoreAdmin;
