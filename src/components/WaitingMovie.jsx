  import React, { useState, useEffect } from "react";
  import "../styles/WaitingMovie.css";

  const translations = {
    eng: {
      waitingBadge: "WAITING FOR THE RELEASE",
      days: "days",
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds",
    },
    rus: {
      waitingBadge: "ЖДУ ВЫХОДА",
      days: "дней",
      hours: "часов",
      minutes: "минут",
      seconds: "секунд",
    },
  };
  export default function WaitingMovie({ language, movie, positionClass }) {
    const calculateTimeLeft = () => {
  
      const target = movie?.releaseDate
        ? new Date(movie.releaseDate)
        : new Date("2026-12-18T00:00:00");
      const difference = target - new Date();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

     
      return () => clearInterval(timer);
    }, [movie]); 

    if (!movie) return null;

    const t = translations[language] || translations.eng;
    return (
      <div className={`waiting-movie-card ${positionClass}`}>
        <div className="waiting-movie-poster">
          <img src={movie.img} alt={movie.title} />
          <div className="waiting-movie-badge">
            <span>◷</span>
            {t.waitingBadge}
          </div>
        </div>

        <div className="waiting-movie-info">
          <h2>{movie.title[language] || movie.title.eng}</h2>

          <div className="waiting-movie-timer">
            <div className="timer-item">
              <strong>{timeLeft.days}</strong>
              <span>{t.days}</span>
            </div>
            <div className="timer-item">
              <strong>{timeLeft.hours}</strong>
              <span>{t.hours}</span>
            </div>
            <div className="timer-item">
              <strong>{timeLeft.minutes}</strong>
              <span>{t.minutes}</span>
            </div>
            <div className="timer-item">
              <strong>{timeLeft.seconds}</strong>
              <span>{t.seconds}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
