import { Schema, model } from 'mongoose';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

const cloudinarySchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'users' },
	imageUrl: {
		type: String,
	},
});

const CloudinaryImage = model('cloudinaryimages', cloudinarySchema);
export default CloudinaryImage;
