import { Server } from 'socket.io';
import { authenticateSocket, AuthenticatedSocket } from '../middleware/socketAuth';

interface Message {
  communityId: string;
  content: string;
  createdAt: string;
  userId?: string; // Will be added from JWT
}

export const setupChatSocket = (io: Server) => {
  // Create chat namespace
  const chatNamespace = io.of('/chat');
  
  // Apply authentication middleware to chat namespace
  chatNamespace.use(authenticateSocket);

  chatNamespace.on('connection', (socket: AuthenticatedSocket) => {
    if (!socket.user) {
      socket.disconnect();
      return;
    }
    
    console.log(`✅ User ${socket.user.userId} connected to /chat`);

    // Handle joining a community room
    socket.on('join_community', (communityId: string) => {
      // Leave all previous rooms except the socket's own
    //   const rooms = Array.from(socket.rooms);
    //   rooms.forEach(room => {
    //     if (room !== socket.id) {
    //       socket.leave(room);
    //     }
    //   });

      // Join the new community room
      socket.join(communityId);
      console.log(`📥 User ${socket.user?.userId} joined community ${communityId}`);

      // Notify only that user
      socket.emit('joined_community', { communityId });
    });

    // Handle leaving a community room
    socket.on('leave_community', (communityId: string) => {
      socket.leave(communityId);
      console.log(`📤 User ${socket.user?.userId} left community ${communityId}`);

      socket.emit('left_community', { communityId });
    });

    // Handle new message
    socket.on('new_message', (messageData: Message) => {
      try {
        if (!messageData.communityId || !messageData.content) {
          socket.emit('error', { message: 'Invalid message data' });
          return;
        }

        // Attach sender info
        const message: Message = {
          ...messageData,
          userId: socket.user!.userId,
          createdAt: messageData.createdAt || new Date().toISOString(),
        };

        // Broadcast to that community room only
        chatNamespace.to(message.communityId).emit('message_received', message);

        console.log(`💬 Message in ${message.communityId} by ${socket.user!.userId}`);
      } catch (error) {
        console.error('❌ Error handling new message:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`🔌 User ${socket.user?.userId} disconnected from /chat`);
    });

    // Handle socket errors
    socket.on('error', (error) => {
      console.error('⚠️ Socket error:', error);
    });
  });
};
