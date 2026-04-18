import '../css/MovieCard.css';
import { useMovieContext } from '../contexts/MovieContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { memo } from 'react';

const MovieCard = memo(({ movie }) => {
  const { isFavorites, addToFavorites, removeFromFavorites, ratings } =
    useMovieContext();

  const favorite = isFavorites(movie.id);
  const userRating = ratings[movie.id];

  const onFavotitesClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent Link navigation
    if (favorite) {
      removeFromFavorites(movie.id);
      toast.error(`${movie.title} removed from favorites`);
    } else {
      addToFavorites(movie);
      toast.success(`${movie.title} added to favorites!`);
    }
  };

  return (
    <motion.div
      className="movie-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <Link to={`/movie/${movie.id}`} className="movie-link">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} // Using smaller image for better performance
            alt={movie.title}
            loading="lazy" // Native lazy loading
          />
          <div className="movie-overlay">
            <button
              className={`favorite-btn ${favorite ? 'active' : ''}`}
              onClick={onFavotitesClick}
              type="button"
            >
              <i className="fas fa-heart"></i>
            </button>
          </div>
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.split('-')[0]}</p>
          {userRating && (
            <div className="user-rating-badge">
              <i className="fas fa-star"></i> {userRating}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;
