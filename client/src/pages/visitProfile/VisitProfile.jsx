import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { MyContext } from "../../context/context.js";
import Rating from "../../components/rating/Rating.jsx";
import "./visitProfile.css";

function VisitProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(MyContext);
  const [instruments, setInstruments] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instrumentPromise = axios.get(
          `http://localhost:3000/instruments/${location.state._id}`
        );
        const reviewPromise = axios.get(
          `http://localhost:3000/users/${location.state._id}`
        );
        const averageRatingPromise = axios.get(
          `http://localhost:3000/users/${location.state._id}/averagerating`
        );

        const [instrumentResponse, reviewResponse, averageRatingResponse] =
          await Promise.all([
            instrumentPromise,
            reviewPromise,
            averageRatingPromise,
          ]);

        setInstruments(instrumentResponse.data);

        const { data: reviewData } = reviewResponse;
        const reviewCount = reviewData.data.reviews.length;
        setReviewCount(reviewCount);

        const { data: averageRatingData } = averageRatingResponse;
        const averageRating = averageRatingData.data.averageRating;
        setAverageRating(averageRating);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [location.state._id]);

  const createConversation = async () => {
    try {
      const res = await axios.post("http://localhost:3000/conversations", {
        guest: user._id,
        host: location?.state?._id,
      });
      navigate("/messenger/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const formatAverageRating = (rating) => {
    return rating.toFixed(1);
  };

  const toggleReviewComment = (reviewId) => {
    setExpandedReviews((prevExpandedReviews) => {
      if (prevExpandedReviews.includes(reviewId)) {
        return prevExpandedReviews.filter((id) => id !== reviewId);
      } else {
        return [...prevExpandedReviews, reviewId];
      }
    });
  };

  const isReviewExpanded = (reviewId) => {
    return expandedReviews.includes(reviewId);
  };

  const getButtonLabel = (reviewId) => {
    return isReviewExpanded(reviewId) ? "Read less" : "Read more...";
  };

  console.log("visit profile:", location?.state);
  console.log("id: ", location.state._id);

  return (
    <div className="visitProfileContainer">
      <div>
        <h1>{location?.state?.userName}</h1>
        {/* <h2>{location?.state?.email}</h2> */}
        <div className="summaryContainer">
          <div className="ratingValues">
            {/* <h2>Reviews:</h2> */}
            <p>
              Rating: <span>{formatAverageRating(averageRating)}</span>
            </p>
            <p>
              (<span>{reviewCount}</span>)
            </p>
          </div>
          <img src={location?.state?.profile_image} alt="Profile Image" />
          <button className="buttonNegative" onClick={createConversation}>
            Send Message
          </button>
        </div>
      </div>
      <div className="personalInformationContainer">
        {/* <h2>
          About <span>{location?.state?.userName}:</span>
        </h2> */}
        <h3>Description and Interest:</h3>
        <div className="card">
          <input id="card" type="checkbox" />
          <ul className="interestList">
            {location?.state?.music_interests.map((genre) => {
              return <li>{genre}</li>;
            })}
          </ul>
          <div className="content">
            <div className="display">
              <p>{location?.state?.profile_description}</p>
              <p>
                Here you can find my complete address:{" "}
                {location?.state?.formatted_address}
              </p>
              {/* <p>{location?.state?.email}</p> */}
              <label className="displayLabel" htmlFor="card">
                Show less
              </label>
            </div>
          </div>
          <label className="displayLabel" htmlFor="card">
            Read more...
          </label>
        </div>
        <h3>Instruments:</h3>
        <div className="galleryContainer">
          {instruments.map((instrument) => (
            <div className="galleryItem">
              <img
                key={instrument._id}
                src={instrument.imageUrl}
                alt="Cloudinary Image"
                className="galleryImage"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="reviewsSection">
        <h3>Reviews:</h3>
        <div className="reviewContainer">
          {location.state?.reviews.map((review) => {
            const isExpanded = isReviewExpanded(review._id);
            return (
              <div className="singleReview">
                <div className="reviewSummary">
                  <div className="reviewTitle">
                    <img
                      src={review.reviewerUser?.profile_image}
                      alt="profile_image"
                      style={{
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                    />
                    <p>{review.reviewerUser?.userName}</p>
                  </div>
                  <div className="reviewRate">
                    <p>Stars:</p>
                    <p> {review.rating}</p>
                  </div>
                </div>
                <p> {formatDate(review.createdAt)}</p>
                {isExpanded && <p>{review.comment}</p>}
                <button
                  className="buttonNegative"
                  onClick={() => toggleReviewComment(review._id)}
                >
                  {getButtonLabel(review._id)}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="ratingSystem">
        <Rating />
      </div>
    </div>
  );
}

export default VisitProfile;
