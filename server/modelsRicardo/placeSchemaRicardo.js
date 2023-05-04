import { Schema, model } from 'mongoose';

const apartmentSchemaRicardo = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: {
    type: String,
    enum: ['Entire place', 'Private room', 'Shared room'],
    required: true,
  },
  maxGuests: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  beds: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  amenities: {
    wifi: { type: Boolean, default: false },
    kitchen: { type: Boolean, default: false },
    airConditioning: { type: Boolean, default: false },
    heating: { type: Boolean, default: false },
    tv: { type: Boolean, default: false },
    washingMachine: { type: Boolean, default: false },
    dryer: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    elevator: { type: Boolean, default: false },
  },
  // we should be able to create next properties automatically (from the address)
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: { type: [Number], required: true },
    address: { type: String, required: true },
  },
  images: [{ type: String, required: true }],
  host: { type: Schema.Types.ObjectId, ref: 'usersricardo', required: true },
  dateCreated: { type: Date, default: Date.now() },
});

const PlaceCollectionRicardo = model('placericardo', apartmentSchemaRicardo);

export default PlaceCollectionRicardo;
