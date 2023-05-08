import PlaceCollection from '../models/apartmentsSchema.js';
import ImageCollection from '../models/imagesSchema.js';

export const uploadImage = async (req, res) => {
  try {
    console.log(req.files);
    // const { id } = req.params;
    const { name, data } = req.files.image;

    const newImage = new ImageCollection({
      filename: new Date().getTime() + '_' + name,
      data,
    });

    const savedImage = await newImage.save();

    const link = `http://localhost:3000/images/${savedImage.filename}`;

    const place = new PlaceCollection({
      title: req.body.title,
      host: req.body.host,
    });
    place.images.push({ link, id: savedImage._id });
    await place.save();

    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const placeId = req.params.id;
    const imageId = req.params.imageId;

    const place = await PlaceCollection.findById(placeId);
    const index = place.images.indexOf(imageId);

    if (index > -1) {
      place.images.splice(index, 1);
      await place.save();
    }

    await ImageCollection.findByIdAndDelete(imageId);

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('Error deleting image:', err);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};
