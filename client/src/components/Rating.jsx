import { useState } from 'react';
import { Star } from './Star.jsx';

const Rating = () => {
  const [hoverIndex, setHoverIndex] = useState(0);
  const [rating, setRating] = useState(0);

  function shouldBeHighlighted(index) {
    return index <= hoverIndex || index <= rating;
  }

  return (
    <>
      <div>
        <h2>5 Star Rating</h2>
        <ul className='starList'>
          {[1, 2, 3, 4, 5].map((index) => {
            return (
              <li
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(0)}
                onClick={() => setRating(index)}
                className='starListItem'
              >
                <Star yellow={shouldBeHighlighted(index)} />
              </li>
            );
          })}
        </ul>

        <button onClick={() => setRating(0)}>Clear Rating</button>
      </div>
    </>
  );
};
export default Rating;
