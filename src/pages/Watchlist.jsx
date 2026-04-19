import '../css/Watchlist.css';
import { useMovieContext } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

function Watchlist() {
  const { watchlist } = useMovieContext();

  if (watchlist.length > 0) {
    return (
      <motion.div
        className="watchlist-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Helmet>
          <title>My Watchlist - CENIFY</title>
        </Helmet>
        <div className="page-header">
          <h2>My Watchlist</h2>
          <p>Movies you want to watch later</p>
        </div>
        <div className="movies-grid">
          <AnimatePresence mode="popLayout">
            {watchlist.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="watchlist-empty"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Helmet>
        <title>Watchlist - CENIFY</title>
      </Helmet>
      <div className="empty-content">
        <i className="fas fa-bookmark empty-icon"></i>
        <h2>Your Watchlist is Empty</h2>
        <p>Explore movies and click the plus icon to save them for later!</p>
      </div>
    </motion.div>
  );
}

export default Watchlist;
