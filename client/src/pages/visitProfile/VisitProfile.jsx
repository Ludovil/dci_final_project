import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { MyContext } from "../../context/context.js";
import Rating from "../../components/rating/Rating.jsx";
import "./visitProfile.css";

// clicked images gallery features
import CloseIcon from "@mui/icons-material/Close";

function VisitProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(MyContext);
  const [instruments, setInstruments] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState([]);

  // clicked images gallery features
  const [model, setModel] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState("");
  const [description, setDescription] = useState("");

  const getImg = (imgSrc) => {
    setTempImgSrc(imgSrc);
    setModel(true);
  };
  //
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
      {/* <h1>{location?.state?.userName}</h1> */}
      <div className="summaryContainer">
        {/* <img src={location?.state?.profile_image} alt='Profile Image' /> */}

        {/* --------------------------------------------------------------- */}
        <div className="containerImageProfile">
          <div className="imageWrapper">
            <img
              className="profileImage"
              src={location?.state?.profile_image}
              alt="Profile Image"
            />
            <div className="userName">{location?.state?.userName}</div>
          </div>
        </div>
        {/* --------------------------------------------------------------- */}
        <div className="ratingValues">
          <p>
            Rating: <span>{formatAverageRating(averageRating)}</span>
          </p>
          <p>
            (<span>{reviewCount}</span>)
          </p>
        </div>
        {/* --------------------------------------------------------------- */}
        <button className="buttonNegative" onClick={createConversation}>
          Send Message
        </button>
      </div>

      <div className="personalInformationContainer">
        <h3>Description and Interests</h3>
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
              <label className="displayLabel" htmlFor="card">
                Show less
              </label>
            </div>
          </div>
          <label className="displayLabel" htmlFor="card">
            Read more...
          </label>
        </div>
        <h3>Gear & Sleeping facilities</h3>
        <div className="gallery galleryContainer ">
          {instruments.map((instrument) => (
            <div
              className="pics galleryItem"
              key={instrument._id}
              // clicked images gallery features
              onClick={() => {
                getImg(instrument.imageUrl);
                setDescription(instrument.description);
              }}
            >
              <img
                // key={instrument._id}
                src={instrument.imageUrl}
                alt="Cloudinary Image"
                className="galleryImage"
              />
            </div>
          ))}
        </div>
        {/* clicked images features */}
        <div className={model ? "model open" : "model"}>
          <img src={tempImgSrc} alt="" />
          <br />
          <p style={{ backgroundColor: "white" }}>{description}</p>
          <CloseIcon onClick={() => setModel(false)} />
        </div>
        {/* end of images features */}
      </div>
      <div className="reviewsSection">
        <h3>Reviews:</h3>
        <div className="reviewContainer">
          {location.state?.reviews.map((review) => {
            const isExpanded = isReviewExpanded(review._id);
            return (
              <div className="singleReview" key={review._id}>
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
