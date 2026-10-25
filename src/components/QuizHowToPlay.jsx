import React from "react";
import "../styles/QuizHowToPlay.css";
const translations = {
  rus: {
    title: "Как играть?",
    rule1: "8 Вопросов о кино",
    rule2: "Ограниченное время",
    rule3: "Набирай очки",
    rule4: "Попади в топ",
  },
  eng: {
    title: "How to play?",
    rule1: "8 Movie questions",
    rule2: "Limited time",
    rule3: "Earn points",
    rule4: "Reach the top",
  },
};
export default function HowToPlay({ language }) {
  const t = translations[language] || translations.eng;
  return (
    <div className="how-to-play-card">
      <h3 className="how-to-play-title">
        <span className="title-emoji">🎯</span> {t.title}
      </h3>

      <ul className="how-to-play-list">
        <li>
          <span className="list-emoji">🍿</span>
          {t.rule1}
        </li>
        <li>
          <span className="list-emoji">⏱️</span>
          {t.rule2}
        </li>
        <li>
          <span className="list-emoji">🔥</span>
          {t.rule3}
        </li>
        <li>
          <span className="list-emoji">🏅</span>
          {t.rule4}
        </li>
      </ul>
    </div>
  );
}
