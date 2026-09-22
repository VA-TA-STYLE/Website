import { useState, useRef, useEffect } from "react";
import "../styles/MovieCard.css";
export default function MovieCard({
  movie,
  language,
  t,
  onOpenModal,
  carouselIndex,
  carouselTotal,
  index,
}) {
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef(null);

  //  SCROLL FOR TABLETS, PHONES //
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.6,
      },
    );
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    ч;
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <article ref={cardRef} className={`movie-card ${isActive ? "active" : ""}`}>
      <img
        src={movie.image}
        alt={movie.title}
        loading={index < (isMobile ? 3 : 6) ? "eager" : "lazy"}
        fetchPriority={index === 0 ? "high" : "auto"}
        className="movie-card-image"
      />
      <span className="movie-card-counter">
        {carouselIndex} / {carouselTotal}
      </span>
      <div className="movie-card-content">
        <h2>{language === "eng" ? movie.title : movie.titleRu}</h2>
        <p>{language === "eng" ? movie.description : movie.descriptionRu}</p>

        <button onClick={() => onOpenModal(movie)}>{t.myThoughts}</button>

        <div className="movie-meta">
          <span>{movie.year}</span>
          <span>{language === "eng" ? movie.genre : movie.genreRu}</span>
          <span>⭐ {movie.imdb} IMDb</span>
          <span>{language === "eng" ? movie.duration : movie.durationRu}</span>
        </div>
      </div>
    </article>
  );
}
