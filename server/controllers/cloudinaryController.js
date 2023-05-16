import cloudinary from 'cloudinary';
import UserCollection from '../models/usersSchema.js';
import CloudinaryImage from '../models/cloudinarySchema.js';
import fs from 'fs';

// upload just one single image with URL
// export const uploadImage = async (req, res) => {
// 	try {
// 		// previous version with image url
// 		const { userId, imageUrl } = req.body;
// 		// Upload image to Cloudinary
// 		const cloudinaryResponse = await cloudinary.v2.uploader.upload(
// 			imageUrl,
// 			{ folder: 'final_project' }
// 		);
// 		// Create CloudinaryImage document
// 		const cloudinaryImage = new CloudinaryImage({
// 			user: userId,
// 			imageUrl: cloudinaryResponse.secure_url,
// 		});
// 		await cloudinaryImage.save();
// 		// Update user's cloudinaryImages field
// 		const user = await UserCollection.findByIdAndUpdate(
// 			userId,
// 			{ $push: { cloudinaryImages: cloudinaryImage._id } },
// 			{ new: true }
// 		);
// 		res.status(201).json({ success: true, data: user });
// 	} catch (err) {
// 		res.json({ success: false, message: err.message });
// 	}
// };

// upload several images as files
export const uploadImages = async (req, res) => {
	try {
		const { userId } = req.body;
		const files = req.files;

		const uploadedImages = [];

		// Upload images to Cloudinary
		for (const file of files) {
			const cloudinaryResponse = await cloudinary.v2.uploader.upload(
				//file.buffer
				`./uploads/${file.filename}`,
				{ folder: 'final_project' }
			);
			const cloudinaryImage = new CloudinaryImage({
				userId: userId,
				imageUrl: cloudinaryResponse.secure_url,
			});
			await cloudinaryImage.save();
			uploadedImages.push(cloudinaryImage);
		}

		// Update user's cloudinaryImages field
		const user = await UserCollection.findByIdAndUpdate(
			userId,
			{
				$push: {
					cloudinaryImages: {
						$each: uploadedImages.map((img) => img._id),
					},
				},
			},
			{ new: true }
		);

		// Empty the /uploads folder
		const folderPath = './uploads';
		fs.readdir(folderPath, (err, files) => {
			if (err) {
				console.error('Error reading folder:', err);
				return;
			}

			files.forEach((file) => {
				const filePath = `${folderPath}/${file}`;

				fs.unlink(filePath, (err) => {
					if (err) {
						console.error('Error deleting file:', err);
						return;
					}
					console.log('File deleted:', filePath);
				});
			});
		});
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server Error' });
	}
};
