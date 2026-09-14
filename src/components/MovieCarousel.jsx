import React, { useState } from "react";
import WaitingMovie from "./WaitingMovie.jsx"; // путь может быть "./WaitingMovie.jsx", если они в одной папке
import "../styles/Carousel.css";

// Картинки и списки отсюда убрали! 

export default function MovieCarousel({ language, timeLeft, items }) {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () =>
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className="carousel-wrapper">
      <button className="carousel-btn prev-btn" onClick={prevSlide}>
        &#10094;
      </button>

      <div
        className="carousel-cards-container"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {items.map((item, index) => {
          let position = "carousel-card hidden";
          if (index === activeIndex) position = "carousel-card active";
          else if (index === (activeIndex + 1) % items.length)
            position = "carousel-card next";
          else if (index === (activeIndex + 2) % items.length)
            position = "carousel-card next-next";

          return (
            <WaitingMovie
              key={item.id}
              movie={item}
              language={language}
              timeLeft={timeLeft}
              positionClass={position}
            />
          );
        })}
      </div>

      <button className="carousel-btn next-btn" onClick={nextSlide}>
        &#10095;
      </button>

      <div className="carousel-dots">
        {items.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}