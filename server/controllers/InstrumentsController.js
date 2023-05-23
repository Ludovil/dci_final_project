import cloudinary from 'cloudinary';
import UserCollection from '../models/usersSchema.js';
import instrumentsCollection from '../models/instrumentsSchema.js';
import fs from 'fs';

// upload several images as files
export const uploadImagesInstruments = async (req, res) => {
	try {
		const { userId } = req.body;
		const files = req.files;

		const uploadedImages = [];

		// Upload images to Cloudinary
		for (const file of files) {
			const cloudinaryResponse = await cloudinary.v2.uploader.upload(
				//file.buffer
				`./uploads/${file.filename}`,
				{ folder: 'final_project/instruments' }
			);
			const instruments = new instrumentsCollection({
				userId: userId,
				imageUrl: cloudinaryResponse.secure_url,
			});
			await instruments.save();
			uploadedImages.push(instruments);
		}

		// Update user's instruments field
		const user = await UserCollection.findByIdAndUpdate(
			userId,
			{
				$push: {
					instruments: {
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

export const readLoggedUserInstruments = async (req, res) => {
	try {
		const { instrumentsIds } = req.body;

		// Retrieve the Cloudinary image documents based on the provided IDs
		const instruments = await instrumentsCollection.find({
			_id: { $in: instrumentsIds },
		});

		res.status(200).json({ instruments });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server Error' });
	}
};

export const readVisitUserInstruments = async (req, res) => {
	try {
		const { userId } = req.params;

		// Find the user by userId
		const user = await UserCollection.findById(userId);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Fetch the user's cloudinaryImages
		const instruments = await instrumentsCollection.find({ userId });

		res.json(instruments);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server Error' });
	}
};

// delete an instrument
export const deleteInstrument = async (req, res) => {
	try {
		const { instrumentId } = req.params;

		// Find the instrument by its ID
		const instrument = await instrumentsCollection.findById(instrumentId);

		if (!instrument) {
			return res.status(404).json({ error: 'Instrument not found' });
		}

		// Delete the instrument from the instruments collection
		await instrumentsCollection.findByIdAndRemove(instrumentId);

		// Remove the instrument ID from the user's instruments field
		const user = await UserCollection.findByIdAndUpdate(
			instrument.userId,
			{
				$pull: { instruments: instrumentId },
			},
			{ new: true }
		);

		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server Error' });
	}
};
