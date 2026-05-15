# Video Chat Setup Guide

This guide will help you set up the video chat feature for coaching sessions and group sessions. The project supports two video backends:

- **WebRTC** (peer-to-peer): Used for 2-player game room calls. Lower latency, from LoveQuest implementation.
- **Daily.co**: Used for 3+ player sessions and coaching.

## Features Added

✅ **WebRTC 1:1 Video Calls** (from LoveQuest videochat implementation)
- Peer-to-peer for lower latency
- Reconnect grace period on transient disconnect
- ICE restart on failure
- TURN support for restrictive networks (corporate, mobile)
- Firestore signaling: `gameRoomCalls/{roomId}`

✅ **Enhanced VideoChat Component**
- Support for both coaching (1:1) and group sessions
- Real-time participant management
- Built-in chat functionality
- Screen sharing capabilities
- Audio/video controls
- Session duration tracking
- Speaking indicators

✅ **VideoSessionManager Component**
- Create and manage multiple sessions
- Session scheduling and cancellation
- Participant management
- Session history and analytics

✅ **Integration with CoachCare Portal**
- Coach Portal: Quick video calls, coaching sessions, and session management
- Client Portal: Join video sessions with coaches

## Setup Instructions

### 1. Create a Daily.co Account

1. Go to [Daily.co](https://daily.co) and sign up for a free account
2. Choose a domain name (e.g., `yourcompany.daily.co`)
3. Complete the account setup

### 2. Update Configuration

Edit `src/config/videoConfig.ts` and update the following:

```typescript
export const videoConfig = {
  daily: {
    // Replace with your actual Daily.co domain
    domain: 'yourcompany.daily.co',
    
    // Optional: Add your API key for advanced features
    apiKey: process.env.REACT_APP_DAILY_API_KEY || '',
  },
  // ... rest of config
};
```

### 3. Environment Variables (Optional)

Create a `.env` file in the root directory:

```env
REACT_APP_DAILY_API_KEY=your_daily_api_key_here

# WebRTC TURN servers (recommended for mobile/corporate networks)
REACT_APP_TURN_URLS=turn:your-turn-server.com:3478
REACT_APP_TURN_USERNAME=your_username
REACT_APP_TURN_CREDENTIAL=your_credential
```

### 4. Update Room URLs

In the portal components, update the room URLs:

**CoachPortal.tsx:**
```typescript
roomUrl="https://yourcompany.daily.co/coaching-session"
```

**ClientPortal.tsx:**
```typescript
roomUrl="https://yourcompany.daily.co/client-session"
```

## Usage

### For Coaches

1. **Quick Video Call**: Simple 1:1 video call
2. **Start Coaching Session**: Enhanced coaching session with chat and controls
3. **Manage Sessions**: Create, schedule, and manage multiple sessions

### For Clients

1. **Join Video Session**: Connect to scheduled coaching sessions

### Session Types

- **Coaching Sessions**: 1:1 sessions between coach and client
- **Group Sessions**: Multi-participant sessions for workshops or group coaching

## Features

### Video Controls
- 🎤 Mute/Unmute audio
- 📹 Enable/Disable video
- 🖥️ Screen sharing
- 👥 Participant list
- 💬 Chat messaging
- 📞 Leave call

### Session Management
- Create new sessions
- Schedule sessions
- Cancel sessions
- Track session duration
- View session history

### Participant Management
- Add/remove participants
- Assign roles (coach, client, participant)
- Real-time participant status
- Speaking indicators

## Browser Support

The video chat feature works best with:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### Common Issues

1. **"Failed to join the video call"**
   - Check your internet connection
   - Ensure camera/microphone permissions are granted
   - Verify the Daily.co domain is correct

2. **"Camera or microphone access denied"**
   - Allow camera/microphone access in your browser
   - Check browser settings for site permissions

3. **"Room not found"**
   - Verify the room URL is correct
   - Ensure the room exists in your Daily.co account

### Development vs Production

- **Development**: Uses demo room URLs
- **Production**: Requires proper Daily.co domain and API key

## API Integration (Advanced)

For advanced features, you can integrate with Daily.co's API:

```typescript
// Create rooms programmatically
const createRoom = async (roomName: string) => {
  const response = await fetch('https://api.daily.co/v1/rooms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${videoConfig.daily.apiKey}`,
    },
    body: JSON.stringify({
      name: roomName,
      privacy: 'public',
      properties: videoConfig.daily.defaultRoomSettings,
    }),
  });
  return response.json();
};
```

## Security Considerations

1. **Room Privacy**: Use private rooms for sensitive sessions
2. **API Keys**: Keep API keys secure and use environment variables
3. **Participant Verification**: Implement proper authentication for session access
4. **Recording**: Disable recording for confidential sessions

## Next Steps

1. Set up your Daily.co account
2. Update the configuration files
3. Test the video chat functionality
4. Customize the UI to match your branding
5. Implement additional security measures as needed

## Support

For issues with:
- **Daily.co**: Contact Daily.co support
- **Video Chat Implementation**: Check the component documentation
- **Integration**: Review the portal component code

---

**Note**: This implementation uses Daily.co's free tier. For production use with many users, consider upgrading to a paid plan. 