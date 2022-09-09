import SearchBox from 'components/SearchBox/SearchBox';
import HomeMovieList from 'components/MoviesList/HomeMoviesList';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getSearchQuery } from 'servies/api';
import { useState } from 'react';
import { useEffect } from 'react';

const Movies = () => {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const query = searchParams.get('query');
  useEffect(() => {
    if (!query) {
      return;
    }
    if (searchQuery !== query) {
      setMovies([]);
    }
    getSearchQuery(page, query).then(data => {
      setMovies(prevState => [...prevState, ...data.result]);
      setTotal(data.total_page);
      setSearchQuery(query);
    });
  }, [query, page, searchQuery]);

  //   const visibleMovies = movies.filter(movie =>
  //     movie.name.toLowerCase().includes(movieName.toLowerCase())
  //   );
  const updateQueryString = name => {
    const nextParams = name !== '' ? { name } : {};
    setSearchParams(nextParams);
  };
  return (
    <>
      <SearchBox value={query} onChange={updateQueryString} />
      {movies.length > 0 && (
        <>
          <HomeMovieList movies={movies} state={{ from: location }} />
        </>
      )}
    </>
  );
};

export default Movies;
