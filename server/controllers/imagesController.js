import ImageCollection from '../models/imagesSchema.js';

export const getAllImages = async (req, res) => {};

export const getSingleImage = async (req, res) => {};
// export const getPlaceImage = async (req, res, next) => {
//   try {
//     const { filename } = req.params;
//     const image = await ImageCollection.findOne({
//       filename,
//     });

//     const imageStream = stream.Readable.from(image.data);
//     imageStream.pipe(res);
//   } catch (err) {
//     es.json({ success: false, message: err.message });
//   }
// };

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the image by ID
    const image = await ImageCollection.findByIdAndDelete(id);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Authorization?

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('Error deleting image:', err);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};
