import React, { useEffect, useRef } from "react";
import "../styles/ModalOverlay.css";
export default function ModalOverlay({ movie, language, t, onClose }) {
  const modalContentRef = useRef(null);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    const handleClickOutside = (e) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(e.target)
      ) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal" ref={modalContentRef}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-content">
          <div className="modal-header">
            <img src={movie.image} alt="" className="review-poster" />
            <div>
              <h2>{t.review}</h2>
              <div className="my-rating">
                <div className="stars">
                  {"★".repeat(Math.floor(movie.rating))}
                  {movie.rating % 1 !== 0 && "½"}
                  {"☆".repeat(10 - Math.ceil(movie.rating))}
                </div>
                <span className="rating-number">{movie.rating}/10</span>
              </div>
            </div>
          </div>
          <div className="review-text">
            <p className="movie-thoughts">
              {movie.thoughts}
            </p>

            <p className="movie-cons">
              <strong>{language === "eng" ? "Cons: " : "Минусы: "}</strong>
              {movie.cons}
            </p>
          </div>
          <button className="modal-close-bottom" onClick={onClose}>
            <span>{t.close}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
