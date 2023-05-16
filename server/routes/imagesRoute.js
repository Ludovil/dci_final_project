import express from 'express';
import { authorized } from '../middlewares/authorized.js';
import { isAdministrator } from '../middlewares/isAdmin.js';

import {
	getAllImages,
	getSingleImage,
	deleteImage,
} from '../controllers/imagesController.js';

const router = express.Router();

// Route for getting all images of an apartment
router.get('/', authorized, getAllImages);

// Route for getting a single image
router.get('/:id', authorized, getSingleImage);

// Route for deleting an image
router.delete('/:id', authorized, isAdministrator, deleteImage);

export default router;
