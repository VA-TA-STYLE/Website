export default function StarRating({ rating }) {
    const fiveStarRating = rating / 2;
  const fullStars = Math.floor(fiveStarRating);
  const hasHalfStar = fiveStarRating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(fiveStarRating);

  return (
    <div className="my-rating">
      <div className="stars" style={{ color: '#f39c12',  fontSize: "2rem"}}>
     {"★".repeat(fullStars)}
        {hasHalfStar && "½"}
        {"☆".repeat(emptyStars)}
      </div>
      <span className="rating-number">{}</span>
    </div>
  );
}