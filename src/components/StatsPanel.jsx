import React from "react";
import "../styles/StatsPanel.css"
import { movies } from "../assets/data/movies"; 
import { series } from "../assets/data/series"; 

const translations = {
  eng: {
    movies: "Movies",
    rating: "Average Rating",
    series: "TV Series",
    quote1: "We're all stories in the end.",
    quote2: "Just make it a good one.",
  },
  rus: {
    movies: "Фильмы",
    rating: "Средняя оценка",
    series: "Сериалы",
    quote1: "В конце концов, мы все лишь истории.",
    quote2: "Так сделай свою хорошей.",
  },
};
export default function StatsPanel({ language }) {
  const t = translations[language] || translations.eng;
  const averageRating =
    movies.length > 0
      ? movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length
      : 0;

  return (
    <div className="hero-right">
      <div className="stats-panel">
        <div className="stat">
          <div className="icon movie-icon"></div>
          <div className="stat-text">
            <span className="stat-number">{movies.length}</span>
            <span className="stat-label">{t.movies}</span>
          </div>
        </div>

        <div className="stat">
          <div className="icon rating-icon"></div>
          <div className="stat-text">
            <span className="stat-number">{averageRating.toFixed(2)}</span>
            <span className="stat-label">{t.rating}</span>
          </div>
        </div>

        <div className="stat">
          <div className="icon series-icon"></div>
          <div className="stat-text">
            <span className="stat-number">{series.length}</span>
            <span className="stat-label">{t.series}</span>
          </div>
        </div>

        <div className="stat">
          <div className="icon quote-icon"></div>
          <div className="stat-text">
            <p className="quote-text">
              {t.quote1} <br /> {t.quote2}
            </p>
            <div className="quote-divider"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
