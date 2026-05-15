import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaLifeRing, 
  FaMagnifyingGlass, 
  FaFilter,
  FaCircleCheck,
  FaCircleXmark,
  FaTrash,
  FaClock,
  FaEnvelope,
  FaHeadphones,
  FaUserGroup as FaUser,
  FaArrowRightFromBracket as FaLogout
} from 'react-icons/fa6';
import { 
  getAllGlobalTickets, 
  updateGlobalTicket, 
  deleteGlobalTicket, 
  GlobalTicket, 
  TicketStatus, 
  TicketPriority 
} from '../supportService';

const SupportAdmin: React.FC = () => {
  const [tickets, setTickets] = useState<GlobalTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [selectedTicket, setSelectedTicket] = useState<GlobalTicket | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  const navigate = useNavigate();
  const ADMIN_PASSWORD = 'NWSAdmin2024!';

  useEffect(() => {
    if (isAuthenticated) {
      loadTickets();
    }
  }, [isAuthenticated]);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const data = await getAllGlobalTickets();
      setTickets(data);
    } catch (err) {
      console.error('Failed to load tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleUpdateStatus = async (id: string, status: TicketStatus) => {
    try {
      await updateGlobalTicket(id, { status });
      loadTickets();
      if (selectedTicket?.id === id) {
        setSelectedTicket({ ...selectedTicket, status });
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedTicket) return;
    try {
      await updateGlobalTicket(selectedTicket.id, { adminNotes });
      loadTickets();
      alert('Notes saved successfully');
    } catch (err) {
      console.error('Failed to save notes:', err);
    }
  };

  const filteredTickets = tickets.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(t => filterStatus === 'all' || t.status === filterStatus);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🎧</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Support Admin</h1>
            <p className="text-gray-600">Enter password to manage support tickets</p>
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
            onClick={() => navigate('/hub')}
            className="mt-6 w-full text-blue-600 hover:text-blue-700 text-sm"
          >
            ← Back to Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/hub')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <FaArrowLeft className="text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FaHeadphones className="text-blue-600" />
                Support Management
              </h1>
            </div>
            <button onClick={() => setIsAuthenticated(false)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
              <FaLogout />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Ticket List */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-4">
              <div className="relative">
                <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[calc(100-200px)]">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
                </div>
              ) : filteredTickets.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-sm">No tickets found.</div>
              ) : (
                filteredTickets.map(ticket => (
                  <div 
                    key={ticket.id}
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setAdminNotes(ticket.adminNotes || '');
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedTicket?.id === ticket.id 
                        ? 'bg-blue-50 border-blue-200 shadow-md' 
                        : 'bg-white border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-900 text-sm truncate pr-2">{ticket.subject}</h4>
                      <PriorityBadge priority={ticket.priority} />
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{ticket.name}</p>
                    <div className="flex justify-between items-center">
                      <StatusBadge status={ticket.status} />
                      <span className="text-[10px] text-gray-400 font-medium">
                        {ticket.createdAt?.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Ticket Detail */}
          <div className="lg:col-span-2">
            {selectedTicket ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedTicket.subject}</h2>
                    <p className="text-sm text-gray-500">Ticket ID: {selectedTicket.id}</p>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={selectedTicket.status}
                      onChange={(e) => handleUpdateStatus(selectedTicket.id, e.target.value as TicketStatus)}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-bold"
                    >
                      <option value="new">New</option>
                      <option value="open">Open</option>
                      <option value="pending">Pending</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                    <button 
                      onClick={() => {
                        if (window.confirm('Delete this ticket?')) {
                          deleteGlobalTicket(selectedTicket.id).then(() => {
                            setSelectedTicket(null);
                            loadTickets();
                          });
                        }
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoItem icon={<FaUser />} label="Requester" value={selectedTicket.name} />
                    <InfoItem icon={<FaEnvelope />} label="Email" value={selectedTicket.email} />
                    <InfoItem icon={<FaClock />} label="Created" value={selectedTicket.createdAt?.toLocaleString()} />
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Message</h3>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedTicket.message}</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Internal Admin Notes</h3>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      className="w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      rows={5}
                      placeholder="Add notes for internal tracking..."
                    />
                    <button
                      onClick={handleSaveNotes}
                      className="bg-gray-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all"
                    >
                      Save Notes
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[400px] bg-white rounded-2xl border border-gray-100 border-dashed flex flex-col items-center justify-center text-gray-400">
                <FaLifeRing className="text-6xl mb-4 opacity-20" />
                <p className="font-bold">Select a ticket to view details</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

const InfoItem = ({ icon, label, value }: any) => (
  <div className="flex items-start gap-3">
    <div className="p-2 bg-gray-100 rounded-lg text-gray-400">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const PriorityBadge = ({ priority }: { priority: string }) => {
  const colors = {
    low: 'bg-gray-100 text-gray-500',
    medium: 'bg-blue-100 text-blue-600',
    high: 'bg-amber-100 text-amber-600',
    urgent: 'bg-red-100 text-red-600'
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${colors[priority as keyof typeof colors]}`}>
      {priority}
    </span>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const colors = {
    new: 'bg-blue-600 text-white',
    open: 'bg-green-100 text-green-700',
    pending: 'bg-amber-100 text-amber-700',
    resolved: 'bg-gray-100 text-gray-600',
    closed: 'bg-gray-900 text-white'
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${colors[status as keyof typeof colors]}`}>
      {status}
    </span>
  );
};

export default SupportAdmin;
