import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, 
  FaGear, 
  FaFile, 
  FaGamepad, 
  FaEnvelope, 
  FaShield, 
  FaDatabase,
  FaEye,
  FaPen,
  FaTrash,
  FaPlus,
  FaMagnifyingGlass,
  FaFilter,
  FaDownload,
  FaUpload,
  FaBell,
  FaTriangleExclamation,
  FaCircleCheck,
  FaClock,
  FaUserGear as FaUserCog,
  FaBookOpen,
  FaCalendar,
  FaPhone,
  FaBullhorn,
  FaStore,
  FaLaptopCode,
  FaScroll,
  FaUserTie,
  FaCartShopping,
  FaBullseye,
  FaDesktop,
  FaCircleQuestion,
  FaClock as FaClockIcon,
  FaShieldHalved
} from 'react-icons/fa6';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  joinDate: string;
}

interface BlogPost {
  id: string;
  title: string;
  status: 'published' | 'draft' | 'archived';
  publishDate: string;
  views: number;
  author: string;
}

interface GameStats {
  name: string;
  activePlayers: number;
  totalGames: number;
  averageScore: number;
  lastUpdated: string;
}

interface SystemMetric {
  name: string;
  value: string;
  status: 'healthy' | 'warning' | 'error';
  trend: 'up' | 'down' | 'stable';
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const navigate = useNavigate();

  const ADMIN_PASSWORD = 'NWSAdmin2024!'; // In production, use secure authentication

  // Mock data - in production, this would come from your backend
  const [users] = useState<User[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', lastLogin: '2024-01-15', joinDate: '2023-06-01' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'premium', status: 'active', lastLogin: '2024-01-14', joinDate: '2023-08-15' },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'user', status: 'inactive', lastLogin: '2024-01-10', joinDate: '2023-11-20' },
  ]);

  const [blogPosts] = useState<BlogPost[]>([
    { id: '1', title: 'The Art of Saying No', status: 'published', publishDate: '2024-01-10', views: 1250, author: 'Brian Proctor' },
    { id: '2', title: 'Financial Literacy Basics', status: 'published', publishDate: '2024-01-08', views: 890, author: 'Brian Proctor' },
    { id: '3', title: 'Work-Life Balance Strategies', status: 'draft', publishDate: '', views: 0, author: 'Brian Proctor' },
  ]);

  const [gameStats] = useState<GameStats[]>([
    { name: 'Blackjack Lux', activePlayers: 45, totalGames: 1250, averageScore: 18.5, lastUpdated: '2024-01-15' },
    { name: 'Checkers Lux', activePlayers: 32, totalGames: 890, averageScore: 12.3, lastUpdated: '2024-01-15' },
    { name: 'Tycoon', activePlayers: 28, totalGames: 567, averageScore: 8500, lastUpdated: '2024-01-15' },
    { name: 'NWSSpades', activePlayers: 15, totalGames: 234, averageScore: 8.7, lastUpdated: '2024-01-15' },
    { name: '5000 NWS', activePlayers: 12, totalGames: 123, averageScore: 3200, lastUpdated: '2024-01-15' },
  ]);

  const [systemMetrics] = useState<SystemMetric[]>([
    { name: 'Server Response Time', value: '45ms', status: 'healthy', trend: 'stable' },
    { name: 'Database Connections', value: '127/200', status: 'healthy', trend: 'up' },
    { name: 'Memory Usage', value: '68%', status: 'warning', trend: 'up' },
    { name: 'CPU Usage', value: '45%', status: 'healthy', trend: 'stable' },
    { name: 'Active Users', value: '156', status: 'healthy', trend: 'up' },
  ]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setLoginError('');
      setAdminPassword('');
    } else {
      setLoginError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminPassword('');
    setLoginError('');
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBlogPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">👑</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter admin password to access the dashboard</p>
          </div>
          
          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
                required
              />
            </div>
            
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {loginError}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Access Dashboard
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/hub')}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              ← Back to Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl mr-3">👑</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">No Window Shopping Admin</h1>
                <p className="text-sm text-gray-600">Administrative Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-gray-600">
                <FaBell className="text-xl" />
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: FaUsers },
              { id: 'users', label: 'Users', icon: FaUsers },
              { id: 'content', label: 'Content', icon: FaFile },
              { id: 'games', label: 'Games', icon: FaGamepad },
              { id: 'analytics', label: 'Analytics', icon: FaUsers },
              { id: 'system', label: 'System', icon: FaGear },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="text-lg" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'users' && <UsersTab users={filteredUsers} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
          {activeTab === 'content' && <ContentTab blogPosts={filteredBlogPosts} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
          {activeTab === 'games' && <GamesTab gameStats={gameStats} />}
          {activeTab === 'analytics' && <AnalyticsTab />}
          {activeTab === 'system' && <SystemTab systemMetrics={systemMetrics} />}
        </div>
      </div>
    </div>
  );
};

// Tab Components
const OverviewTab: React.FC = () => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
      <p className="text-gray-600">Welcome to your administrative command center</p>
    </div>

    {/* Quick Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center">
          <FaUsers className="text-2xl text-blue-600 mr-3" />
          <div>
            <p className="text-sm font-medium text-blue-600">Total Users</p>
            <p className="text-2xl font-bold text-blue-900">1,247</p>
          </div>
        </div>
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center">
                          <FaFile className="text-2xl text-green-600 mr-3" />
          <div>
            <p className="text-sm font-medium text-green-600">Blog Posts</p>
            <p className="text-2xl font-bold text-green-900">42</p>
          </div>
        </div>
      </div>
      
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-center">
          <FaGamepad className="text-2xl text-purple-600 mr-3" />
          <div>
            <p className="text-sm font-medium text-purple-600">Active Games</p>
            <p className="text-2xl font-bold text-purple-900">5</p>
          </div>
        </div>
      </div>
      
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <div className="flex items-center">
          <FaUsers className="text-2xl text-orange-600 mr-3" />
          <div>
            <p className="text-sm font-medium text-orange-600">Page Views</p>
            <p className="text-2xl font-bold text-orange-900">15.2K</p>
          </div>
        </div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 p-3 rounded-lg text-left transition-colors flex items-center">
            <FaPlus className="mr-3" />
            Create New Blog Post
          </button>
          <button className="w-full bg-green-100 hover:bg-green-200 text-green-800 p-3 rounded-lg text-left transition-colors flex items-center">
            <FaUsers className="mr-3" />
            Manage Users
          </button>
          <button className="w-full bg-purple-100 hover:bg-purple-200 text-purple-800 p-3 rounded-lg text-left transition-colors flex items-center">
            <FaGear className="mr-3" />
            System Settings
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <FaCircleCheck className="text-green-500 mr-2" />
            New user registration - 2 minutes ago
          </div>
          <div className="flex items-center text-sm text-gray-600">
                            <FaFile className="text-blue-500 mr-2" />
            Blog post published - 1 hour ago
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaGamepad className="text-purple-500 mr-2" />
            Game session started - 3 hours ago
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaTriangleExclamation className="text-orange-500 mr-2" />
            System alert resolved - 5 hours ago
          </div>
        </div>
      </div>
    </div>
  </div>
);

const UsersTab: React.FC<{ users: User[]; searchTerm: string; setSearchTerm: (term: string) => void }> = ({ users, searchTerm, setSearchTerm }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
        <FaPlus className="mr-2" />
        Add User
      </button>
    </div>

    {/* Search and Filters */}
    <div className="flex space-x-4">
      <div className="flex-1">
        <div className="relative">
          <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        <option value="all">All Roles</option>
        <option value="user">User</option>
        <option value="premium">Premium</option>
        <option value="admin">Admin</option>
      </select>
    </div>

    {/* Users Table */}
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user.role === 'premium' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user.status === 'active' ? 'bg-green-100 text-green-800' :
                  user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.lastLogin}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <FaEye />
                  </button>
                  <button className="text-green-600 hover:text-green-900">
                    <FaPen />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ContentTab: React.FC<{ blogPosts: BlogPost[]; searchTerm: string; setSearchTerm: (term: string) => void }> = ({ blogPosts, searchTerm, setSearchTerm }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
        <FaPlus className="mr-2" />
        New Blog Post
      </button>
    </div>

    {/* Search */}
    <div className="flex space-x-4">
      <div className="flex-1">
        <div className="relative">
          <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        <option value="all">All Status</option>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
        <option value="archived">Archived</option>
      </select>
    </div>

    {/* Blog Posts Table */}
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publish Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {blogPosts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{post.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {post.author}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  post.status === 'published' ? 'bg-green-100 text-green-800' :
                  post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {post.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {post.views.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {post.publishDate || 'Not published'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <FaEye />
                  </button>
                  <button className="text-green-600 hover:text-green-900">
                    <FaPen />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const GamesTab: React.FC<{ gameStats: GameStats[] }> = ({ gameStats }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-900">Game Management</h2>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
        <FaPlus className="mr-2" />
        Add Game
      </button>
    </div>

    {/* Game Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {gameStats.map((game) => (
        <div key={game.name} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{game.name}</h3>
            <FaGamepad className="text-2xl text-purple-600" />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Active Players:</span>
              <span className="text-sm font-semibold text-gray-900">{game.activePlayers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Games:</span>
              <span className="text-sm font-semibold text-gray-900">{game.totalGames.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg Score:</span>
              <span className="text-sm font-semibold text-gray-900">{game.averageScore}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last Updated:</span>
              <span className="text-sm text-gray-500">{game.lastUpdated}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-3 rounded text-sm font-medium transition-colors">
                <FaEye className="inline mr-1" />
                View
              </button>
              <button className="flex-1 bg-green-100 hover:bg-green-200 text-green-800 py-2 px-3 rounded text-sm font-medium transition-colors">
                <FaPen className="inline mr-1" />
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AnalyticsTab: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Overview</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Page Views</span>
            <span className="text-lg font-semibold text-gray-900">15,247</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Unique Visitors</span>
            <span className="text-lg font-semibold text-gray-900">8,934</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Bounce Rate</span>
            <span className="text-lg font-semibold text-gray-900">32%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Avg Session Duration</span>
            <span className="text-lg font-semibold text-gray-900">4m 23s</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Content</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">The Art of Saying No</span>
            <span className="text-sm font-semibold text-gray-900">1,250 views</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Financial Literacy Basics</span>
            <span className="text-sm font-semibold text-gray-900">890 views</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Work-Life Balance</span>
            <span className="text-sm font-semibold text-gray-900">756 views</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Blackjack Lux</span>
            <span className="text-sm font-semibold text-gray-900">623 plays</span>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
      <div className="flex space-x-4">
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center">
          <FaDownload className="mr-2" />
          Export Analytics
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <FaUsers className="mr-2" />
          Generate Report
        </button>
      </div>
    </div>
  </div>
);

const SystemTab: React.FC<{ systemMetrics: SystemMetric[] }> = ({ systemMetrics }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">System Monitoring</h2>
    
    {/* System Metrics */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {systemMetrics.map((metric) => (
        <div key={metric.name} className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">{metric.name}</h3>
            <div className={`w-3 h-3 rounded-full ${
              metric.status === 'healthy' ? 'bg-green-500' :
              metric.status === 'warning' ? 'bg-yellow-500' :
              'bg-red-500'
            }`} />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
            <div className={`text-sm ${
              metric.trend === 'up' ? 'text-green-600' :
              metric.trend === 'down' ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* System Actions */}
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Actions</h3>
        <div className="space-y-3">
          <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 p-3 rounded-lg text-left transition-colors flex items-center">
            <FaDatabase className="mr-3" />
            Backup Database
          </button>
          <button className="w-full bg-green-100 hover:bg-green-200 text-green-800 p-3 rounded-lg text-left transition-colors flex items-center">
            <FaShieldHalved className="mr-3" />
            Security Scan
          </button>
          <button className="w-full bg-purple-100 hover:bg-purple-200 text-purple-800 p-3 rounded-lg text-left transition-colors flex items-center">
            <FaGear className="mr-3" />
            System Settings
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <FaCircleCheck className="text-green-500 mr-2" />
            System backup completed - 2 hours ago
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaTriangleExclamation className="text-yellow-500 mr-2" />
            High memory usage detected - 4 hours ago
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaCircleCheck className="text-green-500 mr-2" />
            Security scan passed - 6 hours ago
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
