import React, { useEffect, useState, useRef, useMemo } from "react";
import { movies } from "../assets/data/movies";
import { SortAll } from "../components/Sort.jsx";
import MovieCard from "../components/MovieCard.jsx";
import ModalOverlay from "../components/ModalOverlay.jsx";
import useModalFromLocation from "../components/hooks/useModalFromLocation";
import MoviesFilter from "../components/MoviesFilter.jsx";
import useIsMobile from "../components/hooks/useIsMobile.jsx";
import "../styles/Movies.css";
const translations = {
  eng: {
    label: "MY MOVIE JOURNAL",
    title: "Movies I watched",
    title2: "and actually remember.",
    description:
      "Films I've watched, loved, hated and everything in between. A small collection of movies that made me think, feel, or simply enjoy a good evening.",
    sort: "Sort:",
    emptyTitle: "Oops, nothing found",
    emptyText: "Try changing your search parameters or filters.",
    default: "Default",
    high: "Highest Rated",
    low: "Lowest Rated",
    duration: "Duration",
    imdb: "IMDb",
    myThoughts: "My Thoughts",
    consTitle: "Cons:",
    review: "Review",
    close: "Close",
  },

  rus: {
    label: "МОЙ КИНОЖУРНАЛ",
    title: "Фильмы, которые я посмотрел ",
    title2: "и  запомнил.",
    description:
      "Фильмы, которые я смотрел, любил, ненавидел и всё, что между этим. Небольшая коллекция фильмов, которые заставили меня задуматься, что-то почувствовать или просто хорошо провести вечер.",
    sort: "Сортировать:",
    emptyTitle: "Упс, ничего не найдено",
    emptyText: "Попробуйте изменить параметры поиска или фильтры.",
    default: "По умолчанию",
    high: "Сначала лучшие",
    low: "Сначала худшие",
    duration: "По продолжительности",
    imdb: "IMDb",
    myThoughts: "Мои мысли",
    consTitle: "Минусы:",
    review: "Рецензия",
    close: "Закрыть",
  },
};
export default function Movies({ language }) {
  const t = translations[language] || translations.eng;
  const [selectedMovie, setSelectedMovie] = useState(null);
  useModalFromLocation(movies, setSelectedMovie);

  // SEARCH BAR //
  const [searchQuery, setSearchQuery] = useState("");
  const filteredMovies = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return movies.filter((movie) => {
      const titleEng = movie.title.toLowerCase();
      const titleRu = (movie.titleRu || "").toLowerCase();
      return titleEng.includes(query) || titleRu.includes(query);
    });
  }, [searchQuery]);

  // SORT RATING //
  const [sortBy, setSortBy] = useState("default");
  const sortedMovies = useMemo(() => {
    return SortAll(filteredMovies, sortBy);
  }, [filteredMovies, sortBy]);

  // RETURN USER TO 1 PAGE AFTER SORTING //
  const gridRef = useRef(null);
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  }, [sortBy]);

  // PAGINATION //
  const moviesTopRef = useRef(null);
  const isFirstRender = useRef(true);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6;
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const totalPages = Math.ceil(sortedMovies.length / moviesPerPage);

  // MOVE USER UP AFTER NEXT PAGE //
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (moviesTopRef.current) {
      moviesTopRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  // REMOVE MOVIES LIMIT PER PAGES FOR TABLETS AND PHONES  //
  const isMobileOrTablet = useIsMobile(768);
  const currentMovies = isMobileOrTablet
    ? sortedMovies
    : sortedMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  return (
    <main className="movies-page">
      <section className="movies-intro">
        <p className="movies-label"> {t.label}</p>
        <h1>
          {t.title}
          <br />
          {t.title2}
        </h1>
        <p className="movies-description">{t.description}</p>
      </section>
      <div ref={moviesTopRef}>
        <MoviesFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setCurrentPage={setCurrentPage}
          language={language}
          t={t}
        />
      </div>
      {currentMovies.length === 0 && (
        <div className="empty-movies">
          <h2>{t.emptyTitle} </h2>
          <p>{t.emptyText}</p>
        </div>
      )}

      {currentMovies.length > 0 && (
        <div className="movies-grid" ref={gridRef}>
          {currentMovies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              language={language}
              t={t}
              onOpenModal={setSelectedMovie}
              carouselIndex={index + 1}
              carouselTotal={currentMovies.length}
            />
          ))}
        </div>
      )}

      {!isMobileOrTablet && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            →
          </button>
        </div>
      )}
      {selectedMovie && (
        <ModalOverlay
          movie={selectedMovie}
          language={language}
          t={t}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </main>
  );
}
