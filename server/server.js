// DO WE NEED TO IMPORT IMAGESCOLLECTIONRICARDO LIKE NAQVI? WHAT'S THE PURPOSE OF IT?

// DO WE NEED THIS CODE FOR PHOTOS OF THE APARTMENT, RIGHT?
/**
 app.get('/images/:filename', async (req, res) => {
   const image = await ImagesCollection.findOne({
     filename: req.params.filename,
   });
   const readStream = stream.Readable.from(image.data); // para
   readStream.pipe(res);
 });
 */

//==========================================================================================
import express from 'express';
import mongoose from 'mongoose';
import usersRoute from './routes/usersRoute.js';
import fileUpload from 'express-fileupload'; // npm i express-fileupload
// import stream from 'stream'; --> DO WE NEED IT FOR THE IMAGES? IS IT FOR ALL IMAGES (INCLUDING PROFILE PICTURE) OR ONLY FOR THE PLACES AND INSTRUMENTS PICTURES
import cors from 'cors';
import dotenv from 'dotenv';
// import Stripe from 'stripe'; // npm i stripe
// export const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
dotenv.config();

// server
const app = express();
const PORT = process.env.PORT || 3000;

// database
mongoose
  .connect('mongodb://127.0.0.1:27017/final_project') // CHANGE WITH DOTENV
  .then(() => console.log('Connect to DB created'))
  .catch((err) => console.log(err.message));

// middlewares
app.use(cors({ origin: 'http://localhost:5173', exposedHeaders: ['token'] })); // WE NEED IT TO SEND THE TOKEN FROM THE BACKEND TO THE FRONTEND
app.use(express.json());
app.use(fileUpload());

// routes
app.use('/users', usersRoute);

app.listen(PORT, () => console.log('Server is running on PORT', PORT));
