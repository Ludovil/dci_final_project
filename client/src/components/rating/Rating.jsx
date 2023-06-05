import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MyContext } from '../../context/context.js';
import Star from './Star';

const Rating = () => {
  const { user } = useContext(MyContext);
  const [hoverIndex, setHoverIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const location = useLocation();

  function shouldBeHighlighted(index) {
    return index <= hoverIndex || index <= rating;
  }

  const handleClearRating = () => {
    setRating(0);
    setComment('');
  };

  const handleStarClick = (index) => {
    const newRating = index + 1;
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
      .post('http://localhost:3000/reviews', JSON.stringify(review), {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {});
  };

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div style={{ border: '1px solid red', padding: '10px' }}>
      <h2>5 Star Rating</h2>
      <ul className='starList'>
        {[1, 2, 3, 4, 5].map((index) => (
          <li
            key={index}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(0)}
            onClick={() => handleStarClick(index)}
            className='starListItem'
          >
            <Star yellow={shouldBeHighlighted(index)} />
          </li>
        ))}
      </ul>

      <p>{formatCreatedAt(new Date().toISOString())}</p>
      <textarea
        placeholder='Comment'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ width: '300px', height: '100px' }}
      ></textarea>
      <br />
      <button onClick={handleSendRating}>Send Rating</button>
      <button onClick={handleClearRating}>Clear Rating</button>
    </div>
  );
};

export default Rating;
