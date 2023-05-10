import PlaceCollection from '../models/apartmentsSchema.js';
import ImageCollection from '../models/imagesSchema.js';
import UserCollection from '../models/usersSchema.js';

export const createApartment = async (req, res) => {
  try {
    const { title, host } = req.body;

    const place = new PlaceCollection({
      title,
      host,
    });

    if (req.files && req.files.image) {
      let imageFiles = req.files.image;
      if (!Array.isArray(imageFiles)) {
        // Convert single file to an array
        imageFiles = [imageFiles];
      }

      const imagePromises = imageFiles.map((item) => {
        const { name, data } = item;

        const newImage = new ImageCollection({
          filename: new Date().getTime() + '_' + name,
          data,
          userId: req.body.userId,
          apartmentId: place._id,
        });

        return newImage.save();
      });

      const allImages = await Promise.all(imagePromises);

      const user = await UserCollection.findById(req.body.host);

      for (const image of allImages) {
        const link = `http://localhost:3000/images/${image.filename}`;
        user.apartment_images.push(image._id);
        place.images.push({ link, id: image._id });
      }

      await user.save();
    }

    await place.save();
    res.status(200).json({ message: 'Apartment created successfully' });
  } catch (err) {
    console.error('Error creating apartment:', err);
    res.status(500).json({ error: 'Failed to create apartment' });
  }
};

export const modifiedApartment = async (req, res) => {
  const { id } = req.params;

  let imagePromises = [];
  if (req.files && Array.isArray(req.files.image)) {
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
  } else if (req.files && req.files.image) {
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

  // Modify 'title'. Later we should add more properties her
  if (req.body.title || req.body.title === '') {
    place.title = req.body.title;
  }

  await place.save();
  res.status(200).json({ message: 'Apartment modified successfully' });
};

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
