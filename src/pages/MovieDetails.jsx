import { useEffect, useState } from 'react';
import { Link, useLocation, useParams, Outlet } from 'react-router-dom';
import { getMovieInfo } from 'servies/api';
import { MovieDetailsStyled } from 'components/MovieDetails/MovieDetails.styled';
import { MagnifyingGlass } from 'react-loader-spinner';
import { BiArrowBack } from 'react-icons/bi';

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const { movieId } = useParams();

  const { title, poster_path, popularity, release_date, overview, genres } =
    movie;
  const imageURL = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const location = useLocation();
  const backLink = location.state?.from ?? '/';
  const relYear = new Date(release_date).getFullYear();

  useEffect(() => {
    getMovieInfo(movieId).then(result => {
      setMovie(result.data);
      setIsLoad(true);
    });
  }, [movieId]);

  return (
    <div>
      {isLoad ? (
        <>
          <Link to={backLink}>
            <BiArrowBack size="10" />
            Back
          </Link>
          <MovieDetailsStyled>
            <img src={imageURL} width="300" alt={title} />
            <div>
              <h2>
                {title} ({relYear})
              </h2>
              <h4>User score: {Math.round(popularity)}</h4>
              <h3>Overview</h3>
              <p>{overview}</p>
              <h3>Genres</h3>
              {genres.map(genre => {
                return <p key={genre.id}>{genre.name}</p>;
              })}
              <hr />
              <h2>Additional information</h2>
              <ul>
                <li>
                  <Link to="cast" state={{ from: backLink }}>
                    Cast
                  </Link>
                </li>
                <li>
                  <Link to="review" state={{ from: backLink }}>
                    Review
                  </Link>
                </li>
              </ul>
              <hr />
            </div>
          </MovieDetailsStyled>
        </>
      ) : (
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      )}
      <Outlet />
    </div>
  );
};

export default MovieDetails;
