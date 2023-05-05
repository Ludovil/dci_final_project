import { Schema, model } from 'mongoose';

const profileImagesSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  data: { type: Buffer, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
});

const ProfileImageCollection = model('images', profileImagesSchema);

export default ProfileImageCollection;
