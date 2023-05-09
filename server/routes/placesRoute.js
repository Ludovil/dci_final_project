import express from 'express';
import {
  deleteImage,
  createApartment,
  modifiedApartment,
} from '../controllers/placesController.js';

const router = express.Router();

router.post('/', createApartment);
router.patch('/:id', modifiedApartment);

export default router;
