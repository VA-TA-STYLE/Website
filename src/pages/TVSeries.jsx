import React from "react";
import { useEffect, useState, useRef, useMemo } from "react";
import { series } from "../assets/data/series";
import { SortAll } from "../components/Sort.jsx";
import MovieCard from "../components/MovieCard.jsx";
import ModalOverlay from "../components/ModalOverlay.jsx";
import useModalFromLocation from "../components/hooks/useModalFromLocation";
import MoviesFilter from "../components/MoviesFilter.jsx";
import useIsMobile from "../components/hooks/useIsMobile.jsx";
const translations = {
  eng: {
    label: "My series journal",
    title: "Series I watched",
    title2: "and actually remember.",
    description:
      "TV shows I've followed, binged, dropped, and come back to. A collection of stories, characters and worlds that kept me coming back for another episode.",
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
    label: "Мой сериал-журнал",
    title: "Сериалы, которые я посмотрел",
    title2: "и запомнил.",
    description:
      "Сериалы, за которыми я следил, смотрел запоем, бросал и к которым возвращался. Коллекция историй, персонажей и миров, которые заставляли меня включать следующую серию.",
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
export default function TVSeries({ language }) {
  const t = translations[language] || translations.eng;
  const [selectedSeries, setSelectedSeries] = useState(null);
  useModalFromLocation(series, setSelectedSeries);

  // SEARCH BAR //
  const [searchQuery, setSearchQuery] = useState("");
  const filteredSeries = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return series.filter((serie) => {
      const titleEng = serie.title.toLowerCase();
      const titleRu = (serie.titleRu || "").toLowerCase();
      return titleEng.includes(query) || titleRu.includes(query);
    });
  }, [searchQuery]);

  // SORT RATING //
  const [sortBy, setSortBy] = useState("default");
  const sortedSeries = useMemo(() => {
    return SortAll(filteredSeries, sortBy);
  }, [filteredSeries, sortBy]);

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
  const seriesTopRef = useRef(null);
  const isFirstRender = useRef(true);
  const [currentPage, setCurrentPage] = useState(1);
  const seriesPerPage = 6;
  const indexOfLastSerie = currentPage * seriesPerPage;
  const indexOfFirstSerie = indexOfLastSerie - seriesPerPage;
  const totalPages = Math.ceil(sortedSeries.length / seriesPerPage);

  // MOVE USER UP AFTER NEXT PAGE //
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (seriesTopRef.current) {
      seriesTopRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  // REMOVE SERIES LIMIT PER PAGES FOR TABLETS AND PHONES //
  const isMobileOrTablet = useIsMobile(768);
  const currentSeries = isMobileOrTablet
    ? sortedSeries
    : sortedSeries.slice(indexOfFirstSerie, indexOfLastSerie);

  return (
    <main className="series-page">
      <section className="movies-intro">
        <p className="movies-label"> {t.label}</p>
        <h1>
          {t.title}
          <br />
          {t.title2}
        </h1>
        <p className="movies-description">{t.description}</p>
      </section>
      <div ref={seriesTopRef}>
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
      {currentSeries.length === 0 && (
        <div className="empty-movies">
          <h2>{t.emptyTitle} </h2>
          <p>{t.emptyText}</p>
        </div>
      )}
      {currentSeries.length > 0 && (
        <div className="movies-grid" ref={gridRef}>
          {currentSeries.map((serie, index) => (
            <MovieCard 
              key={serie.id}
              movie={serie}
              language={language}
              t={t}
              onOpenModal={setSelectedSeries}
              carouselIndex={index + 1}
              carouselTotal={currentSeries.length}
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
      {selectedSeries && (
        <ModalOverlay
          movie={selectedSeries}
          language={language}
          t={t}
          onClose={() => setSelectedSeries(null)}
        />
      )}
    </main>
  );
}
