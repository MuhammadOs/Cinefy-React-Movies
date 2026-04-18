import { NavLink } from 'react-router-dom';
import '../css/Navbar.css';
import { useTheme } from '../contexts/ThemeContext';

function NavBar() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/">Movie App</NavLink>
      </div>
      <div className="navbar-links">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/favorites" className="nav-link">
          Favorites
        </NavLink>
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
          <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
