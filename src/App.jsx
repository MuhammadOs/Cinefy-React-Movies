import './css/App.css';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Favorites from './pages/Favorites';
import NavBar from './components/NavBar';
import { MovieProvider } from './contexts/MovieContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <MovieProvider>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/favorites" element={<Favorites />}></Route>
          </Routes>
        </main>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;
