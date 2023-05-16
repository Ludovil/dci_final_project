import express from 'express';
import mongoose from 'mongoose';
import usersRoute from './routes/usersRoute.js';
import placesRoute from './routes/placesRoute.js';
// import place_imagesRoute from './routes/place_imagesRoute.js';
import cloudinaryRoute from './routes/cloudinaryRoute.js';
import imagesRoute from './routes/imagesRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
import fileupload from 'express-fileupload';
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

//app.use(fileupload());

// routes
app.use('/users', usersRoute);
app.use('/places', placesRoute);
// app.use('/images', place_imagesRoute);
app.use('/images', imagesRoute);
app.use('/cloud', cloudinaryRoute);

app.get('/', (req, res) => {
	res.json({ mess: 'hello ' });
});

app.listen(PORT, () => console.log('Server is running on PORT', PORT));
