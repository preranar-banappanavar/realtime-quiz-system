const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://your-frontend-domain.com'
      : 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/questions', require('./routes/questions'));

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: '🎮 Real-Time Quiz System API',
    version: '1.0.0',
    status: 'Running',
    websocket: 'Active'
  });
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log(`✅ New client connected: ${socket.id}`);

  // Import handlers
  require('./socket/roomHandler')(io, socket);
  require('./socket/gameHandler')(io, socket);

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔌 WebSocket server ready`);
  console.log(`🌱 Seed questions: http://localhost:${PORT}/api/questions/seed`);
});