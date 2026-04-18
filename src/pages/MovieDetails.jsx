import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import { useMovieContext } from '../contexts/MovieContext';
import MovieSkeleton from '../components/MovieSkeleton';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import '../css/MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    isFavorites,
    addToFavorites,
    removeFromFavorites,
    ratings,
    updateRating,
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
  } = useMovieContext();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError('Failed to load movie details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading)
    return (
      <div className="details-loading">
        <MovieSkeleton />
      </div>
    );
  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return null;

  const favorite = isFavorites(movie.id);
  const inWatchlist = isInWatchlist(movie.id);
  const userRating = ratings[movie.id] || 0;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id);
      toast.error('Removed from favorites');
    } else {
      addToFavorites(movie);
      toast.success('Added to favorites!');
    }
  };

  const handleWatchlistClick = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
      toast.error('Removed from watchlist');
    } else {
      addToWatchlist(movie);
      toast.success('Added to watchlist!');
    }
  };

  const handleRating = (rate) => {
    updateRating(movie.id, rate);
    toast.success(`Rated ${rate} stars!`);
  };

  const trailer = movie.videos?.results?.find((v) => v.type === 'Trailer');

  return (
    <motion.div
      className="movie-details-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>{movie.title} - Movie App</title>
        <meta name="description" content={movie.overview} />
      </Helmet>

      <div
        className="details-backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="backdrop-overlay"></div>
      </div>

      <div className="details-container">
        <motion.button
          className="back-btn"
          onClick={() => navigate(-1)}
          whileHover={{ x: -5 }}
        >
          <i className="fas fa-arrow-left"></i> Back
        </motion.button>

        <div className="details-content">
          <motion.div
            className="details-poster"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </motion.div>

          <motion.div
            className="details-info"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1>{movie.title}</h1>
            <div className="details-meta">
              <span>{movie.release_date?.split('-')[0]}</span>
              <span>•</span>
              <span>{movie.runtime} min</span>
              <span>•</span>
              <span className="details-rating">
                <i className="fas fa-star"></i> {movie.vote_average?.toFixed(1)}
              </span>
            </div>

            <div className="user-rating-section">
              <p>Your Rating:</p>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`${star <= userRating ? 'fas' : 'far'} fa-star star-icon`}
                    onClick={() => handleRating(star)}
                  ></i>
                ))}
              </div>
            </div>

            <div className="genres">
              {movie.genres?.map((genre) => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="details-actions">
              <button
                className={`details-fav-btn ${favorite ? 'active' : ''}`}
                onClick={handleFavoriteClick}
              >
                <i className={`fas fa-heart`}></i>{' '}
                {favorite ? 'In Favorites' : 'Add to Favorites'}
              </button>
              <button
                className={`watchlist-btn ${inWatchlist ? 'active' : ''}`}
                onClick={handleWatchlistClick}
              >
                <i
                  className={`fas ${inWatchlist ? 'fa-check' : 'fa-plus'}`}
                ></i>{' '}
                Watchlist
              </button>
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="trailer-btn"
                >
                  <i className="fas fa-play"></i> Trailer
                </a>
              )}
            </div>

            <div className="overview">
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>

            <div className="cast-section">
              <h3>Top Cast</h3>
              <div className="cast-grid">
                {movie.credits?.cast?.slice(0, 6).map((person, index) => (
                  <motion.div
                    key={person.id}
                    className="cast-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <img
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                          : 'https://via.placeholder.com/185x278?text=No+Image'
                      }
                      alt={person.name}
                    />
                    <p className="cast-name">{person.name}</p>
                    <p className="cast-character">{person.character}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default MovieDetails;
