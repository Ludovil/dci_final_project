import { Schema, model } from "mongoose";

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
  profile_description: {
    type: String,
  },
  music_interests: {
    type: [String],
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
  instruments: [
    {
      type: Schema.Types.ObjectId,
      ref: "instruments",
    },
  ],
  conversations: [{ type: Schema.Types.ObjectId, ref: "conversations" }],
  description: {
    type: String,
  },
});

const UserCollection = model("users", userSchema);

export default UserCollection;
