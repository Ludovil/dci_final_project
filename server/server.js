import express from 'express';
import mongoose from 'mongoose';
import usersRoute from './routes/usersRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
import conversationRoute from './routes/conversationRoutes.js';
import messagesRoute from "./routes/messagesRoutes.js"


dotenv.config();

// server
const app = express();
const PORT = process.env.PORT || 3000;

// database
mongoose
	.connect('mongodb://127.0.0.1:27017/final_project')
	.then(() => console.log('connect to DB'))
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

// routes
app.use('/users', usersRoute);
app.use('/conversations', conversationRoute);
app.use('/messages', messagesRoute);


// test
app.get('/', (req, res) => {
	res.send('hello world');
});

app.listen(PORT, () => console.log('server is running on PORT', PORT));
