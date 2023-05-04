// DO WE NEED TO IMPORT IMAGESCOLLECTIONRICARDO LIKE NAQVI? WHAT'S THE PURPOSE OF IT?

// INSTAL DOTENV

// DO WE NEED EXPRESS.STATIC MIDDLEWARE? -------> SEE HELMET AND RATE LIMITING

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
// import dotenv from 'dotenv'; // Ludo didn't download this package. We should do it (npm i dotenv)
import usersRouteRicardo from './routesRicardo/usersRouteRicardo.js';
import fileUpload from 'express-fileupload'; // npm i express-fileupload
// import stream from 'stream';
import cors from 'cors';
// dotenv.config();
// import Stripe from 'stripe'; // npm i stripe
// export const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const app = express();

const PORT = process.env.PORT || 4000;

mongoose
  .connect('mongodb://127.0.0.1:27017/final_project_ricardo') // use dotenv
  .then(() => console.log('Connection to DB created'))
  .catch((err) => console.log(err.message));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  next();
});

app.use(cors({ origin: 'http://localhost:5173', exposedHeaders: ['token'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
// app.use(express.static('views/dist')); --> DO WE NEED IT?

app.use('/usersricardo', usersRouteRicardo);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
