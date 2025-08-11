import api from './api';
import socket from './socket';
import { API_CONFIG } from '../constants/Api';

interface Message {
  id: string;
  communityId: string;
  username: string;
  content: string;
  createdAt: string;
}

interface SendMessagePayload extends Omit<Message, 'id'> {
}

interface RecieveMessagePayload extends Message {
  profileimage?: string; // optional image URL
  banner: string;
}

interface GetMessagesParams {
  communityId: string;
  date: string;
  limit?: number;
  page?: number; // for pagination
}

interface MessagesResponse extends RecieveMessagePayload {
  messages: RecieveMessagePayload[];
  totalMessages: number;
  hasMore: boolean;
}

export const getMessages = async (params: GetMessagesParams): Promise<MessagesResponse>  => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.MESSAGES.BASE, {
        params: {
          communityId: params.communityId,
          sortBy: params.date,
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
export const subscribeToMessages = (callback: (message: Message) => void) => {
  socket.connect();
  socket.on('message_received', callback); // create callback
};

export const unsubscribeFromMessages = () => {
  socket.off('message_received');
};

// export const subscribeToTyping = (callback: (data: { userId: string, isTyping: boolean }) => void) => {
//   socket.on('user_typing', callback);
// };

// export const emitTyping = (data: { receiverId?: string, communityId?: string }) => {
//   socket.emit('typing', data);
// };
