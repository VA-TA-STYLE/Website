import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/CookieBanner.css";
const translations = {
  eng: {
    cookieText:
      "We use cookies (including Yandex Metrica) for analytics and to improve site performance. By continuing, you agree to our ",
    cookieLink: "Privacy Policy",
    cookieButton: "Got it",
  },

  rus: {
    cookieText:
      "Мы используем файлы cookie (в том числе Яндекс Метрику) для аналитики и улучшения работы сайта. Продолжая работу, вы соглашаетесь с нашей ",
    cookieLink: "Политикой конфиденциальности",
    cookieButton: "Понятно",
  },
};
export default function CookieBanner({ language }) {
  const t = translations[language] || translations.eng;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem("cookieConsent");
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="banner">
      <p className="text">
        {t.cookieText}{" "}
        <Link to="/privacy" className="link">
          {t.cookieLink}
        </Link>
        .
      </p>
      <button onClick={handleAccept} className="button">
        {t.cookieButton}
      </button>
    </div>
  );
}
