import { io, Socket } from 'socket.io-client';
import { API_CONFIG } from '../constants/Api';

class SocketService {
  private sockets: Map<string, Socket> = new Map();
  private readonly DEFAULT_NAMESPACE = '/';

  connect(namespace: string = this.DEFAULT_NAMESPACE){
    if (!this.sockets.has(namespace)) {
      const socketUrl = `${API_CONFIG.BASE_URL}${namespace}`;
      const socket = io(socketUrl, {
        transports: ['websocket'],
        autoConnect: true,
      });

      socket.on('connect', () => {
        console.log(`Connected to WebSocket server on namespace: ${namespace}`);
      });

      socket.on('disconnect', () => {
        console.log(`Disconnected from WebSocket server on namespace: ${namespace}`);
      });

      this.sockets.set(namespace, socket);
    }
  }

  disconnect(namespace: string = this.DEFAULT_NAMESPACE) {
    const socket = this.sockets.get(namespace);
    if (socket) {
      socket.disconnect();
      this.sockets.delete(namespace);
      console.log(`Disconnected from namespace: ${namespace}`);
    }
  }

  emit(event: string, data: any, namespace: string = this.DEFAULT_NAMESPACE) {
    const socket = this.sockets.get(namespace);
    if (socket) {
      socket.emit(event, data);
    }
  }

  on(event: string, callback: (data: any) => void, namespace: string = this.DEFAULT_NAMESPACE) {
    const socket = this.sockets.get(namespace);
    if (socket) {
      socket.on(event, callback);
    }
  }

  off(event: string, namespace: string = this.DEFAULT_NAMESPACE) {
    const socket = this.sockets.get(namespace);
    if (socket) {
      socket.off(event);
    }
  }
}

export default new SocketService();
