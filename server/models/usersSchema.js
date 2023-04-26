import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	userName: {
		type: String,
	},
	email: {
		type: String,
	},
	password: {
		type: String,
	},
	geocode: Array,
});

const UserCollection = model('users', userSchema);

export default UserCollection;
