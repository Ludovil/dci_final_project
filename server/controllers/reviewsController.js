import ReviewCollection from '../models/reviewsSchema.js';
import UserCollection from '../models/usersSchema.js';

export const readReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await ReviewCollection.findById(id);
    if (!review) {
      return res.json({ success: false, message: 'Review does not exist' });
    }
    res.json({ success: true, data: review });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { reviewedUser, reviewerUser, comment, rating } = req.body;
    const { id } = req.params;

    const review = new ReviewCollection({
      reviewedUser,
      // reviewerUser: id,
      reviewerUser,
      comment,
      rating,
    });
    await review.save();

    const user = await UserCollection.findByIdAndUpdate(
      reviewedUser,
      { $push: { reviews: review._id } },
      { new: true }
    );

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    res.status(201).json({ success: true, data: review });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to create review' });
  }
};

export const readAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewCollection.find();
    res.json({ success: true, data: reviews });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, comment, rating } = req.body;

    const updatedReview = await ReviewCollection.findByIdAndUpdate(
      id,
      { title, comment, rating },
      { new: true }
    );

    if (!updatedReview) {
      return res.json({ success: false, message: 'Review does not exist' });
    }

    res.json({ success: true, data: updatedReview });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await ReviewCollection.findByIdAndRemove(id);

    if (!deletedReview) {
      return res.json({ success: false, message: 'Review does not exist' });
    }

    const user = await UserCollection.findByIdAndUpdate(
      deletedReview.reviewedUser,
      { $pull: { reviews: id } },
      { new: true }
    );

    console.log(user.email);
    res.json({ success: true, data: deletedReview });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

/*
export const allReviewByUser = async (req, res) => {
  try {
    const { id } = req.params;

    const reviews = await ReviewCollection.find({ reviewedUser: id });

    if (reviews.length === 0) {
      return res.json({
        success: false,
        message: 'No reviews found for the user',
      });
    }

    res.json({ success: true, data: reviews });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
*/
