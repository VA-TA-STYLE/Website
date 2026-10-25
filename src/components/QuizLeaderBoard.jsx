import React from "react";
import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../assets/data/firebase";
import "../styles/QuizLeaderBoard.css";

const translations = {
  rus: {
    title: "Лидеры",
  },
  eng: {
    title: "Leaders",
  },
};

export default function Leaderboard({ language }) {
  const t = translations[language] || translations.eng;
  const [topPlayers, setTopPlayers] = useState([]);

  // useEffect сработает один раз при отрисовке компонента
  useEffect(() => {
    async function fetchLeaders() {
      try {
        const leadersRef = collection(db, "leaderboard");
        // Запрашиваем: сортировка по xp (по убыванию), берем только 5 лучших
        const q = query(leadersRef, orderBy("xp", "desc"), limit(5));

        const querySnapshot = await getDocs(q);
        const fetchedLeaders = [];

        querySnapshot.forEach((doc) => {
          fetchedLeaders.push({ id: doc.id, ...doc.data() });
        });

        // Если в базе пока никого нет, можно оставить ботов для красоты
        if (fetchedLeaders.length > 0) {
          setTopPlayers(fetchedLeaders);
        }
      } catch (error) {
        console.error("Ошибка при загрузке лидеров:", error);
      }
    }

    fetchLeaders();
  }, []); // Пустой массив - загружает 1 раз при открытии страницы
  return (
    <div className="leaderboard-card">
      <h3 className="leaderboard-title">
        <span className="title-emoji">🏆</span> {t.title}
      </h3>

      <ul className="leaderboard-list">
        {topPlayers.map((player, index) => (
          <li key={player.id}>
            <span className="player-rank">{index + 1}.</span>
            <span className="player-name">{player.name}</span>
            <span className="player-score">— {player.xp} XP</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
