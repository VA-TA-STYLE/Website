import "../styles/Main.css";
import { Link } from "react-router-dom";
import HeroBackground from "../assets/main/HeroBackground.png";
import HeroBackgroundLight from "../assets/main/HeroBackgroundLight.png";
import StatsPanel from "../components/StatsPanel";
import MarqueeTrack from "../components/MarqueeTrack";
import VisitorCounter from "../components/VisitorCounter";
const translations = {
  eng: {
    label: "Movie Journal by Vatastyle",
    title: "Recent watch history",
    title2: "with my personal verdict",
    description:
      "This is my personal journal of the things I watch, play, learn, make, and think about - the things I loved, hated, finished, abandoned, and couldn't stop thinking about",
    exploreBtn: "Explore Journal",
  },

  rus: {
    label: "Кинодневник Vatastyle",
    title: "Недавние просмотры",
    title2: "с моим личным вердиктом",
    description:
      "Это мой личный журнал обо всём, что я смотрю, во что играю, чему учусь, что создаю и о чём думаю - о том, что я люблю, ненавижу, заканчиваю, бросаю и о чём не могу перестать думать.",
    exploreBtn: "Открыть дневник",
  },
};
export default function Main({ language, theme }) {
  const t = translations[language] || translations.eng;

  return (
    <main>
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <p className="main-label">{t.label}</p>
            <h1>
              {t.title}
              <br />
              {t.title2}
            </h1>
            <div className="hero-buttons">
              <Link to="/movies" className="btn-one">
                {t.exploreBtn}
              </Link>
            </div>
          </div>
          <div className="hero-center">
            <img
              src={theme === "dark" ? HeroBackground : HeroBackgroundLight}
              alt="Hero"
              className="hero-image"
            />
          </div>
          <StatsPanel language={language} />
        </div>
              <div><VisitorCounter language={language}></VisitorCounter></div>
      </section>
      <MarqueeTrack language={language} />
    </main>
  );
}
