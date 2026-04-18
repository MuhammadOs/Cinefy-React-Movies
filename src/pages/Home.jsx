import MovieCard from '../components/MovieCard';
import MovieSkeleton from '../components/MovieSkeleton';
import { useState, useEffect } from 'react';
import { getPopularMovies, searchMovies } from '../services/api';
import '../css/Home.css';
function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
      setIsSearching(false);
      setSearchQuery('');
    } catch (err) {
      console.log(err);
      setError('Error loading popular movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      loadPopularMovies();
      return;
    }
    if (loading) return;

    setLoading(true);

    try {
      const searchedMovies = await searchMovies(searchQuery);
      setMovies(searchedMovies);
      setIsSearching(true);
      setError(null);
    } catch (err) {
      console.log(err);
      setError('Failed to search movies...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      {isSearching && !loading && (
        <div className="search-header">
          <h2>Search Results for "{searchQuery}"</h2>
          <button onClick={loadPopularMovies} className="back-button">
            Back to Popular
          </button>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="movies-grid">
          {[...Array(8)].map((_, i) => (
            <MovieSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {movies.length === 0 && searchQuery && !loading && (
            <div className="no-results">
              <p>No movies found for "{searchQuery}"</p>
              <button onClick={loadPopularMovies} className="clear-button">
                Clear Search
              </button>
            </div>
          )}
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
