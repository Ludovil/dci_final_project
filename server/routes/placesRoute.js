import express from 'express';
import { getAllImages } from '../controllers/imagesController.js';
import {
  deleteApartment,
  createApartment,
  modifiedApartment,
} from '../controllers/placesController.js';
import { authorized } from '../middlewares/authorized.js';

const router = express.Router();

// Route for creating a place/instrument
router.post('/', authorized, createApartment);

// Route for modifying a place/instrument
router.patch('/:id', authorized, modifiedApartment);

// Route for deleting a place/instrument
router.delete('/:id', authorized, deleteApartment);

// Route for retrieving all images of a specific apartment/instrument
router.get('/:apartmentId/images', getAllImages);

export default router;

// WE SHOULD ADD HERE MIDDLEWARES TO CONTROL WHO IS ALLOWED TO CREATE, MODIFY AND DELETE APARTMENTS
