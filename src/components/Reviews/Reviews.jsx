import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from 'servies/api';
const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getMovieReviews(movieId).then(result => setReviews(result));
  }, [movieId]);

  return (
    <>
      {' '}
      {reviews.length > 0 ? (
        <>
          <h2>Reviews</h2>
          <ul>
            {reviews.map(review => {
              const { autor, id, content } = review;
              return (
                <li key={id}>
                  <p>
                    <b>{autor}</b>
                  </p>
                  <p>{content}</p>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p>No reviews...</p>
      )}
    </>
  );
};

export default Reviews;
