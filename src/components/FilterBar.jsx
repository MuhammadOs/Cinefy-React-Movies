import { useState, useEffect } from 'react';
import { getGenres } from '../services/api';
import '../css/FilterBar.css';

function FilterBar({ onFilterChange }) {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (err) {
        console.error("Failed to fetch genres", err);
      }
    };
    fetchGenres();
  }, []);

  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    setSelectedGenre(genreId);
    onFilterChange({ genreId, year: selectedYear });
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    onFilterChange({ genreId: selectedGenre, year });
  };

  const handleReset = () => {
    setSelectedGenre('');
    setSelectedYear('');
    onFilterChange({ genreId: '', year: '' });
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="genre-select">Genre</label>
        <select id="genre-select" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="year-select">Year</label>
        <select id="year-select" value={selectedYear} onChange={handleYearChange}>
          <option value="">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <button className="reset-filter-btn" onClick={handleReset} title="Reset Filters">
        <i className="fas fa-undo"></i>
      </button>
    </div>
  );
}

export default FilterBar;
