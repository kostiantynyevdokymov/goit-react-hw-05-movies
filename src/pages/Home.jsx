import HomeMovieList from 'components/MoviesList/HomeMoviesList';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  return (
    <>
      <HomeMovieList movies={movies} state={{ from: location }} />
    </>
  );
};

export default Home;
