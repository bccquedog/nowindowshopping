import React, { useState } from 'react';
import { useAuth, useClients, useSessions, useGoals } from '../context';
import VideoCall from '../../components/VideoCall';
import VideoChat from '../../components/VideoChat';
import VideoSessionManager from '../../components/VideoSessionManager';
import LMSHub from './LMSHub';

export const CoachPortal: React.FC = () => {
  const { user, logout } = useAuth();
  const { clients } = useClients();
  const { sessions } = useSessions();
  const { goals } = useGoals();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [invoices, setInvoices] = useState<any[]>([]);
  const [invoiceForm, setInvoiceForm] = useState({
    clientId: '',
    amount: '',
    description: '',
    dueDate: '',
    service: '',
  });
  const [formMessage, setFormMessage] = useState('');
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showVideoChat, setShowVideoChat] = useState(false);
  const [showVideoSessionManager, setShowVideoSessionManager] = useState(false);

  const handleInvoiceInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setInvoiceForm({ ...invoiceForm, [e.target.name]: e.target.value });
  };

  const handleInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInvoice = {
      ...invoiceForm,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      invoiceNumber: `INV-${Date.now()}`,
    };
    setInvoices([...invoices, newInvoice]);
    setFormMessage('Invoice created successfully!');
    setInvoiceForm({
      clientId: '', amount: '', description: '', dueDate: '', service: '',
    });
    setTimeout(() => setFormMessage(''), 4000);
  };

  // Dashboard, Clients, Sessions, etc. can be expanded later
  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
              <span className="text-white text-sm font-medium">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Clients</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{clients.filter(c => c.status === 'active').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
              <span className="text-white text-sm font-medium">📅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Upcoming Sessions</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{sessions.filter(s => s.status === 'scheduled').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
              <span className="text-white text-sm font-medium">🎯</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Goals</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{goals.filter(g => g.status === 'in-progress').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
              <span className="text-white text-sm font-medium">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + parseFloat(inv.amount), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">+ Add New Client</button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">+ Schedule Session</button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium">+ Create Goal</button>
          <button 
            onClick={() => setActiveTab('billing')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            + Create Invoice
          </button>
          <button 
            onClick={() => setShowVideoCall(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            📹 Quick Video Call
          </button>
          <button 
            onClick={() => setShowVideoChat(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            🎥 Start Coaching Session
          </button>
          <button 
            onClick={() => setShowVideoSessionManager(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            📋 Manage Sessions
          </button>
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Billing & Invoices</h2>
      
      {/* Billing Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
              <span className="text-white text-sm font-medium">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + parseFloat(inv.amount), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
              <span className="text-white text-sm font-medium">📄</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Invoices</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${invoices.filter(i => i.status === 'pending').reduce((sum, inv) => sum + parseFloat(inv.amount), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
              <span className="text-white text-sm font-medium">⚠️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Overdue</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${invoices.filter(i => i.status === 'overdue').reduce((sum, inv) => sum + parseFloat(inv.amount), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
              <span className="text-white text-sm font-medium">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Invoices</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{invoices.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Invoice Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8 max-w-2xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New Invoice</h3>
        <form onSubmit={handleInvoiceSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select 
              name="clientId" 
              value={invoiceForm.clientId} 
              onChange={handleInvoiceInput} 
              required 
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select Client</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
            <input 
              name="amount" 
              value={invoiceForm.amount} 
              onChange={handleInvoiceInput} 
              required 
              placeholder="Amount ($)" 
              type="number" 
              step="0.01"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              name="service" 
              value={invoiceForm.service} 
              onChange={handleInvoiceInput} 
              required 
              placeholder="Service Type" 
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
            />
            <input 
              name="dueDate" 
              value={invoiceForm.dueDate} 
              onChange={handleInvoiceInput} 
              required 
              placeholder="Due Date" 
              type="date" 
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
            />
          </div>
          <textarea 
            name="description" 
            value={invoiceForm.description} 
            onChange={handleInvoiceInput} 
            required 
            placeholder="Invoice Description" 
            rows={3} 
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold">Create Invoice</button>
          {formMessage && <div className="text-green-600 dark:text-green-400 font-medium mt-2">{formMessage}</div>}
        </form>
      </div>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">All Invoices</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Invoice #</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Client</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Service</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Amount</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Due Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {invoices.length === 0 && (
                <tr><td colSpan={7} className="text-center text-gray-500 dark:text-gray-400 py-4">No invoices yet</td></tr>
              )}
              {invoices.map(invoice => {
                const client = clients.find(c => c.id === invoice.clientId);
                const getStatusColor = (status: string) => {
                  switch (status) {
                    case 'paid': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
                    case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
                    case 'overdue': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
                    default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
                  }
                };
                return (
                  <tr key={invoice.id}>
                    <td className="px-4 py-2 whitespace-nowrap font-medium">{invoice.invoiceNumber}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{client?.name || 'Unknown Client'}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{invoice.service}</td>
                    <td className="px-4 py-2 whitespace-nowrap font-medium">${parseFloat(invoice.amount).toLocaleString()}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{invoice.dueDate}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <button className="text-blue-600 hover:underline mr-2">View</button>
                      <button className="text-green-600 hover:underline mr-2">Mark Paid</button>
                      <button className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Placeholder for other CROM sections
  const renderClients = () => <div className="p-8 text-gray-500 dark:text-gray-400">Client Management coming soon...</div>;
  const renderSessions = () => <div className="p-8 text-gray-500 dark:text-gray-400">Session Management coming soon...</div>;
  const renderCommunications = () => <div className="p-8 text-gray-500 dark:text-gray-400">Communications coming soon...</div>;
  const renderContent = () => <div className="p-8 text-gray-500 dark:text-gray-400">Content/Resources coming soon...</div>;
  const renderAnalytics = () => <div className="p-8 text-gray-500 dark:text-gray-400">Analytics/Reports coming soon...</div>;
  const renderSettings = () => <div className="p-8 text-gray-500 dark:text-gray-400">Settings coming soon...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  CROM Portal (CoachCare)
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Welcome, {user?.name}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard' },
              { id: 'lms', name: 'LMS' },
              { id: 'clients', name: 'Clients' },
              { id: 'sessions', name: 'Sessions' },
              { id: 'billing', name: 'Billing' },
              { id: 'communications', name: 'Communications' },
              { id: 'content', name: 'Content/Resources' },
              { id: 'analytics', name: 'Analytics/Reports' },
              { id: 'settings', name: 'Settings' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'lms' && <LMSHub />}
          {activeTab === 'clients' && renderClients()}
          {activeTab === 'sessions' && renderSessions()}
          {activeTab === 'billing' && renderBilling()}
          {activeTab === 'communications' && renderCommunications()}
          {activeTab === 'content' && renderContent()}
          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </main>
      
      {/* Video Call Modal */}
      {showVideoCall && (
        <VideoCall 
          onClose={() => setShowVideoCall(false)}
          roomUrl="https://nowindowshopping.daily.co/coach-session"
        />
      )}

      {/* Video Chat Modal */}
      {showVideoChat && (
        <VideoChat
          roomUrl="https://nowindowshopping.daily.co/coaching-session"
          roomName="Coaching Session"
          sessionType="coaching"
          participants={[
            { id: '1', name: user?.name || 'Coach', role: 'coach' },
            { id: '2', name: 'Client', role: 'client' }
          ]}
          onClose={() => setShowVideoChat(false)}
          onSessionEnd={(duration) => {
            console.log(`Coaching session ended. Duration: ${duration}ms`);
            setShowVideoChat(false);
          }}
        />
      )}

      {/* Video Session Manager Modal */}
      {showVideoSessionManager && (
        <VideoSessionManager
          onClose={() => setShowVideoSessionManager(false)}
          onSessionEnd={(session, duration) => {
            console.log(`Session "${session.title}" ended. Duration: ${duration}ms`);
            setShowVideoSessionManager(false);
          }}
        />
      )}
    </div>
  );
}; 