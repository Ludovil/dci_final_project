/*
import ImageCollection from '../models/imagesSchema.js';
import PlaceCollection from '../models/placeSchema.js';

export const getAllImages = async (req, res) => {
  try {
    const { apartmentId } = req.query;

    // Find the apartment by ID
    const place = await PlaceCollection.findById(apartmentId);

    if (!place) {
      return res.status(404).json({ error: 'Apartment not found' });
    }

    // Authorization check - allow administrators and the user whose ID is in the apartment
    if (
      !req.user ||
      (req.user.role !== 'admin' && place.host !== req.user._id.toString())
    ) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    // Get all images of the apartment
    const images = await ImageCollection.find({ apartmentId });

    res.status(200).json(images);
  } catch (err) {
    console.error('Error retrieving images:', err);
    res.status(500).json({ error: 'Failed to retrieve images' });
  }
};

export const getSingleImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the image by ID
    const image = await ImageCollection.findById(id);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Find the apartment associated with the image
    const place = await PlaceCollection.findById(image.apartmentId);

    if (!place) {
      return res.status(404).json({ error: 'Apartment not found' });
    }

    // Authorization check - allow administrators and the user whose ID is in the apartment
    if (
      !req.user ||
      (req.user.role !== 'admin' && place.host !== req.user._id.toString())
    ) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    res.status(200).json(image);
  } catch (err) {
    console.error('Error retrieving image:', err);
    res.status(500).json({ error: 'Failed to retrieve image' });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the image by ID
    const image = await ImageCollection.findById(id);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Find the apartment associated with the image
    const place = await PlaceCollection.findById(image.apartmentId);

    if (!place) {
      return res.status(404).json({ error: 'Apartment not found' });
    }

    // Authorization check - allow administrators and the user whose ID is in the apartment
    if (
      !req.user ||
      (req.user.role !== 'admin' && place.host !== req.user._id.toString())
    ) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    // Delete the image
    await ImageCollection.findByIdAndDelete(id);

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('Error deleting image:', err);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};
*/
import ImageCollection from '../models/imagesSchema.js';
import PlaceCollection from '../models/apartmentsSchema.js';

export const getAllImages = async (req, res) => {
  try {
    const { apartmentId } = req.query;

    // Find the apartment by ID
    const place = await PlaceCollection.findById(apartmentId);

    if (!place) {
      return res.status(404).json({ error: 'Apartment not found' });
    }

    // Get all images of the apartment
    const images = await ImageCollection.find({ apartmentId });

    res.status(200).json(images);
  } catch (err) {
    console.error('Error retrieving images:', err);
    res.status(500).json({ error: 'Failed to retrieve images' });
  }
};

export const getSingleImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the image by ID
    const image = await ImageCollection.findById(id);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.status(200).json(image);
  } catch (err) {
    console.error('Error retrieving image:', err);
    res.status(500).json({ error: 'Failed to retrieve image' });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the image by ID
    const image = await ImageCollection.findById(id);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Delete the image
    await ImageCollection.findByIdAndDelete(id);

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('Error deleting image:', err);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};

// Do we need modifiedImage controller?
/*
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
*/
