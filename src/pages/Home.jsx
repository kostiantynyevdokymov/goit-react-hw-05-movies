import HomeMovieList from 'components/MoviesList/HomeMoviesList';
import LoadMoreButton from 'components/LoadMoreButton/LoadMoreButton';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getTrendMovies } from '../servies/api';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const location = useLocation();

  const loadMoreBtn = () => {
    setPage(prevState => prevState + 1);
  };
  useEffect(() => {
    getTrendMovies(page).then(movies => {
      setMovies(prevState => [...prevState, ...movies.results]);
      setTotal(movies.total_page);
    });
  });
  return (
    <>
      <HomeMovieList movies={movies} state={{ from: location }} />
      {total !== page && <LoadMoreButton onClick={loadMoreBtn} />}
    </>
  );
};

export default Home;
