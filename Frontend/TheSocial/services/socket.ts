import { io, Socket } from "socket.io-client";
import { API_CONFIG } from "../constants/Api";
import { getTokens } from '../utils/tokenStorage';
import { checkTokens } from '../utils/checkTokens';

interface SocketOptions {
  namespace?: string; // optional namespace, defaults to "/"
  authToken?: string; // optional JWT or custom token
  query?: Record<string, string>; // optional query params
}

class SocketService {
  private sockets: Map<string, Socket> = new Map();
  private readonly DEFAULT_NAMESPACE = "/";

  /**
   * Connect to a socket namespace with optional authentication and query params
   */
  connect({ namespace = this.DEFAULT_NAMESPACE, query }: SocketOptions) {
    if (!this.sockets.has(namespace)) {
      const socketUrl = `${API_CONFIG.SOCKET_BASE_URL}${namespace}`;

      const socket = io(socketUrl, {
        transports: ["websocket"],
        autoConnect: true,
        auth: async (cb) => {
          await checkTokens();
          const tokens = await getTokens();
          cb({ token: tokens.accessToken });
        },
      });

      socket.on("connect", () => {
        console.log(`✅ Connected to namespace: ${namespace}`);
      });

      socket.on("disconnect", (reason) => {
        console.log(`❌ Disconnected from namespace: ${namespace} (Reason: ${reason})`);
      });

      socket.on("connect_error", (err) => {
        console.error(`⚠️ Connection error on namespace ${namespace}:`, err.message);
      });

      this.sockets.set(namespace, socket);
    }
  }

  /**
   * Disconnect from a namespace
   */
  disconnect(namespace: string = this.DEFAULT_NAMESPACE) {
    const socket = this.sockets.get(namespace);
    if (socket) {
      socket.disconnect();
      this.sockets.delete(namespace);
      console.log(`🔌 Disconnected from namespace: ${namespace}`);
    }
  }

  /**
   * Emit event on a specific namespace
   */
  emit(event: string, data: any, namespace: string = this.DEFAULT_NAMESPACE) {
    const socket = this.sockets.get(namespace);
    if (socket?.connected) {
      socket.emit(event, data);
    } else {
      console.warn(`⚠️ Cannot emit, socket not connected for namespace: ${namespace}`);
    }
  }

  /**
   * Listen for event on a specific namespace
   */
  on(event: string, callback: (data: any) => void, namespace: string = this.DEFAULT_NAMESPACE) {
    const socket = this.sockets.get(namespace);
    if (socket) {
      socket.on(event, callback);
    }
  }

  /**
   * Remove listener for event on a specific namespace
   */
  off(event: string, namespace: string = this.DEFAULT_NAMESPACE) {
    const socket = this.sockets.get(namespace);
    if (socket) {
      socket.off(event);
    }
  }

  /**
   * Check if socket is connected
   */
  isConnected(namespace: string = this.DEFAULT_NAMESPACE): boolean {
    return this.sockets.get(namespace)?.connected ?? false;
  }
}

export default new SocketService();