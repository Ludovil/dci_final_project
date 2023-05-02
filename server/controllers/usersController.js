import axios from 'axios';
import UserCollection from '../models/usersSchema.js';

const API_KEY = 'c53b5cb2b6794d1881e5704b0a5f1ea0';

export const createUser = async (req, res) => {
	try {
		const { userName, email, password, address, profile_image } = req.body;

		const response = await axios.get(
			`https://api.geoapify.com/v1/geocode/search?housenumber=${address.housenumber}&street=${address.street}&postcode=${address.postcode}&city=${address.city}&country=germany&format=json&apiKey=${API_KEY}`
		);

		// Extract latitude and longitude from the response data
		const lat = response.data.results[0].lat;
		const lon = response.data.results[0].lon;

		// Extract formatted address

		const formatted_address = response.data.results[0].formatted;
		console.log(formatted_address);

		const user = new UserCollection({
			userName,
			email,
			password,
			profile_image,
			address,
			geocode: [lat, lon],
			formatted_address: formatted_address,
		});

		try {
			await user.save();
			res.status(201).json({ success: true, data: user });
		} catch (err) {
			res.status(500).json({ err: 'Failed to create user' });
		}
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};

export const readUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await UserCollection.findById(id);
		if (user) {
			res.json({ success: true, data: user });
		} else {
			res.json({ success: false, message: 'not valid id' });
		}
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};

export const readAllUsers = async (req, res) => {
	try {
		const users = await UserCollection.find();
		res.json({ success: true, data: users });
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};

	
