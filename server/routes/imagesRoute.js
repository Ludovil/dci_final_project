import express from 'express';
import { deleteImage } from '../controllers/imagesController.js';

const router = express.Router();

router.delete('/:id', deleteImage);

export default router;
