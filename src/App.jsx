import './css/App.css';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Favorites from './pages/Favorites';
import MovieDetails from './pages/MovieDetails';
import About from './pages/About';
import NavBar from './components/NavBar';
import { MovieProvider } from './contexts/MovieContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider>
          <MovieProvider>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: 'var(--card-bg)',
                  color: 'var(--text-color)',
                  border: '1px solid var(--primary-color)',
                },
              }}
            />
            <NavBar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/favorites" element={<Favorites />}></Route>
                <Route path="/movie/:id" element={<MovieDetails />}></Route>
                <Route path="/about" element={<About />}></Route>
              </Routes>
            </main>
          </MovieProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
