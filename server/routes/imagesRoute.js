import express from 'express';
import {
  getPlaceImage,
  updatePlaceImage,
} from '../controllers/place_imagesController.js';

const router = express.Router();

router.get('/:filename', getPlaceImage);
router.patch('/:id', updatePlaceImage);
// router.delete('/:id', deleteImage);

export default router;
