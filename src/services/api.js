const API_KEY = '9f7db0cf7e59b89025509f7c0f24d89e';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
  );
  const data = await response.json();
  return data; // Return full data to get total_pages
};

export const getMovieDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`,
  );
  const data = await response.json();
  return data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
  );
  const data = await response.json();
  return data;
};

export const getGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await response.json();
  return data.genres;
};

export const discoverMovies = async ({ genreId, year, page = 1 }) => {
  let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=popularity.desc`;
  if (genreId) url += `&with_genres=${genreId}`;
  if (year) url += `&primary_release_year=${year}`;
  
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
