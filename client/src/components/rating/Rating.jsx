// new
import axios from "axios";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { MyContext } from "../../context/context.js";
import Star from "./Star";
import "./rating.css";

const Rating = () => {
  const { user } = useContext(MyContext);
  const [hoverIndex, setHoverIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hideRating, setHideRating] = useState(false); // New state variable
  const location = useLocation();

  function shouldBeHighlighted(index) {
    return index <= hoverIndex || index <= rating;
  }

  const handleClearRating = () => {
    setRating(0);
    setComment("");
  };

  const handleStarClick = (index) => {
    const newRating = index;
    setRating(newRating);
  };

  const handleSendRating = () => {
    const review = {
      reviewerUser: user._id,
      reviewedUser: location.state._id,
      comment,
      rating,
    };

    axios
      .post("/reviews", JSON.stringify(review), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setHideRating(true); // Set hideRating to true after sending the rating
      });
  };

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  if (hideRating) {
    return null; // Render nothing if hideRating is true
  }

  return (
    <div>
      <ul className="starList">
        {[1, 2, 3, 4, 5].map((index) => (
          <li
            key={index}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(0)}
            onClick={() => handleStarClick(index)}
            className="starListItem"
          >
            <Star yellow={shouldBeHighlighted(index)} />
          </li>
        ))}
      </ul>
      <textarea
        placeholder="Comment your experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <br />
      <div className="prueba">
        <button className="buttonNegative" onClick={handleSendRating}>
          Send Rating
        </button>
        <button className="buttonNegative" onClick={handleClearRating}>
          Clear Rating
        </button>
      </div>
    </div>
  );
};

export default Rating;
