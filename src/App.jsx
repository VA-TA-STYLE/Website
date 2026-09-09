import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Footer from "./components/Footer";
import Movies from "./pages/Movies";
import TVSeries from "./pages/TVSeries";
import MyProjects from "./pages/MyProjects";
import ScrollToTop from "./components/ScrollToTop";
import Privacy from "./pages/legal/Privacy";
import Terms from "./pages/legal/Terms";
import Cookie from "./pages/legal/Cookie";
import CookieBanner from "./components/CookieBanner";

const getDefaultLanguage = () => {
  const savedLanguage = localStorage.getItem("appLanguage");
  if (savedLanguage) {
    return savedLanguage;
  }
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.toLowerCase().includes("ru")) {
    return "rus";
  }
  return "eng";
};
function App() {
  const [language, setLanguage] = useState(getDefaultLanguage);
  useEffect(() => {
    localStorage.setItem("appLanguage", language);
  }, [language]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  useEffect(() => {
    document.body.classList.remove("preload");
  }, []);

  return (
    <BrowserRouter>
      <div className="wrapper">
        <ScrollToTop />
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          language={language}
          setLanguage={setLanguage}
        />

        <Routes>
          <Route
            path="/home"
            element={<Main language={language} theme={theme} />}
          />
          <Route path="/movies" element={<Movies language={language} />} />
          <Route path="/TVSeries" element={<TVSeries language={language} />} />
          <Route
            path="/MyProjects"
            element={<MyProjects language={language} theme={theme} />}
          />
          <Route path="/privacy" element={<Privacy language={language} />} />
          <Route path="/terms" element={<Terms language={language} />} />
          <Route path="/cookie" element={<Cookie language={language} />} />
        </Routes>

        <Footer language={language} />
        <CookieBanner language={language}></CookieBanner>
      </div>
    </BrowserRouter>
  );
}
export default App;
