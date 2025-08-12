import api from './api';
import socket from './socket';
import { API_CONFIG } from '../constants/Api';

interface Message {
  id: number; // unique identifier for the message
  communityId: string; // unique identifier for the community
  username: string; // unique identifier for the user
  content: string;
  createdAt: string; // year, month, day, time: using isoString format
}

interface SendMessagePayload extends Omit<Message, 'id'> {
}

interface RecieveMessagePayload extends Message {
  profileimage?: string; // optional image URL
  banner: string;
}

interface GetMessagesParams {
  communityId: string;
  before: string; // day, year
  limit?: number;
  page?: number; // for pagination
}

interface GetTodayMessaesParams {
  communityId: string;
  beforeMessageId: string;
  limit?: number;
  page?: number; // for pagination
}

interface MessagesResponse extends RecieveMessagePayload {
  messages: RecieveMessagePayload[];
  totalMessages: number;
  hasMore: boolean;
}

export const getMessagesDayBefore = async (params: GetMessagesParams): Promise<MessagesResponse>  => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.MESSAGES.BASE, {
        params: {
          communityId: params.communityId,
          sortByDayBefore: params.before,
          limit: params.limit || 20,
          page: params.page || 1
        }
      });
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const getTodayMessagesBeforeMsgId = async (params: GetTodayMessaesParams): Promise<MessagesResponse> => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.MESSAGES.BASE, {
        params: {
          communityId: params.communityId,
          beforeMessageId: params.beforeMessageId,
          limit: params.limit || 20,
          page: params.page || 1
        }
      });
    return response.data;
  } catch (error) {
    console.error('Error fetching today\'s messages:', error);
    throw error;
  }
};

export const getLastMessage = async (communityId: string): Promise<MessagesResponse> => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.MESSAGES.BASE, {
        params: {
          communityId: communityId,
          lastMessage: true
        }
      });
    return response.data;
  } catch (error) {
    console.error('Error fetching messages by day:', error);
    throw error;
  }
};

export const sendMessage = async (payload: SendMessagePayload): Promise<RecieveMessagePayload> => {
  try {
    const response = await api.post(API_CONFIG.ENDPOINTS.MESSAGES.BASE, payload);
    // Also emit through socket for real-time updates
    socket.emit('new_message', payload);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// WebSocket methods
export const subscribeToMessages = (communityId: number, callback: (message: Message) => void) => {
  socket.connect('/' + communityId);
  socket.on('message_received', callback); // create callback
};

export const unsubscribeFromMessages = (communityId: number) => {
  socket.off('message_received');
  socket.disconnect('/' + communityId);
};

// export const subscribeToTyping = (callback: (data: { userId: string, isTyping: boolean }) => void) => {
//   socket.on('user_typing', callback);
// };

// export const emitTyping = (data: { receiverId?: string, communityId?: string }) => {
//   socket.emit('typing', data);
// };
