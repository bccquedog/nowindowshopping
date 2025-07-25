import React, { useState } from 'react';
import { useAuth, useSessions, useGoals, useNotes } from '../context';
import VideoChat from '../../components/VideoChat';

export const ClientPortal: React.FC = () => {
  const { user, logout } = useAuth();
  const { sessions } = useSessions();
  const { goals } = useGoals();
  const { notes } = useNotes();
  const [showVideoChat, setShowVideoChat] = useState(false);

  // Filter data for current client
  const clientSessions = sessions.filter(s => s.clientId === user?.id);
  const clientGoals = goals.filter(g => g.clientId === user?.id);
  const clientNotes = notes.filter(n => n.clientId === user?.id && !n.isPrivate);

  const upcomingSessions = clientSessions.filter(s => s.status === 'scheduled');
  const completedSessions = clientSessions.filter(s => s.status === 'completed');
  const activeGoals = clientGoals.filter(g => g.status === 'in-progress');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  CoachCare Client Portal
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">📅</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Upcoming Sessions</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{upcomingSessions.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">✅</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed Sessions</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{completedSessions.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">🎯</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Goals</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{activeGoals.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">📝</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{clientNotes.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                📅 Schedule Session
              </button>
              <button 
                onClick={() => setShowVideoChat(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                🎥 Join Video Session
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                📊 View Progress
              </button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Sessions */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Sessions</h3>
              <div className="space-y-3">
                {upcomingSessions.slice(0, 5).map(session => (
                  <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{session.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{session.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{session.date}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{session.startTime}</p>
                    </div>
                  </div>
                ))}
                {upcomingSessions.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">No upcoming sessions</p>
                )}
              </div>
            </div>

            {/* Active Goals */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Goals</h3>
              <div className="space-y-3">
                {activeGoals.slice(0, 5).map(goal => (
                  <div key={goal.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900 dark:text-white">{goal.title}</p>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {goal.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Target: {new Date(goal.targetDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
                {activeGoals.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">No active goals</p>
                )}
              </div>
            </div>
          </div>

          {/* Recent Notes */}
          <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Notes</h3>
            <div className="space-y-3">
              {clientNotes.slice(0, 3).map(note => (
                <div key={note.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900 dark:text-white">{note.title}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      note.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                      note.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    }`}>
                      {note.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {note.content}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {clientNotes.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No notes available</p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Video Chat Modal */}
      {showVideoChat && (
        <VideoChat
          roomUrl="https://nowindowshopping.daily.co/client-session"
          roomName="Client Session"
          sessionType="coaching"
          participants={[
            { id: '1', name: 'Coach', role: 'coach' },
            { id: '2', name: user?.name || 'Client', role: 'client' }
          ]}
          onClose={() => setShowVideoChat(false)}
          onSessionEnd={(duration) => {
            console.log(`Client session ended. Duration: ${duration}ms`);
            setShowVideoChat(false);
          }}
        />
      )}
    </div>
  );
}; 