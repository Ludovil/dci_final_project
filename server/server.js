import express from 'express';
import mongoose from 'mongoose';
import usersRoute from './routes/usersRoute.js';
import InstrumentsRoute from './routes/InstrumentsRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';

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

// routes
app.use('/users', usersRoute);

app.use('/instruments', InstrumentsRoute);

app.get('/', (req, res) => {
	res.json({ mess: 'hello ' });
});

app.listen(PORT, () => console.log('Server is running on PORT', PORT));
