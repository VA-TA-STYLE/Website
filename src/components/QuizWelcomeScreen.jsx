import React from "react";
import { useState } from "react";
import "../styles/QuizWelcomeScreen.css";

const translations = {
  rus: {
    welcome: "Добро пожаловать в Киномарафон",
    enterName: "Введите имя...",
    startGame: "Начать игру",
  },
  eng: {
    welcome: "Welcome to the Movie Marathon",
    enterName: "Enter name...",
    startGame: "Start game",
  },
};
export default function QuizWelcomeScreen({
  language,
  setIsGameStarted,
  playerName,
  setPlayerName,
}) {
  const t = translations[language] || translations.eng;
  const isNameEmpty = playerName.trim() === "";
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && playerName.trim() !== "") {
      setIsGameStarted(true);
    }
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-icon">🎥</div>
      <h2>{t.welcome}</h2>
      <input
        maxLength={12}
        type="text"
        value={playerName}
        placeholder={t.enterName}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          let formattedText = e.target.value.replace(/\d/g, "");

          if (formattedText.length > 0) {
            formattedText =
              formattedText.charAt(0).toUpperCase() +
              formattedText.slice(1).toLowerCase();
          }

          setPlayerName(formattedText);
        }}
      />
      <button
        onClick={() => {
          if (playerName.trim() !== "") {
            setIsGameStarted(true);
          }
        }}
        disabled={isNameEmpty}
      >
        {t.startGame}
      </button>
    </div>
  );
}
