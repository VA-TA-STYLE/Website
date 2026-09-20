import React from "react";
import "../styles/MovieCardPhones.css";
import { useState, useRef, useEffect } from "react";

// ДОБАВЛЕНЫ ФИГУРНЫЕ СКОБКИ { }
export default function MovieCardPhones({
  movie,
  serie,
  language,
  t,
  onOpenModal,
  carouselIndex,
  carouselTotal,
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
  return (
    <div
      ref={cardRef}
      className={`movie-card-mobile ${isActive ? "active" : ""}`}
    >
      <div className="movie-poster-mobile">
        <img
          src={movie.image}
          alt={language === "eng" ? movie.title : movie.titleRu}
        />
        <div className="movie-gradient-mobile"></div>
        <div>
          <span className="movie-card-counter">
            {carouselIndex} / {carouselTotal}
          </span>
        </div>
        <div className="movie-rating-mobile">
          <span>★</span>
          {movie.rating}
        </div>
        <div className="movie-info-mobile">
          <h2>{language === "eng" ? movie.title : movie.titleRu}</h2>

          <div className="movie-meta-mobile">
            <span>{movie.year}</span>
            <span>•</span>
            <span>
              {language === "eng" ? movie.duration : movie.durationRu}
            </span>
          </div>
          <p>{language === "eng" ? movie.description : movie.descriptionRu}</p>
          <div className="movie-actions-mobile">
            <button
              className="details-btn"
              onClick={() => onOpenModal && onOpenModal(movie)}
            >
              <span>{t.myThoughts}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
