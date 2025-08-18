import { Server, Socket } from 'socket.io';
import { verifyAccessToken } from '../utils/jwt';

export interface AuthenticatedSocket extends Socket {
  user?: { userId: string };
}

// JWT verification middleware for Socket.IO
export const authenticateSocket = (socket: AuthenticatedSocket, next: (err?: Error) => void) => {
  try {
    const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return next(new Error('Authentication token required'));
    }

    const decoded = verifyAccessToken(token) as { userId: string };
    socket.user = { userId: decoded.userId };
    next();
  } catch (error) {
    next(new Error('Invalid authentication token'));
  }
};