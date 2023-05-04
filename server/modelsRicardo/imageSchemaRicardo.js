import { Schema, model } from 'mongoose';

const imageSchemaRicardo = new Schema({
  filename: {
    type: String,
    required: true,
  },
  data: { type: Buffer, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'usersricardo' }, // this last property 'userId' is not really necessary
});

const ImageCollectionRicardo = model('imagesricardo', imageSchemaRicardo);

export default ImageCollectionRicardo;
