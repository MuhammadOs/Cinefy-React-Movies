import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import '../css/About.css';

function About() {
  return (
    <motion.div 
      className="about-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>About - CENIFY</title>
        <meta name="description" content="About the developer of CENIFY - Muhammad Osama ElShamikh" />
      </Helmet>

      <div className="about-header">
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Behind the Project
        </motion.h1>
        <p>Crafting professional cinema experiences for the web.</p>
      </div>

      <div className="about-content">
        <motion.div 
          className="developer-card"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="dev-avatar">
            <i className="fas fa-user-tie"></i>
          </div>
          <div className="dev-info">
            <h2>Muhammad Osama ElShamikh</h2>
            <span className="dev-title">Software Engineer & Web Developer</span>
            <a href="mailto:muhammad2372002@gmail.com" className="dev-email">
              <i className="fas fa-envelope"></i> muhammad2372002@gmail.com
            </a>
            <div className="dev-socials">
              <a href="https://github.com/MuhammadOs" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/muhammad-osama-elshamikh" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="about-text"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3>About CENIFY</h3>
          <p>
            CENIFY is a high-performance movie discovery platform built with modern web technologies. 
            It leverages the TMDB API to provide real-time data, infinite scrolling, and a personalized 
            watchlist experience. The project focuses on superior UI/UX, responsiveness, and speed.
          </p>
          <div className="tech-stack">
            <span className="tech-badge">ReactJS</span>
            <span className="tech-badge">TanStack Query</span>
            <span className="tech-badge">Framer Motion</span>
            <span className="tech-badge">TMDB API</span>
            <span className="tech-badge">Responsive Design</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default About;
