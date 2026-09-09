import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../styles/Footer.css";


const translations = {
  eng: {
    explore: "Explore",
    movies: "Movies",
    tvShows: "TV Shows",
    projects: "My Projects",
    legal: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    cookie: "Cookie Policy",
    contact: "Contact Me"
  },
  rus: {
    explore: "Разделы",
    movies: "Фильмы",
    tvShows: "Сериалы",
    projects: "Мои проекты",
    legal: "Документы",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
    cookie: "Политика Cookie",
    contact: "Связаться"
  },
};
export default function Footer({ language }) {
  const currentYear = new Date().getFullYear();
  const t = translations[language] || translations.eng;
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-explore">
          <h2>{t.explore}</h2>
          <Link className="footer-explore-btn" to="/movies">
            {t.movies}
          </Link>
          <Link className="footer-explore-btn" to="/TVSeries">
            {t.tvShows}
          </Link>
          <Link className="footer-explore-btn" to="/MyProjects">
            {t.projects}
          </Link>
        </div>

        <div className="footer-politics">
          <h2>{t.legal}</h2>
          <Link className="footer-explore-btn" to="/privacy">
            {t.privacy}
          </Link>
          <Link className="footer-explore-btn" to="/terms">
            {t.terms}
          </Link>
          <Link className="footer-explore-btn" to="/cookie">
            {t.cookie}
          </Link>
        </div>

        <div className="footer-links">
          <h2>{t.contact}</h2>
          <a
            href="https://github.com/VA-TA-STYLE"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>{" "}
            GitHub
          </a>
          <a href="mailto:enchante.mahauri@gmail.com">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            Email
          </a>
          <a href="https://t.me/Vatastyle21" target="_blank" rel="noreferrer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.014-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.447z" />
            </svg>
            Telegram
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Enchanté VATaSTYLE</p>
        <p className="footer-built-with">
          Built with Hands, Keyboard and React
        </p>
      </div>
    </footer>
  );
}
