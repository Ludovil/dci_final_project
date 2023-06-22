import { Schema, model } from 'mongoose';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

const instrumentsSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'users' },
	imageUrl: {
		type: String,
	},
	description: {
		type: String,
	},
});

const instrumentsCollection = model('instruments', instrumentsSchema);
export default instrumentsCollection;
