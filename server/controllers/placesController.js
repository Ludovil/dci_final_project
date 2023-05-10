import PlaceCollection from '../models/apartmentsSchema.js';
import ImageCollection from '../models/imagesSchema.js';
import UserCollection from '../models/usersSchema.js';

/*
export const createApartment = async (req, res) => {
  try {
    const { name, data } = req.files.image;

    const place = new PlaceCollection({
      title: req.body.title,
      host: req.body.host,
    });

    let imagePromises = req.files.image.map((item) => {
      const { name, data } = item;

      const newImage = new ImageCollection({
        filename: new Date().getTime() + '_' + name,
        data,
        // userId: req.user._id, --> token
        userId: req.body.userId,
        apartmentId: place._id,
      });

      const savedImage = newImage.save();

      return savedImage;
    });

    let allImages = await Promise.all(imagePromises);

    const user = await UserCollection.findById(req.body.host);

    for (const image of allImages) {
      const link = `http://localhost:3000/images/${image.filename}`;

      user.apartment_images.push(image._id);

      place.images.push({ link, id: image._id });
    }

    await user.save();
    await place.save();
    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};
*/
export const createApartment = async (req, res) => {
  try {
    const { name, data } = req.files.image;

    const place = new PlaceCollection({
      title: req.body.title,
      host: req.body.host,
    });

    let imagePromises = [];
    if (Array.isArray(req.files.image)) {
      imagePromises = req.files.image.map((item) => {
        const { name, data } = item;

        const newImage = new ImageCollection({
          filename: new Date().getTime() + '_' + name,
          data,
          userId: req.body.userId,
          apartmentId: place._id,
        });

        const savedImage = newImage.save();

        return savedImage;
      });
    } else {
      const { name, data } = req.files.image;

      const newImage = new ImageCollection({
        filename: new Date().getTime() + '_' + name,
        data,
        userId: req.body.userId,
        apartmentId: place._id,
      });

      const savedImage = newImage.save();

      imagePromises.push(savedImage);
    }

    let allImages = await Promise.all(imagePromises);

    const user = await UserCollection.findById(req.body.host);

    for (const image of allImages) {
      const link = `http://localhost:3000/images/${image.filename}`;

      user.apartment_images.push(image._id);

      place.images.push({ link, id: image._id });
    }

    await user.save();
    await place.save();
    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

/*
export const modifiedApartment = async (req, res) => {
  const { id } = req.params;

  let imagePromises = req.files.image.map((item) => {
    const { name, data } = item;

    const newImage = new ImageCollection({
      filename: new Date().getTime() + '_' + name,
      data,
      // userId: req.user._id, --> token
      userId: req.body.userId,
      apartmentId: id,
    });

    const savedImage = newImage.save();

    return savedImage;
  });

  let allImages = await Promise.all(imagePromises);

  const place = await PlaceCollection.findById(id);
  allImages.forEach((image) => {
    const link = `http://localhost:3000/images/${image.filename}`;

    place.images.push({ link, id: image._id });
  });
  await place.save();
  res.status(200).json({ message: 'Image uploaded successfully' });
};
*/
export const modifiedApartment = async (req, res) => {
  const { id } = req.params;

  let imagePromises = [];
  if (Array.isArray(req.files.image)) {
    imagePromises = req.files.image.map((item) => {
      const { name, data } = item;

      const newImage = new ImageCollection({
        filename: new Date().getTime() + '_' + name,
        data,
        userId: req.body.userId,
        apartmentId: id,
      });

      const savedImage = newImage.save();

      return savedImage;
    });
  } else {
    const { name, data } = req.files.image;

    const newImage = new ImageCollection({
      filename: new Date().getTime() + '_' + name,
      data,
      userId: req.body.userId,
      apartmentId: id,
    });

    const savedImage = newImage.save();

    imagePromises.push(savedImage);
  }

  let allImages = await Promise.all(imagePromises);

  const place = await PlaceCollection.findById(id);
  allImages.forEach((image) => {
    const link = `http://localhost:3000/images/${image.filename}`;

    place.images.push({ link, id: image._id });
  });

  // modify 'title'
  if (req.body.title) {
    place.title = req.body.title;
  }

  await place.save();
  res.status(200).json({ message: 'Image uploaded successfully' });
};

/*
export const deleteApartment = async (req, res) => {
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
*/
export const deleteApartment = async (req, res) => {
  try {
    const placeId = req.params.id;

    // Delete the apartment document
    await PlaceCollection.findByIdAndDelete(placeId);

    // Delete any associated images
    await ImageCollection.deleteMany({ apartmentId: placeId });

    res.status(200).json({ message: 'Apartment deleted successfully' });
  } catch (err) {
    console.error('Error deleting apartment:', err);
    res.status(500).json({ error: 'Failed to delete apartment' });
  }
};
