// WE SHOULD ADD HERE ALSO THE AVAILABILITY. HOW CAN WE DO IT? CAN WE MAKE THIS VALUE DINAMIC?

// WHICH MORE SCHEMAS DO WE NEED?
// ==========================================================================================//

import { Schema, model } from 'mongoose';

const userSchemaRicardo = new Schema({
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: {
    type: String,
    default: 'user',
    // enum: ['user', 'admin'],
    enum: ['user'],
  },
  phone: { type: String },
  birthDate: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
  },
  // how do I get this image? where do I store it? is this path correct?
  profileImage: {
    type: String,
    default: '../assets/images/profileImage.png',
  },
  // do I need also a property about when the user was created? --> dateCreated: { type: Date, default: Date.now() },
});

userSchemaRicardo.indexes({ email: 1, userName: -1 });

const UserCollectionRicardo = model('usersricardo', userSchemaRicardo);

export default UserCollectionRicardo;
