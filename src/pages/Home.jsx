import MovieCard from '../components/MovieCard';
import MovieSkeleton from '../components/MovieSkeleton';
import FilterBar from '../components/FilterBar';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { getPopularMovies, searchMovies, discoverMovies } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useDebounce } from '../hooks/useDebounce';
import '../css/Home.css';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ genreId: '', year: '' });
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { ref, inView } = useInView();

  const fetchMovies = async ({ pageParam = 1 }) => {
    if (debouncedSearchQuery) {
      return searchMovies(debouncedSearchQuery, pageParam);
    }
    if (filters.genreId || filters.year) {
      return discoverMovies({ ...filters, page: pageParam });
    }
    return getPopularMovies(pageParam);
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['movies', debouncedSearchQuery, filters],
    queryFn: fetchMovies,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    setIsSearching(!!debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const loadPopularMovies = () => {
    setSearchQuery('');
    setFilters({ genreId: '', year: '' });
    setIsSearching(false);
  };

  const movies = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) || [];
  }, [data]);

  return (
    <motion.div 
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>Home - Movie App</title>
        <meta name="description" content="Browse popular movies and search for your favorites." />
      </Helmet>
      
      <div className="search-section">
        <div className="search-form">
          <input
            type="text"
            placeholder="Type to search movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fas fa-search search-icon"></i>
        </div>
      </div>

      {!isSearching && <FilterBar onFilterChange={handleFilterChange} />}

      {isSearching && status !== 'loading' && (
        <div className="search-header">
          <h2>Results for "{debouncedSearchQuery}"</h2>
          <button onClick={loadPopularMovies} className="back-button">
            Clear Search
          </button>
        </div>
      )}

      {status === 'error' && <div className="error-message">Error: {error.message}</div>}

      {status === 'loading' ? (
        <div className="movies-grid">
          {[...Array(8)].map((_, i) => (
            <MovieSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {movies.length === 0 && !isFetchingNextPage && (
            <div className="no-results">
              <p>No movies found matching your criteria.</p>
              <button onClick={loadPopularMovies} className="clear-button">
                Show Popular Movies
              </button>
            </div>
          )}
          
          <div className="movies-grid">
            <AnimatePresence mode="popLayout">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={`${movie.id}-${movie.release_date || 'no-date'}`} />
              ))}
            </AnimatePresence>
          </div>

          <div ref={ref} className="loading-trigger">
            {isFetchingNextPage && (
              <div className="movies-grid">
                {[...Array(4)].map((_, i) => (
                  <MovieSkeleton key={`next-${i}`} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}

export default Home;
