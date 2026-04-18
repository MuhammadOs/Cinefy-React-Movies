import '../css/MovieSkeleton.css';

function MovieSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-poster"></div>
      <div className="skeleton-info">
        <div className="skeleton-title"></div>
        <div className="skeleton-date"></div>
      </div>
    </div>
  );
}

export default MovieSkeleton;
