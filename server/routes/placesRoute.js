import express from 'express';
import { deleteImage, uploadImage } from '../controllers/placesController.js';

const router = express.Router();

router.post('/', uploadImage);
// router.delete('/places/:id/images/:imageId', deleteImage);

export default router;
