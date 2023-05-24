import { Schema, model } from 'mongoose';

const placeSchema = new Schema({
  title: { type: String, required: true },
  // description: { type: String, required: true },
  //  type: {
  //   type: String,
  //   enum: ['Entire place', 'Private room', 'Shared room'],
  //   required: true,
  // },
  // maxGuests: { type: Number, required: true },
  /*
  bedrooms: { type: Number, required: true },
  */
  // beds: { type: Number, required: true },
  /*
  bathrooms: { type: Number, required: true },
  */
  // amenities: {
  //   wifi: { type: Boolean, default: false },
  //   essentials: { type: Boolean, default: false },
  //   refrigerator: { type: Boolean, default: false },
  //   kitchen: { type: Boolean, default: false },
  //   airConditioning: { type: Boolean, default: false },
  //   parking: { type: Boolean, default: false },
  // },
  /*
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    address: { type: String, required: true },
    coordinates: { type: [Number], required: true },
  },
  */
  images: [
    {
      id: { type: Schema.Types.ObjectId, ref: 'images' },
      link: { type: String },
    },
  ],
  host: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  /*
  dateCreated: { type: Date, default: Date.now() },
  */
});

const PlaceCollection = model('places', placeSchema);

export default PlaceCollection;
