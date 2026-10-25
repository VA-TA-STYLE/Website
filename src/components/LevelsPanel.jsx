import "../styles/LevelsPanel.css";
import React, { useRef, useEffect } from "react";

export default function LevelsPanel({
  language,
  currentLevel,
  setCurrentLevel,
  unlockedLevels,
  isQuizCompleted = false,
}) {
  const isMediumLocked = !unlockedLevels.includes("medium");
  const isAdvancedLocked = !unlockedLevels.includes("advanced");

  // ИСПРАВЛЕНО: Разминка пройдена, если мы на среднем ИЛИ на сложном уровне
  const isWarmupCompleted =
    currentLevel === "medium" || currentLevel === "advanced";

  // Средний уровень пройден, только если мы на сложном
  const isMediumCompleted = currentLevel === "advanced";
  const isAdvancedCompleted = isQuizCompleted;

  const activeLevelRef = useRef(null);
  useEffect(() => {
    if (activeLevelRef.current) {
      // Плавно прокручиваем контейнер так, чтобы активная карточка оказалась по центру
      activeLevelRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center", // Центрирует элемент по горизонтали
      });
    }
  }, [currentLevel]);
  return (
    <div className="levels-glass-panel">
      <h2 className="levels-title">
        {language === "rus" ? "Уровни сложности" : "Difficulty levels"}
      </h2>

      <div className="levels-wrapper">
        <div className="connecting-line"></div>
        <div
          ref={currentLevel === "warmup" ? activeLevelRef : null}
          className={`level-card ${currentLevel === "warmup" ? "active" : ""} ${isWarmupCompleted ? "completed" : ""}`}
          onClick={() => setCurrentLevel("warmup")}
          style={{ cursor: "pointer" }}
        >
          <div className="level-circle">{isWarmupCompleted ? "✔️" : "1"}</div>
          <div className="level-texts">
            <h3>{language === "rus" ? "Разминка" : "Warmup"}</h3>
            <p>{language === "rus" ? "Простые вопросы" : "Easy questions"}</p>
          </div>
          <div className="level-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
        <div
          ref={currentLevel === "medium" ? activeLevelRef : null}
          className={`level-card ${currentLevel === "medium" ? "active" : ""} ${isMediumLocked ? "locked" : ""} ${isMediumCompleted ? "completed" : ""}`}
          onClick={() => {
            if (!isMediumLocked) {
              setCurrentLevel("medium");
            }
          }}
          style={{ cursor: isMediumLocked ? "not-allowed" : "pointer" }}
        >
          <div className="level-circle">{isMediumCompleted ? "✔️" : "2"}</div>

          <div className="level-texts">
            <h3>{language === "rus" ? "Средний уровень" : "Medium level"}</h3>
            <p>
              {language === "rus" ? "Вопросы посложнее" : "Harder questions"}
            </p>
          </div>
          <div className="level-icon">
            {isMediumLocked ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            )}
          </div>
        </div>
        <div
          ref={currentLevel === "advanced" ? activeLevelRef : null}
          className={`level-card ${currentLevel === "advanced" ? "active" : ""} ${isAdvancedLocked ? "locked" : ""} ${isAdvancedCompleted ? "completed" : ""}`}
          onClick={() => {
            if (!isAdvancedLocked) {
              setCurrentLevel("advanced");
            }
          }}
          style={{ cursor: isAdvancedLocked ? "not-allowed" : "pointer" }}
        >
          <div className="level-circle">{isAdvancedCompleted ? "✔️" : "3"}</div>
          <div className="level-texts">
            <h3>{language === "rus" ? "Высокий уровень" : "Advanced level"}</h3>
            <p>{language === "rus" ? "Сложные вопросы" : "Tough questions"}</p>
          </div>
          <div className="level-icon">
            {isAdvancedLocked ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
