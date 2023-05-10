import express from 'express';
import mongoose from 'mongoose';
import usersRoute from './routes/usersRoute.js';
import placesRoute from './routes/placesRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
import fileupload from 'express-fileupload';
import conversationRoute from './routes/conversationRoutes.js';
import messagesRoute from "./routes/messagesRoutes.js"

dotenv.config();

// server
const app = express();
const PORT = process.env.PORT || 3000;

// database
mongoose
  .connect('mongodb://127.0.0.1:27017/final_project')
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err.message));

// json middleware
app.use(express.json({ limit: '10mb' }));

app.use(
  cors({
    origin: 'http://localhost:5173',
    exposedHeaders: ['token'],
    credentials: true,
  })
);

app.use(fileupload());

// routes
app.use('/users', usersRoute);
app.use('/places', placesRoute);

app.use('/conversations', conversationRoute);
app.use('/messages', messagesRoute);

app.listen(PORT, () => console.log('Server is running on PORT', PORT));
