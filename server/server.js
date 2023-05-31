import InstrumentsRoute from './routes/InstrumentsRoute.js';
import express from 'express';
import mongoose from 'mongoose';
import usersRoute from './routes/usersRoute.js';
import conversationRoute from './routes/conversationRoutes.js';
import messagesRoute from './routes/messagesRoutes.js';
import reviewsRoute from './routes/reviewsRoute.js';
import http from 'http';
import { Server } from 'socket.io';
import Message from './models/messageSchema.js';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import fileupload from 'express-fileupload';
dotenv.config();

// server
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, { cors: 'http://localhost:5173' });

// database
mongoose
  .connect('mongodb://127.0.0.1:27017/final_project')
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err.message));

// json middleware
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:5173',
    exposedHeaders: ['token'],
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.json({ mess: 'hello ' });
});
// routes
app.use('/users', usersRoute);
app.use('/instruments', InstrumentsRoute);
app.use('/conversations', conversationRoute);
app.use('/messages', messagesRoute);
app.use('/reviews', reviewsRoute);

// socket code here
io.on('connection', (socket) => {
  socket.on('joinConversation', (conversationId) => {
    socket.join(conversationId);
  });
  socket.on('sendMessage', async (conversationId, message) => {
    const messageData = new Message(message);
    await messageData.save();
    console.log(await messageData.populate('sender'));
    io.to(conversationId).emit(
      'getMessage',
      await messageData.populate('sender')
    );
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});

server.listen(PORT, () => console.log('Server is running on PORT', PORT));
