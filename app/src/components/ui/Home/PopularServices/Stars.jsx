import PropTypes from "prop-types";

const Star = ({ filled, half }) => (
  <svg width="14" height="14" viewBox="0 0 24 24">
    {half ? (
      <>
        <defs>
          <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="#F9D853" />
            <stop offset="50%" stopColor="#D3D3D3" />
          </linearGradient>
        </defs>
        <path
          fill="url(#half-gradient)"
          d="M12 0l3.672 7.438 8.328 1.21-6.031 5.867L19.58 23.006 12 18.938l-7.58 4.068L6.031 14.515 0 8.648l8.328-1.21L12 0z"
        />
      </>
    ) : (
      <path
        fill={filled ? "#F9D853" : "#D3D3D3"}
        d="M12 0l3.672 7.438 8.328 1.21-6.031 5.867L19.58 23.006 12 18.938l-7.58 4.068L6.031 14.515 0 8.648l8.328-1.21L12 0z"
      />
    )}
  </svg>
);

const StarRating = ({ rating, maxRating = 5 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {Array.from({ length: maxRating }, (_, index) => (
        <Star
          key={index}
          filled={index < fullStars}
          half={hasHalfStar && index === fullStars}
        />
      ))}
    </div>
  );
};

Star.propTypes = {
  filled: PropTypes.bool.isRequired,
  half: PropTypes.bool.isRequired,
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  maxRating: PropTypes.number,
};

export { Star, StarRating };
