import jwt from 'jsonwebtoken';
import UserCollection from '../models/usersSchema.js';

export const authorized = async (req, res, next) => {
	try {
		const token = req.headers.token;

		const payload = jwt.verify(token, process.env.SIGNATURE);

		const user = await UserCollection.findById(payload._id);

		req.user = user;

		next();
	} catch (err) {
		res.json({ success: false, message: err.message });
	}
};
