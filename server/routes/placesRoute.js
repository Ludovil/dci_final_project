import express from 'express';
import {
  deleteApartment,
  createApartment,
  modifiedApartment,
} from '../controllers/placesController.js';

const router = express.Router();

router.post('/', createApartment);
router.patch('/:id', modifiedApartment);
router.delete('/:id', deleteApartment);

export default router;

// WE SHOULD ADD HERE MIDDLEWARES TO CONTROL WHO IS ALLOWED TO CREATE, MODIFY AND DELETE APARTMENTS
