// Video Chat Configuration
// Production settings for Daily.co integration

export const videoConfig = {
  // Daily.co Configuration
  daily: {
    // Production Daily.co domain
    domain: 'nowindowshopping.daily.co',
    
    // API Key for creating rooms programmatically (optional)
    apiKey: process.env.REACT_APP_DAILY_API_KEY || '',
    
    // Default room settings
    defaultRoomSettings: {
      max_participants: 10,
      enable_chat: true,
      enable_screenshare: true,
      enable_recording: false,
      start_video_off: false,
      start_audio_off: false,
    },
  },

  // Room URL templates
  roomTemplates: {
    coaching: 'https://nowindowshopping.daily.co/coaching-{sessionId}',
    group: 'https://nowindowshopping.daily.co/group-{sessionId}',
    client: 'https://nowindowshopping.daily.co/client-{sessionId}',
  },

  // Session types
  sessionTypes: {
    coaching: {
      maxParticipants: 2,
      defaultDuration: 60, // minutes
      features: ['video', 'audio', 'chat', 'screenshare'],
    },
    group: {
      maxParticipants: 10,
      defaultDuration: 90, // minutes
      features: ['video', 'audio', 'chat', 'screenshare', 'participant-list'],
    },
  },

  // UI Settings
  ui: {
    showParticipantList: true,
    showChat: true,
    showScreenShare: true,
    showRecording: false,
    showFullscreen: true,
    showLeaveButton: true,
  },

  // Error messages
  errorMessages: {
    connectionFailed: 'Failed to connect to video call. Please check your internet connection and try again.',
    roomNotFound: 'The video room could not be found. Please check the room URL.',
    permissionDenied: 'Camera or microphone access was denied. Please allow access and try again.',
    browserNotSupported: 'Your browser does not support video calls. Please use Chrome, Firefox, Safari, or Edge.',
  },
};

// Helper function to generate room URLs
export const generateRoomUrl = (type: 'coaching' | 'group' | 'client', sessionId?: string) => {
  const id = sessionId || Date.now().toString();
  const template = videoConfig.roomTemplates[type];
  return template.replace('{sessionId}', id);
};

// Helper function to validate Daily.co configuration
export const validateVideoConfig = () => {
  const issues = [];
  
  if (videoConfig.daily.domain === 'your-domain.daily.co') {
    issues.push('Please update the Daily.co domain in videoConfig.ts');
  }
  
  if (!videoConfig.daily.apiKey && process.env.NODE_ENV === 'production') {
    issues.push('Daily.co API key is recommended for production use');
  }
  
  return issues;
};

export default videoConfig; 