import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminSection {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  requiresAuth: boolean;
}

const AdminGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const ADMIN_PASSWORD = 'NWSAdmin2024!'; // In production, this should be secure

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

  const adminSections: AdminSection[] = [
    {
      id: 'overview',
      title: 'Admin Overview',
      description: 'Understanding the admin role and responsibilities',
      requiresAuth: true,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl mb-4">👑</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Guide Overview</h2>
            <p className="text-gray-600">
              Welcome to the No Window Shopping admin guide. This comprehensive resource 
              will help you understand and manage all aspects of the platform.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Admin Responsibilities</h3>
            <ul className="space-y-2 text-blue-800">
              <li>• <strong>User Management:</strong> Monitor and support user accounts</li>
              <li>• <strong>Content Management:</strong> Update and maintain platform content</li>
              <li>• <strong>System Monitoring:</strong> Track platform performance and health</li>
              <li>• <strong>Support Management:</strong> Handle user support tickets</li>
              <li>• <strong>Security:</strong> Maintain platform security and data protection</li>
              <li>• <strong>Analytics:</strong> Review platform usage and performance metrics</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Access</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/admin/tickets')}
                  className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 p-3 rounded-lg text-left transition-colors"
                >
                  🎫 Manage Support Tickets
                </button>
                <button
                  onClick={() => navigate('/settings/advanced')}
                  className="w-full bg-green-100 hover:bg-green-200 text-green-800 p-3 rounded-lg text-left transition-colors"
                >
                  🔧 System Health Check
                </button>
                <button
                  onClick={() => navigate('/admin/settings')}
                  className="w-full bg-purple-100 hover:bg-purple-200 text-purple-800 p-3 rounded-lg text-left transition-colors"
                >
                  ⚙️ Admin Settings
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Admin Tools</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Healthcheck:</strong> Monitor system status</li>
                <li>• <strong>Feature Status:</strong> Manage feature availability</li>
                <li>• <strong>Ticket Management:</strong> Handle user support</li>
                <li>• <strong>User Analytics:</strong> Track platform usage</li>
                <li>• <strong>Content Management:</strong> Update platform content</li>
                <li>• <strong>Security Tools:</strong> Monitor and protect the platform</li>
              </ul>
            </div>
          </div>

          {!isAdmin && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">Admin Authentication Required</h3>
              <p className="text-yellow-800 mb-4">
                Some sections of this guide require admin authentication. Please log in to access all features.
              </p>
              <form onSubmit={handleAdminLogin} className="max-w-sm">
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                />
                <button
                  type="submit"
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded transition-colors"
                >
                  Login as Admin
                </button>
                {loginError && <div className="text-red-600 mt-2 text-sm">{loginError}</div>}
              </form>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'user-management',
      title: 'User Management',
      description: 'Managing user accounts and permissions',
      requiresAuth: true,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl mb-4">👥</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Management</h2>
            <p className="text-gray-600">
              Comprehensive guide to managing user accounts, permissions, and support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">User Account Management</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Account Creation:</strong> Monitor new user registrations</li>
                <li>• <strong>Profile Management:</strong> Assist users with profile updates</li>
                <li>• <strong>Account Verification:</strong> Verify user identities when needed</li>
                <li>• <strong>Account Recovery:</strong> Help users recover lost accounts</li>
                <li>• <strong>Account Suspension:</strong> Manage problematic accounts</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Support Ticket Management</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Ticket Prioritization:</strong> Sort tickets by urgency</li>
                <li>• <strong>Response Management:</strong> Provide timely responses</li>
                <li>• <strong>Escalation:</strong> Escalate complex issues</li>
                <li>• <strong>Resolution Tracking:</strong> Monitor ticket resolution</li>
                <li>• <strong>User Communication:</strong> Maintain clear communication</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">Best Practices</h3>
            <ul className="text-green-800 space-y-2">
              <li>• Respond to support tickets within 24 hours</li>
              <li>• Maintain detailed records of user interactions</li>
              <li>• Follow up on resolved issues to ensure satisfaction</li>
              <li>• Use clear, professional communication</li>
              <li>• Respect user privacy and data protection</li>
            </ul>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/admin/tickets')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Manage Tickets
            </button>
            <button
              onClick={() => navigate('/support')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View Support System
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'content-management',
      title: 'Content Management',
      description: 'Managing platform content and updates',
      requiresAuth: true,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Management</h2>
            <p className="text-gray-600">
              Guide to managing and updating platform content, services, and resources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Management</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Service Updates:</strong> Modify service descriptions and pricing</li>
                <li>• <strong>New Services:</strong> Add new professional services</li>
                <li>• <strong>Service Categories:</strong> Organize and categorize services</li>
                <li>• <strong>Availability:</strong> Manage service availability</li>
                <li>• <strong>Pricing:</strong> Update service pricing and packages</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">MGCU Content</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Story Updates:</strong> Add new stories and chapters</li>
                <li>• <strong>Character Management:</strong> Update character information</li>
                <li>• <strong>Universe Expansion:</strong> Add new universe elements</li>
                <li>• <strong>Interactive Features:</strong> Manage interactive elements</li>
                <li>• <strong>Community Content:</strong> Moderate user-generated content</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Blog & Resources</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Blog Management</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Create and edit blog posts</li>
                  <li>• Manage blog categories</li>
                  <li>• Moderate comments</li>
                  <li>• Update featured content</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Resource Library</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Upload educational materials</li>
                  <li>• Manage downloadable resources</li>
                  <li>• Organize resource categories</li>
                  <li>• Track resource usage</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Content Guidelines</h3>
            <ul className="text-blue-800 space-y-2">
              <li>• Maintain professional tone and quality</li>
              <li>• Ensure accuracy and up-to-date information</li>
              <li>• Follow brand guidelines and voice</li>
              <li>• Optimize content for user engagement</li>
              <li>• Regular content audits and updates</li>
            </ul>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/services')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Manage Services
            </button>
            <button
              onClick={() => navigate('/mgcu')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Manage MGCU
            </button>
            <button
              onClick={() => navigate('/blog')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Manage Blog
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'system-monitoring',
      title: 'System Monitoring',
      description: 'Monitoring platform health and performance',
      requiresAuth: true,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🔧</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">System Monitoring</h2>
            <p className="text-gray-600">
              Comprehensive guide to monitoring and maintaining platform health and performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Health Monitoring</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>System Status:</strong> Monitor overall platform health</li>
                <li>• <strong>Performance Metrics:</strong> Track response times and load</li>
                <li>• <strong>Error Tracking:</strong> Monitor and resolve system errors</li>
                <li>• <strong>Uptime Monitoring:</strong> Ensure platform availability</li>
                <li>• <strong>Resource Usage:</strong> Monitor server and database usage</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Feature Management</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Feature Toggles:</strong> Enable/disable features</li>
                <li>• <strong>Beta Testing:</strong> Manage beta feature rollouts</li>
                <li>• <strong>Version Control:</strong> Track feature versions</li>
                <li>• <strong>Rollback Procedures:</strong> Revert problematic changes</li>
                <li>• <strong>Update Management:</strong> Coordinate platform updates</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Monitoring Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Healthcheck</h4>
                <p className="text-gray-700 text-sm mb-2">Comprehensive system health monitoring</p>
                <button
                  onClick={() => navigate('/settings/advanced')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Open Healthcheck
                </button>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Feature Status</h4>
                <p className="text-gray-700 text-sm mb-2">Monitor feature availability and status</p>
                <button
                  onClick={() => navigate('/settings/advanced')}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Check Features
                </button>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Analytics</h4>
                <p className="text-gray-700 text-sm mb-2">Track platform usage and performance</p>
                <button
                  onClick={() => navigate('/admin/settings')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  View Analytics
                </button>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-3">Monitoring Best Practices</h3>
            <ul className="text-yellow-800 space-y-2">
              <li>• Check system health daily</li>
              <li>• Set up automated alerts for critical issues</li>
              <li>• Maintain detailed logs of system changes</li>
              <li>• Regular performance reviews and optimizations</li>
              <li>• Document incident response procedures</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => navigate('/settings/advanced')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Open System Monitoring
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Security Management',
      description: 'Maintaining platform security and data protection',
      requiresAuth: true,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Security Management</h2>
            <p className="text-gray-600">
              Comprehensive guide to maintaining platform security and protecting user data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Protection</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>User Privacy:</strong> Protect user personal information</li>
                <li>• <strong>Data Encryption:</strong> Ensure data is properly encrypted</li>
                <li>• <strong>Access Control:</strong> Manage user access permissions</li>
                <li>• <strong>Data Retention:</strong> Manage data storage and deletion</li>
                <li>• <strong>Compliance:</strong> Ensure regulatory compliance</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Security Monitoring</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Threat Detection:</strong> Monitor for security threats</li>
                <li>• <strong>Access Logs:</strong> Review user access patterns</li>
                <li>• <strong>Vulnerability Scans:</strong> Regular security assessments</li>
                <li>• <strong>Incident Response:</strong> Handle security incidents</li>
                <li>• <strong>Backup Security:</strong> Protect backup data</li>
              </ul>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-3">Security Protocols</h3>
            <ul className="text-red-800 space-y-2">
              <li>• Regular security audits and assessments</li>
              <li>• Multi-factor authentication for admin accounts</li>
              <li>• Regular password updates and complexity requirements</li>
              <li>• Secure communication protocols (HTTPS, SSL/TLS)</li>
              <li>• Regular security training for admin users</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Incident Response</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Detection</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Monitor security alerts</li>
                  <li>• Review access logs</li>
                  <li>• Investigate suspicious activity</li>
                  <li>• Assess potential threats</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Response</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Immediate threat containment</li>
                  <li>• User notification if necessary</li>
                  <li>• System recovery procedures</li>
                  <li>• Post-incident analysis</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/admin/settings')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Security Settings
            </button>
            <button
              onClick={() => navigate('/settings/advanced')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              System Monitoring
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'analytics',
      title: 'Analytics & Reporting',
      description: 'Understanding platform analytics and generating reports',
      requiresAuth: true,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics & Reporting</h2>
            <p className="text-gray-600">
              Comprehensive guide to understanding platform analytics and generating insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">User Analytics</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>User Growth:</strong> Track new user registrations</li>
                <li>• <strong>Engagement Metrics:</strong> Monitor user activity</li>
                <li>• <strong>Feature Usage:</strong> Track feature adoption</li>
                <li>• <strong>User Retention:</strong> Monitor user retention rates</li>
                <li>• <strong>User Feedback:</strong> Analyze user satisfaction</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Analytics</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>System Performance:</strong> Monitor response times</li>
                <li>• <strong>Error Rates:</strong> Track system errors</li>
                <li>• <strong>Resource Usage:</strong> Monitor server utilization</li>
                <li>• <strong>Uptime Statistics:</strong> Track platform availability</li>
                <li>• <strong>Load Patterns:</strong> Analyze usage patterns</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Metrics to Track</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">User Metrics</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Daily/Monthly Active Users</li>
                  <li>• User Registration Rate</li>
                  <li>• User Retention Rate</li>
                  <li>• Feature Adoption Rate</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Engagement Metrics</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Session Duration</li>
                  <li>• Pages per Session</li>
                  <li>• Bounce Rate</li>
                  <li>• User Journey Analysis</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Business Metrics</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Service Booking Rate</li>
                  <li>• Support Ticket Volume</li>
                  <li>• User Satisfaction Score</li>
                  <li>• Revenue Metrics</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">Reporting Best Practices</h3>
            <ul className="text-green-800 space-y-2">
              <li>• Generate regular weekly and monthly reports</li>
              <li>• Focus on actionable insights and trends</li>
              <li>• Compare metrics over time to identify patterns</li>
              <li>• Share relevant insights with stakeholders</li>
              <li>• Use data to inform platform improvements</li>
            </ul>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/admin/settings')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View Analytics
            </button>
            <button
              onClick={() => navigate('/settings/advanced')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Performance Metrics
            </button>
          </div>
        </div>
      )
    }
  ];

  const currentSection = adminSections.find(section => section.id === activeSection);

  // If not authenticated, show login screen
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🔒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Guide</h1>
            <p className="text-gray-600">Authentication required to access admin content</p>
          </div>
          
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                id="password"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
            >
              Login as Admin
            </button>
            
            {loginError && (
              <div className="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-md p-2">
                {loginError}
              </div>
            )}
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/hub')}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              ← Back to Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, show the full admin guide
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Guide</h1>
              <p className="text-gray-600">Comprehensive guide for No Window Shopping administrators</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Admin Authenticated
              </span>
              <button
                onClick={() => navigate('/admin/settings')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Admin Settings
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2">
            {adminSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {currentSection && currentSection.content}
        </div>

        {/* Footer */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/hub')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Hub
            </button>
            <div className="text-sm text-gray-600">
              Admin Guide • {currentSection?.title}
            </div>
            <button
              onClick={() => navigate('/admin/settings')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Admin Settings →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGuide; 