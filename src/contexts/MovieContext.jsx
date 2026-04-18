import { createContext, useState, useContext, useEffect } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [ratings, setRatings] = useState({}); // { movieId: rating }

  useEffect(() => {
    const storedFavs = localStorage.getItem('favorites');
    const storedWatchlist = localStorage.getItem('watchlist');
    const storedRatings = localStorage.getItem('ratings');
    
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
    if (storedWatchlist) setWatchlist(JSON.parse(storedWatchlist));
    if (storedRatings) setRatings(JSON.parse(storedRatings));
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('ratings', JSON.stringify(ratings));
  }, [ratings]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorites = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const addToWatchlist = (movie) => {
    setWatchlist((prev) => [...prev, movie]);
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some((movie) => movie.id === movieId);
  };

  const updateRating = (movieId, rating) => {
    setRatings((prev) => ({ ...prev, [movieId]: rating }));
  };

  const value = {
    favorites,
    watchlist,
    ratings,
    addToFavorites,
    removeFromFavorites,
    isFavorites,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    updateRating,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
