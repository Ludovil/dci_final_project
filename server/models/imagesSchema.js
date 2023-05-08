import { Schema, model } from 'mongoose';

const imageSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  data: { type: Buffer, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  apartmentId: { type: Schema.Types.ObjectId, ref: 'places' },
});

const ImageCollection = model('images', imageSchema);

export default ImageCollection;
