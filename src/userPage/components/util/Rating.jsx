function Rating({ rating }) {
  // Ensure rating is between 0 and 5
  const clampedRating = Math.min(Math.max(rating, 0), 5);

  // Generate an array of stars based on the rating
  const fullStars = Math.floor(clampedRating);
  const halfStar = clampedRating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

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

export default Rating;
