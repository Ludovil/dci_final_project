import express from 'express';
import multer from 'multer';
import { uploadImages } from '../controllers/cloudinaryController.js';
import CloudinaryImage from '../models/cloudinarySchema.js';

const router = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads'); // Specify the destination folder for the uploaded files
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname); // Use the original filename for the uploaded files
	},
});

const upload = multer({ storage });

//router.post('/urlupload', uploadImage);
router.post('/filesupload', upload.array('files'), uploadImages);
router.post('/images/cloudinary', async (req, res) => {
	try {
		const { cloudinaryImageIds } = req.body;

		// Retrieve the Cloudinary image documents based on the provided IDs
		const cloudinaryImages = await CloudinaryImage.find({
			_id: { $in: cloudinaryImageIds },
		});

		res.status(200).json({ cloudinaryImages });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server Error' });
	}
});

export default router;
