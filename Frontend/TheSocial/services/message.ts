// import api from './api';
// import { API_CONFIG } from '../constants/Api';
import socket from './socket';
import { getTokens } from '../utils/tokenStorage';
import { checkTokens } from '../utils/checkTokens';

interface Message {
  id?: number; // unique identifier for the message
  communityId: string; // unique identifier for the community
  content: string;
  createdAt?: string; // year, month, day, time: using isoString format
}

export interface SendMessagePayload extends Omit<Message, 'id'> {}

export interface RecieveMessagePayload extends Message {
  username: string;
  userImage?: string;
  banner: string;
}

// interface GetMessagesParams {
//   communityId: string;
//   before: string; // day, year
//   limit?: number;
//   page?: number; // for pagination
// }

// interface GetTodayMessaesParams {
//   communityId: string;
//   beforeMessageId: string;
//   limit?: number;
//   page?: number; // for pagination
// }

// interface MessagesResponse extends RecieveMessagePayload {
//   messages: RecieveMessagePayload[];
//   totalMessages: number;
//   hasMore: boolean;
// }

// Get messages in a community before a specific day
// export const getMessagesDayBefore = async (params: GetMessagesParams): Promise<MessagesResponse>  => {
//   try {
//     const response = await api.get(API_CONFIG.ENDPOINTS.MESSAGES.BASE, {
//         params: {
//           communityId: params.communityId,
//           sortByDayBefore: params.before,
//           limit: params.limit || 20,
//           page: params.page || 1
//         }
//       });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     throw error;
//   }
// };

// // Get today's messages in a community before a specific message ID
// export const getTodayMessagesBeforeMsgId = async (params: GetTodayMessaesParams): Promise<MessagesResponse> => {
//   try {
//     const response = await api.get(API_CONFIG.ENDPOINTS.MESSAGES.BASE, {
//         params: {
//           communityId: params.communityId,
//           beforeMessageId: params.beforeMessageId,
//           limit: params.limit || 20,
//           page: params.page || 1
//         }
//       });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching today\'s messages:', error);
//     throw error;
//   }
// };

// // Get last message in a community
// export const getLastMessage = async (communityId: string): Promise<MessagesResponse> => {
//   try {
//     const response = await api.get(API_CONFIG.ENDPOINTS.MESSAGES.BASE, {
//         params: {
//           communityId: communityId,
//           lastMessage: true
//         }
//       });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching messages by day:', error);
//     throw error;
//   }
// };

// This sends a new message to the community by websocket and http(which stores the data in db with a unique msgId)
export const sendMessage = async (payload: SendMessagePayload) => {
  try {
    // const response = await api.post(API_CONFIG.ENDPOINTS.MESSAGES.BASE, payload);
    // Also emit through socket for real-time updates
    socket.emit('new_message', payload, '/chat'); // emit to chat namespace
    // return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const subscribeToMessages = async (
  communityId: string,
  callback: (message: RecieveMessagePayload) => void
) => {
  await checkTokens();
  const tokens = await getTokens();

  // connect to /chat namespace with token
  socket.connect({
    namespace: '/chat',
    authToken: tokens.accessToken,
  });
  
  if (!socket.isConnected('/chat')) {
    // wait for connect event, then join community
    socket.on(
      'connect',
      () => {
        console.log(`✅ Connected, now joining community ${communityId}`);
        socket.emit('join_community', communityId, '/chat');
        console.log(`📥 User ${tokens.accessToken} joined community ${communityId}`);
      },
      '/chat'
    );
  } else {
    // already connected, just join directly
    socket.emit('join_community', communityId, '/chat');
    console.log(`📥 User ${tokens.accessToken} joined community ${communityId}`);
  }

  // listen for messages
  socket.on('message_received', callback, '/chat');
};

export const unsubscribeFromMessages = (communityId: string) => {
  // leave the community room
  socket.emit('leave_community', communityId, '/chat');

  // remove listener
  socket.off('message_received', '/chat');
};

// export const subscribeToTyping = (callback: (data: { userId: string, isTyping: boolean }) => void) => {
//   socket.on('user_typing', callback);
// };

// export const emitTyping = (data: { receiverId?: string, communityId?: string }) => {
//   socket.emit('typing', data);
// };

