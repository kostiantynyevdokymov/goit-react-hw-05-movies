import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HomeMovieList = ({ movies, state }) => {
  return (
    <ul>
      {movies.map(movie => {
        const { title, id } = movie;
        return (
          <li key={id}>
            <Link to={`movies/${id}`} state={state}>
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default HomeMovieList;

HomeMovieList.propType = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};
