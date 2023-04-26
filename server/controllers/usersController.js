import UserCollection from '../models/usersSchema.js';

export const createUser = async (req, res) => {
	try {
		const user = new UserCollection(req.body);
		await user.save();
		res.json({ success: true, data: user });
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
