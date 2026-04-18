import '../css/Favorites.css';
import { useMovieContext } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length > 0) {
    return (
      <motion.div
        className="favorites"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Helmet>
          <title>My Favorites - Movie App</title>
        </Helmet>
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          <AnimatePresence>
            {favorites.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="favorites-empty"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Helmet>
        <title>Favorites - Movie App</title>
      </Helmet>
      <h2>No Favorite Movies Yet!</h2>
      <p>Start adding movies to your favorites and they will appear here</p>
    </motion.div>
  );
}

export default Favorites;
