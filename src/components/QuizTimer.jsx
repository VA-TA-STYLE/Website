import React, { useState, useEffect } from "react";
import "../styles/QuizTimer.css";

const INITIAL_TIME = 20;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
}
const translations = {
  rus: {
    timer: "Таймер квиза",
    timerEnd: "Осталось времени",
    timeUp: "Время вышло!", // <-- Добавили
  },
  eng: {
    timer: "Quiz Timer",
    timerEnd: "Time remaining",
    timeUp: "Time's up!", // <-- Добавили
  },
};
export default function QuizTimer({ onTimeUp, isGameOver, language }) {
  const t = translations[language] || translations.eng;
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  useEffect(() => {
    // 2. БЛОКИРОВКА: Если мы на экране результатов, таймер ничего не делает
    if (isGameOver) return;

    if (timeLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp, isGameOver]); // Не забудьте добавить isGameOver в зависимости

  const progress = (timeLeft / INITIAL_TIME) * 100;

  return (
    <div className="quiz-timer-panel">
      <h3>⏱ {t.timer}</h3>

      <div className={`timer-circle ${timeLeft <= 5 ? "timer-danger" : ""}`}>
        <span>{formatTime(timeLeft)}</span>
      </div>

      <div className="timer-progress">
        <div
          className="timer-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p>{timeLeft === 0 ? t.timeUp : t.timerEnd}</p>
    </div>
  );
}
