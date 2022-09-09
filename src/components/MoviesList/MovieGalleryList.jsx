import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MovieGalleryList = ({ movies, state }) => {
  return (
    <ul>
      {movies.map(movie => {
        const { title, id } = movie;
        return (
          <li key={id}>
            <Link to={`${id}`} state={state}>
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieGalleryList;

MovieGalleryList.propType = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};
