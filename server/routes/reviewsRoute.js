import express from 'express';
import {
  createReview,
  readReview,
  readAllReviews,
  updateReview,
  deleteReview,
} from '../controllers/reviewsController.js';
import { authorized } from '../middlewares/authorized.js';

const router = express.Router();

router.get('/', readAllReviews);
// router.post('/:id', /*authorized,*/ createReview);
router.post('/', /*authorized,*/ createReview);
router.get('/:id', readReview);
router.patch('/:id', /*authorized,*/ updateReview);
router.delete('/:id', /*authorized,*/ deleteReview);

export default router;
