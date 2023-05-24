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
	profile_image: {
		type: String,
	},
	address: {
		country: { type: String },
		city: { type: String },
		postcode: { type: String },
		street: { type: String },
		housenumber: { type: String },
	},
	geocode: Array,
	formatted_address: {
		type: String,
	},
	instruments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'instruments',
		},
	],
	conversations: [{ type: Schema.Types.ObjectId, ref: 'conversations' }],
});

const UserCollection = model('users', userSchema);

export default UserCollection;
