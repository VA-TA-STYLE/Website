import React from "react";
import "../styles/Header.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Switch from "./SwitchLanguage.jsx";
import ThemeSwitcher from "./ThemeSwitcher.jsx";
const translations = {
  eng: {
    home: "Home",
    collection: "Collection",
    movies: "Movies",
    tvSeries: "TV Series",
    projects: "My Projects",
  },

  rus: {
    home: "Главная",
    collection: "Коллекция",
    movies: "Фильмы",
    tvSeries: "Сериалы",
    projects: "Мои Проекты",
  },
};
export default function Header({ language, setLanguage, theme, toggleTheme }) {
  const t = translations[language] || translations.eng;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={isVisible ? "" : "header-hidden"}>
      <NavLink to="/home" className="logo">
        <span className="logo-subtext">VATaSTYLE</span>
      </NavLink>

      <nav className={isMenuOpen ? "nav-open" : ""}>
        <NavLink
          to="/home"
          end
          onClick={() => setIsMenuOpen(false)}
          className="nav-item"
        >
          <div className="nav-item-left">
            <div className="nav-icon home-icon"></div>
            <span>{t.home}</span>
          </div>
        </NavLink>
        <div className="collection-dropdown">
          <span className="collection-link">{t.collection}</span>

          <div className="collection-menu">
            <NavLink
              to="/movies"
              onClick={() => setIsMenuOpen(false)}
              className="nav-item"
            >
              <div className="nav-item-left">
                <div className="nav-icon movies-icon"></div>
                <span>{t.movies}</span>
              </div>
            </NavLink>
            <NavLink
              to="/TVSeries"
              onClick={() => setIsMenuOpen(false)}
              className="nav-item"
            >
              <div className="nav-item-left">
                <div className="nav-icon tv-icon"></div>
                <span>{t.tvSeries}</span>
              </div>
              {/* <span className="nav-arrow">›</span> */}
            </NavLink>
          </div>
        </div>
        <NavLink
          to="/MyProjects"
          onClick={() => setIsMenuOpen(false)}
          className="nav-item"
        >
          <div className="nav-item-left">
            <div className="nav-icon projects-icon"></div>
            <span>{t.projects}</span>
          </div>
        </NavLink>
      </nav>
      <div
        className={`hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="header-actions">
        <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
        <Switch language={language} setLanguage={setLanguage} />
      </div>
      <div
        className={`overlay-hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
    </header>
  );
}
