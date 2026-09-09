import React, { useEffect, useRef } from "react";
import "../styles/ModalOverlay.css"
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
    <div className="modal-overlay"  >
      <div className="modal" ref={modalContentRef}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-content" >
          <h2>{t.review}</h2>
          <p>{language === "eng" ? movie.thoughts : movie.thoughtsRu}</p>

          <h2>{t.consTitle}</h2>
          <p>{language === "eng" ? movie.cons : movie.consRu}</p>

          <div className="my-rating">
            <div className="stars">
              {"★".repeat(Math.floor(movie.rating))}
              {movie.rating % 1 !== 0 && "½"}
              {"☆".repeat(10 - Math.ceil(movie.rating))}
            </div>
            <span className="rating-number">{movie.rating}/10</span>
          </div>

          <button className="modal-close-bottom" onClick={onClose}>
            <span>{t.close}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
