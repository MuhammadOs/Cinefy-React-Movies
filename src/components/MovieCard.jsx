import '../css/MovieCard.css';
import { useMovieContext } from '../contexts/MovieContext';

function MovieCard({ movie }) {
  const { isFavorites, addToFavorites, removeFromFavorites } =
    useMovieContext();

  const favorite = isFavorites(movie.id);

  function onFavotitesClick(e) {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id);
      console.log('removed');
    } else {
      addToFavorites(movie);
      console.log('Added');
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <i
            className={`fas fa-heart favorite-btn ${favorite ? 'active' : ''}`}
            onClick={onFavotitesClick}
          ></i>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split('-')[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;
