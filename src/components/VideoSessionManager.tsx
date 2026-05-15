import React, { useState } from 'react';
import VideoChat from './VideoChat';
import { videoConfig } from '../config/videoConfig';

interface Session {
  id: string;
  title: string;
  type: 'coaching' | 'group';
  roomUrl: string;
  participants: Array<{
    id: string;
    name: string;
    role: 'coach' | 'client' | 'participant';
  }>;
  startTime: Date;
  endTime?: Date;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
}

interface VideoSessionManagerProps {
  onSessionEnd?: (session: Session, duration: number) => void;
  onClose?: () => void;
}

const VideoSessionManager: React.FC<VideoSessionManagerProps> = ({
  onSessionEnd,
  onClose
}) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [showCreateSession, setShowCreateSession] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    type: 'coaching' as 'coaching' | 'group',
    participants: [] as Array<{ id: string; name: string; role: 'coach' | 'client' | 'participant' }>,
  });

  // Generate a unique room URL for Daily.co
  const generateRoomUrl = (sessionTitle: string) => {
    const baseUrl = `https://${videoConfig.daily.domain}`;
    const roomId = sessionTitle.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    return `${baseUrl}/${roomId}`;
  };

  const createSession = () => {
    if (!newSession.title.trim()) return;

    const session: Session = {
      id: Date.now().toString(),
      title: newSession.title,
      type: newSession.type,
      roomUrl: generateRoomUrl(newSession.title),
      participants: newSession.participants,
      startTime: new Date(),
      status: 'scheduled',
    };

    setSessions([...sessions, session]);
    setActiveSession(session);
    setShowCreateSession(false);
    setNewSession({ title: '', type: 'coaching', participants: [] });
  };

  const startSession = (session: Session) => {
    const updatedSession = { ...session, status: 'active' as const };
    setSessions(sessions.map(s => s.id === session.id ? updatedSession : s));
    setActiveSession(updatedSession);
  };

  const endSession = (session: Session, duration: number) => {
    const updatedSession = { 
      ...session, 
      status: 'completed' as const,
      endTime: new Date()
    };
    setSessions(sessions.map(s => s.id === session.id ? updatedSession : s));
    setActiveSession(null);
    
    if (onSessionEnd) {
      onSessionEnd(updatedSession, duration);
    }
  };

  const cancelSession = (session: Session) => {
    const updatedSession = { ...session, status: 'cancelled' as const };
    setSessions(sessions.map(s => s.id === session.id ? updatedSession : s));
  };

  const addParticipant = () => {
    const participant = {
      id: Date.now().toString(),
      name: `Participant ${newSession.participants.length + 1}`,
      role: 'participant' as const,
    };
    setNewSession({
      ...newSession,
      participants: [...newSession.participants, participant],
    });
  };

  const removeParticipant = (index: number) => {
    setNewSession({
      ...newSession,
      participants: newSession.participants.filter((_, i) => i !== index),
    });
  };

  const updateParticipant = (index: number, field: string, value: string) => {
    const updatedParticipants = [...newSession.participants];
    updatedParticipants[index] = { ...updatedParticipants[index], [field]: value };
    setNewSession({ ...newSession, participants: updatedParticipants });
  };

  if (activeSession) {
    return (
      <VideoChat
        roomUrl={activeSession.roomUrl}
        roomName={activeSession.title}
        sessionType={activeSession.type}
        participants={activeSession.participants}
        onClose={() => setActiveSession(null)}
        onSessionEnd={(duration) => endSession(activeSession, duration)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Video Session Manager</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Session List */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Sessions</h3>
            <button
              onClick={() => setShowCreateSession(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              + Create New Session
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sessions.map(session => (
              <div key={session.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{session.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    session.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                    session.status === 'scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                    session.status === 'completed' ? 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {session.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Type: {session.type === 'coaching' ? 'Coaching Session' : 'Group Session'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Participants: {session.participants.length}
                </p>
                <div className="flex gap-2">
                  {session.status === 'scheduled' && (
                    <button
                      onClick={() => startSession(session)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Start
                    </button>
                  )}
                  {session.status === 'scheduled' && (
                    <button
                      onClick={() => cancelSession(session)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Cancel
                    </button>
                  )}
                  {session.status === 'completed' && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Duration: {session.endTime && session.startTime ? 
                        Math.floor((session.endTime.getTime() - session.startTime.getTime()) / 1000 / 60) + 'm' : 
                        'N/A'
                      }
                    </span>
                  )}
                </div>
              </div>
            ))}
            {sessions.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                No sessions yet. Create your first session to get started!
              </div>
            )}
          </div>
        </div>

        {/* Create Session Form */}
        {showCreateSession && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New Session</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Session Title
                </label>
                <input
                  type="text"
                  value={newSession.title}
                  onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                  placeholder="Enter session title..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Session Type
                </label>
                <select
                  value={newSession.type}
                  onChange={(e) => setNewSession({ ...newSession, type: e.target.value as 'coaching' | 'group' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="coaching">Coaching Session (1:1)</option>
                  <option value="group">Group Session</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Participants
                  </label>
                  <button
                    onClick={addParticipant}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    + Add Participant
                  </button>
                </div>
                <div className="space-y-2">
                  {newSession.participants.map((participant, index) => (
                    <div key={participant.id} className="flex gap-2">
                      <input
                        type="text"
                        value={participant.name}
                        onChange={(e) => updateParticipant(index, 'name', e.target.value)}
                        placeholder="Participant name"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      />
                      <select
                        value={participant.role}
                        onChange={(e) => updateParticipant(index, 'role', e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="coach">Coach</option>
                        <option value="client">Client</option>
                        <option value="participant">Participant</option>
                      </select>
                      <button
                        onClick={() => removeParticipant(index)}
                        className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={createSession}
                  disabled={!newSession.title.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Create Session
                </button>
                <button
                  onClick={() => setShowCreateSession(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSessionManager; 