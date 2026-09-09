import React from "react";
import "../styles/MoviesFilter.css";
export default function MoviesFilter({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  setCurrentPage,
  language,
  t,
  moviesTopRef 
}) {
  return (
    <div className="movies-sort" ref={moviesTopRef}>
      <div className="movies-search">
        <input
          type="text"
          placeholder={
            language === "eng" ? "Search movies..." : "Поиск фильмов..."
          }
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
        <svg
          className="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      
      <div className="sort-mobiles">
        <label htmlFor="sort">{t.sort}</label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="default">{t.default}</option>
          <option value="high">{t.high}</option>
          <option value="low">{t.low}</option>
          <option value="duration">{t.duration}</option>
          <option value="imdb">{t.imdb}</option>
        </select>
      </div>
    </div>
  );
}