import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import { movies } from "../assets/data/movies";
import { series } from "../assets/data/series";
import "../styles/MarqueeTrack.css";
export default function MarqueeTrack({ language }) {
  const allEntries = useMemo(() => {
    const combined = [
      ...movies.map((movie) => ({ ...movie, type: "MOVIE", typeRu: "ФИЛЬМ" })),
      ...series.map((show) => ({ ...show, type: "SERIES", typeRu: "СЕРИАЛ" })),
    ];
    return combined.sort(() => Math.random() - 0.5);
  }, []);

  return (
    <section className="main-movie-cards-wrapper">
      <div className="main-movie-cards-track">
        {[...allEntries, ...allEntries].map((item, index) => (
          <Link
            to={item.type === "MOVIE" ? `/movies` : `/TVSeries`}
            state={{ openModalId: item.id }}
            className="entry-card"
            key={index}
          >
            <img src={item.image} alt={item.title} className="card-bg-image" />
            <div className="card-gradient-overlay"></div>
            <div className="card-content">
              <span className="card-badge">
                {language === "eng" ? item.type : item.typeRu}
              </span>
              <h3 className="card-title">
                {language === "eng" ? item.title : item.titleRu}
              </h3>
              <div className="card-rating-wrapper">
                <StarRating rating={item.rating} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
