import ImageCollection from '../models/imagesSchema.js';
import stream from 'stream';
import UserCollection from '../models/usersSchema.js';
import PlaceCollection from '../models/apartmentsSchema.js';

export const getPlaceImage = async (req, res, next) => {
  try {
    const { filename } = req.params;
    const image = await ImageCollection.findOne({
      filename,
    });

    const imageStream = stream.Readable.from(image.data);
    imageStream.pipe(res);
  } catch (err) {
    es.json({ success: false, message: err.message });
  }
};

export const updatePlaceImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { filename, buffer } = req.image;

    const deletePlaceImage = await ImageCollection.findByIdAndRemove(id);

    const updatedUser = await UserCollection.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { apartment_images: id },
      },
      { new: true }
    );

    const image = new ImageCollection({
      data: buffer,
      userId: req.user._id,
      filename: new Date().getTime() + '_' + filename,
    });

    await image.save();

    const imageLink = `http://localhost:3000/images/${image.filename}`;

    const place = await PlaceCollection.findByIdAndUpdate(
      deletePlaceImage.apartmentId,
      { $push: { images: imageLink } }
    );

    updatedUser.apartment_images.push(image._id);

    await updatedUser.save();
  } catch (err) {
    es.json({ success: false, message: err.message });
  }
};
