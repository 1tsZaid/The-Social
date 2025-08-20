import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
import communityRoutes from './routes/communityRouter';
import postRoutes from './routes/postRoutes';
import { setupChatSocket } from './sockets/chatSocket';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: [
      process.env.CORS_ORIGIN || 'http://localhost:3000', 
      process.env.CORS_ORIGIN_DEV || 'http://localhost:8081'
    ],
    credentials: true,
  },
  transports: ['websocket'],
});

// Security middleware
app.use(helmet());
app.use(cors({
  origin: [process.env.CORS_ORIGIN || 'http://localhost:3000', process.env.CORS_ORIGIN_DEV || 'http://localhost:8081'],
  credentials: true,
}));

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again later.',
// });
// app.use('/api/auth', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files (uploaded images)
app.use('/uploads', (req, res, next) => {
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  res.header('Access-Control-Allow-Origin', '*');
  next();
}, express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/posts', postRoutes);

// Setup chat socket handlers
setupChatSocket(io);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Global error handler
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(error.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
  console.log(`👤 Profile API: http://localhost:${PORT}/api/profile`);
  console.log(`👤 Community API: http://localhost:${PORT}/api/communities`);
  console.log(`📝 Post API: http://localhost:${PORT}/api/posts`);
  console.log(`💬 Chat Socket: ws://localhost:${PORT}/chat`);
});

export default app;
