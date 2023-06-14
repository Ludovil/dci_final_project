import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
  },
  address: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    postcode: { type: String, required: true },
    street: { type: String, required: true },
    housenumber: { type: String, required: true },
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

// set email as an index
userSchema.indexes({ email: 1 });

const UserCollection = model("users", userSchema);

export default UserCollection;
