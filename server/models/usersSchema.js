import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: '../assets/images/profileImage.png',
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
});

const UserCollection = model('users', userSchema);

export default UserCollection;
