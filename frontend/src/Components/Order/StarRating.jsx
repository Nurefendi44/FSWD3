import React from 'react';
import { FaStar } from 'react-icons/fa';
const StarRating = ({ rating, onRatingChange }) => {
  return (
    <div className='flex'>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar key={star} className='text-2xl'   style={{ color: star <= rating ? '#006F2B' : 'gray', cursor: 'pointer' }} onClick={() => onRatingChange(star)} />
      
      ))}
    </div>
  );
};

export default StarRating;
