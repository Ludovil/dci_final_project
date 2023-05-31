import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
  reviewerUser: {
    type: String,
    required: true,
  },
  reviewedUser: {
    type: String,
    required: true,
  },
  // title: {
  //   type: String,
  //   required: true,
  // },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ReviewCollection = model('reviews', reviewSchema);

export default ReviewCollection;
