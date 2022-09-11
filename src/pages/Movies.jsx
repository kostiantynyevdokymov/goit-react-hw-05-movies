import SearchBox from 'components/SearchBox/SearchBox';
import MovieGalleryList from 'components/MoviesList/MovieGalleryList';
import LoadMoreButton from 'components/LoadMoreButton/LoadMoreButton';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getSearchQuery } from 'servies/api';
import { useState, useEffect } from 'react';

const Movies = () => {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const query = searchParams.get('query');
  const location = useLocation();

  useEffect(() => {
    if (!query) {
      return;
    }
    if (searchQuery !== query) {
      setMovies([]);
    }
    getSearchQuery(page, query).then(data => {
      setMovies(prevState => [...prevState, ...data.results]);
      setTotal(data.total_page);
      setSearchQuery(query);
    });
  }, [query, page, searchQuery]);

  const updateQueryString = query => {
    setPage(1);
    setTotal(0);
    setSearchParams({ query: query.searchMovie });
  };
  const loadMoreBtn = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <SearchBox onSubmit={updateQueryString} />
      {movies.length > 0 && (
        <>
          <MovieGalleryList movies={movies} state={{ from: location }} />
          {total !== page && <LoadMoreButton onClick={loadMoreBtn} />}
        </>
      )}
    </>
  );
};

export default Movies;
