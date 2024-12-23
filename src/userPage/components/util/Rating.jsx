import PropTypes from "prop-types";

function Rating({ rating }) {
  // Ensure rating is a valid number and between 0 and 5
  const clampedRating = Math.min(Math.max(Number(rating) || 0, 0), 5);

  // Calculate the number of full, half, and empty stars
  const fullStars = Math.floor(clampedRating);
  const halfStar = clampedRating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  // Create the array of stars
  const stars = [
    ...Array(fullStars).fill("⭐"),
    ...Array(halfStar).fill("⭐️"),
    ...Array(emptyStars).fill("☆"),
  ];

  return (
    <div className="rating">
      {stars.map((star, index) => (
        <span key={index} className="star">
          {star}
        </span>
      ))}
    </div>
  );
}

// Define prop types and set default value for rating
Rating.propTypes = {
  rating: PropTypes.number,
};

Rating.defaultProps = {
  rating: 0,
};

export default Rating;
