import React from "react";
import { useEffect, useState, useMemo, useRef } from "react";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../assets/data/firebase";
import { quizLevels } from "../assets/data/quiz";
import LevelsPanel from "../components/LevelsPanel";
import QuizTimer from "../components/QuizTimer";
import QuizWelcomeScreen from "../components/QuizWelcomeScreen";
import QuizHowToPlay from "../components/QuizHowToPlay";
import QuizLeaderBoard from "../components/QuizLeaderBoard";
import "../styles/Quiz.css";
const translations = {
  rus: {
    question: "Вопрос",
    from: "из",
    completed: "Квиз завершен!",
    scoreResult: "Вы угадали",
    movies: "фильмов",
    restartBtn: "Сыграть еще раз",
    playerRating: "Рейтинг игроков",
    loadingStats: "Загрузка данных",
  },
  eng: {
    question: "Question",
    from: "of",
    completed: "Quiz completed!",
    scoreResult: "You guessed",
    movies: "movies",
    restartBtn: "Play again",
    playerRating: "Players Rating",
    loadingStats: "Loading data",
  },
};
export default function Quiz({ language, theme, onTimeUp }) {
  const t = translations[language] || translations.eng;
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentLevel, setCurrentLevel] = useState("warmup");
  const [unlockedLevels, setUnlockedLevels] = useState(["warmup"]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lives, setLives] = useState(3);
  const quizTopRef = useRef(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const totalGameQuestions =
    quizLevels.warmup.length +
    quizLevels.medium.length +
    (quizLevels.advanced ? quizLevels.advanced.length : 0); // Добавили 3-й уровень

  const currentQuestions = quizLevels[currentLevel];
  const questionData = currentQuestions
    ? currentQuestions[currentQuestion]
    : null;

  useEffect(() => {
    const nextIndex = currentQuestion + 1;
    // ИСПОЛЬЗУЕМ currentQuestions.length вместо quiz.length
    if (currentQuestions && nextIndex < currentQuestions.length) {
      const img = new Image();
      img.src = currentQuestions[nextIndex].image;
    }
  }, [currentQuestion, currentQuestions]);

  // 2. Эффект для автоматического скролла наверх
  useEffect(() => {
    // 1024px — это стандартная граница для планшетов (включая iPad в горизонтальной ориентации)
    const isMobileOrTablet = window.innerWidth <= 1024;

    if (quizTopRef.current && isMobileOrTablet) {
      quizTopRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentQuestion, showResult]);

  const currentOptions = useMemo(() => {
    if (!questionData) return [];

    // Создаем копию массива нужного языка
    const options =
      language === "rus"
        ? [...questionData.optionsRu]
        : [...questionData.options];

    // Перемешиваем массив случайным образом
    return options.sort(() => Math.random() - 0.5);
  }, [questionData, language]);
  const currentCorrectAnswer = questionData
    ? language === "rus"
      ? questionData.correctAnswerRu
      : questionData.correctAnswer
    : "";

  // 1. Добавляем async перед функцией
  async function handleAnswer(selectedOption) {
    let currentLives = lives;
    let finalScore = score;

    if (selectedOption === currentCorrectAnswer) {
      finalScore += 1;
      setScore(finalScore);
    } else {
      currentLives = lives - 1; // (тут у вас была опечатка с минусом в коде)
      setLives(currentLives);
    }

    const nextQuestionIndex = currentQuestion + 1;

    // 1. Если жизни упали до нуля — сразу проигрыш и конец игры
    if (currentLives <= 0) {
      // 2. СНАЧАЛА ждем сохранения базы данных
      await saveResultToLeaderboard(playerName, finalScore);
      // 3. ПОТОМ показываем экран
      setShowResult(true);
      return;
    }

    // 2. Если в текущем уровне еще остались вопросы
    if (nextQuestionIndex < currentQuestions.length) {
      setCurrentQuestion(nextQuestionIndex);
    }
    // 3. Если вопросы кончились, и мы на уровне "Разминка"
    else if (currentLevel === "warmup") {
      setCurrentLevel("medium");
      setCurrentQuestion(0);
      setUnlockedLevels((prev) => [...prev, "medium"]);
    }
    // 4. Если кончились вопросы на "Среднем"
    else if (currentLevel === "medium") {
      setCurrentLevel("advanced");
      setCurrentQuestion(0);
      setUnlockedLevels((prev) => [...prev, "advanced"]);
    }
    // 5. Если кончились вопросы на "Сложном" уровне — полная победа
    else {
      // Здесь тоже меняем порядок
      await saveResultToLeaderboard(playerName, finalScore);
      setShowResult(true);
    }
  }
  function restartQuiz() {
    setCurrentQuestion(0); // Возвращаем на первый вопрос
    setScore(0); // Обнуляем счет
    setLives(3); // Восстанавливаем 3 жизни
    setCurrentLevel("warmup"); // Возвращаем на первый уровень
    setUnlockedLevels(["warmup"]); // Снова вешаем замок на второй уровень
    setShowResult(false); // Убираем экран результатов

    // Если хочешь, чтобы после клика "Сыграть заново" игра сразу начиналась
    // (без экрана ввода имени), ставь true. Если хочешь возвращать на главный экран — false.
    setIsGameStarted(true);
  }
  function getPlayerId() {
    let id = localStorage.getItem("quizPlayerId");
    if (!id) {
      id = "player_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
      localStorage.setItem("quizPlayerId", id);
    }
    return id;
  }
  async function saveResultToLeaderboard(name, finalScore) {
    const playerId = getPlayerId();
    const newXp = finalScore * 100;

    try {
      // Ссылка на документ конкретного игрока в коллекции "leaderboard"
      const playerRef = doc(db, "leaderboard", playerId);
      const playerSnap = await getDoc(playerRef);

      // Если игрок уже есть в базе, проверяем, побил ли он свой рекорд
      if (playerSnap.exists()) {
        const oldXp = playerSnap.data().xp;

        if (newXp > oldXp) {
          // Обновляем данные, если новый результат лучше
          await setDoc(playerRef, { name: name, xp: newXp }, { merge: true });
        } else {
          // ВОТ ЗДЕСЬ ГЛАВНОЕ ИЗМЕНЕНИЕ:
          // Рекорд не побит, но мы всё равно ПЕРЕЗАПИСЫВАЕМ ИМЯ в той же строчке!
          await setDoc(playerRef, { name: name }, { merge: true });
        }
      } else {
        // Если игрок играет впервые, просто создаем запись
        await setDoc(playerRef, { name: name, xp: newXp });
      }
    } catch (error) {
      console.error("Ошибка при сохранении в Firebase:", error);
    }
  }
  // Добавляем состояние для проверки мобильного экрана
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  // Слушаем изменение размера окна
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onOptionClick = (option) => {
    // Блокируем повторные нажатия, пока показывается цвет
    if (isAnswerRevealed) return;

    setSelectedAnswer(option);
    setIsAnswerRevealed(true);

    // Ждем 1.5 секунды, затем передаем ответ в вашу основную логику
    setTimeout(() => {
      handleAnswer(option);

      // Сбрасываем подсветку для следующего вопроса
      setSelectedAnswer(null);
      setIsAnswerRevealed(false);
    }, 1500);
  };
  const [allPlayers, setAllPlayers] = useState([]);

  // 2. Создаем useEffect, который срабатывает, когда игра заканчивается (showResult === true)
  useEffect(() => {
    const fetchAllPlayers = async () => {
      try {
        // ВНИМАНИЕ: Замените "leaderboard" на реальное название вашей коллекции в Firebase
        const querySnapshot = await getDocs(collection(db, "leaderboard"));

        const playersList = [];
        querySnapshot.forEach((doc) => {
          playersList.push(doc.data());
        });

        // 3. Сортируем массив по убыванию очков (от большего к меньшему)
        playersList.sort((a, b) => b.score - a.score);

        // 4. Сохраняем готовый список в стейт
        setAllPlayers(playersList);
      } catch (error) {
        console.error("Ошибка при загрузке рейтинга: ", error);
      }
    };

    // Запрашиваем данные только тогда, когда игрок дошел до экрана результатов
    if (showResult) {
      fetchAllPlayers();
    }
  }, [showResult]);
  const currentMobileBackground =
    theme === "dark"
      ? "/QuizBackgroundMobile.webp"
      : "/QuizBackgroundMobileLight.webp";
  const currentDesktopBackground =
    theme === "dark"
      ? "/QuizBackgroundDesktop.webp"
      : "/QuizBackgroundDesktopLight.webp";

  return (
    <>
      {!isGameStarted ? (
        <div className="quiz-layout">
          <div className="quiz-side-column">
            <QuizHowToPlay language={language} />
          </div>
          <div className="quiz-main-column">
            <QuizWelcomeScreen
              language={language}
              setIsGameStarted={setIsGameStarted}
              playerName={playerName}
              setPlayerName={setPlayerName}
            />
          </div>
          <div className="quiz-side-column">
            <QuizLeaderBoard language={language}></QuizLeaderBoard>
          </div>
        </div>
      ) : (
        <main className="main-quiz">
          <div className="quiz-background">
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet={currentMobileBackground}
              />
              <img
                src={currentDesktopBackground}
                alt="Hero"
                className="hero-image"
                fetchPriority="high"
              />
            </picture>
          </div>

          <div className="quiz-container">
            {showResult ? (
              <div className="result-screen" ref={quizTopRef}>
                <h2>{t.completed}</h2>
                <p>
                  {playerName}, {t.scoreResult.toLowerCase()} {score} {t.from}{" "}
                  {totalGameQuestions} {t.movies}.
                </p>
                <button className="restart-btn" onClick={restartQuiz}>
                  {t.restartBtn}
                </button>

                {/* НОВЫЙ БЛОК: Расширенная статистика */}
                <div className="extended-stats-container">
                  <h3>{t.playerRating}</h3>

                  <div className="stats-scroll-box">
                    {allPlayers && allPlayers.length > 0 ? (
                      allPlayers.map((player, index) => (
                        <div
                          key={index}
                          // Подсвечиваем строку, если это текущий игрок
                          className={`stat-row ${player.name === playerName ? "current-player" : ""}`}
                        >
                          <span className="stat-rank">#{index + 1}</span>
                          <span className="stat-name">{player.name}</span>
                          <span className="stat-score">{player.score}</span>
                        </div>
                      ))
                    ) : (
                      <p className="loading-stats">
                        {t.loadingStats}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              questionData && (
                <div className="question-screen" ref={quizTopRef}>
                  {isMobile && (
                    <div className="mobile-levels-wrapper">
                      <LevelsPanel
                        language={language}
                        currentLevel={currentLevel}
                        setCurrentLevel={setCurrentLevel}
                        unlockedLevels={unlockedLevels}
                        isQuizCompleted={showResult && lives > 0}
                      />
                    </div>
                  )}
                  <div className="upper-progress">
                    <p className="progress">
                      {t.question} {currentQuestion + 1} {t.from}{" "}
                      {currentQuestions.length}
                    </p>

                    <div className="lives-container">
                      {[...Array(3)].map((_, i) => (
                        <span
                          key={i}
                          className={`heart ${i < lives ? "active" : "lost"}`}
                        >
                          ❤️
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="quiz-image-wrapper">
                    {isMobile && (
                      <div className="mobile-timer-wrapper">
                        <QuizTimer
                          key={`mobile-${currentLevel}-${currentQuestion}`}
                          onTimeUp={() => handleAnswer(null)}
                          isGameOver={showResult}
                        />
                      </div>
                    )}

                    <img
                      src={questionData.image}
                      alt="Movie poster"
                      className="quiz-image"
                    />
                  </div>
                  <div className="options-container">
                    {currentOptions.map((option, index) => {
                      const number = index + 1;

                      // Проверяем, является ли эта кнопка правильным ответом
                      // 1. Находим индекс правильного ответа в базовом английском массиве
                      const correctIndex = questionData.options.indexOf(
                        questionData.correctAnswer,
                      );

                      // 2. Достаем правильный ответ на нужном языке по этому индексу
                      const localizedCorrectAnswer =
                        language === "rus"
                          ? questionData.optionsRu[correctIndex]
                          : questionData.correctAnswer;

                      // 3. Сравниваем кликнутый вариант с правильным ответом на текущем языке
                      const isCorrect = option === localizedCorrectAnswer;
                      const isSelected = option === selectedAnswer;

                      // Формируем динамические классы
                      let btnClass = "option-btn";
                      if (isAnswerRevealed) {
                        if (isCorrect) {
                          btnClass += " correct"; // Правильный всегда подсвечиваем зеленым
                        } else if (isSelected) {
                          btnClass += " wrong"; // Ошибочный выбор подсвечиваем красным
                        } else {
                          btnClass += " disabled"; // Остальные делаем тусклыми
                        }
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => onOptionClick(option)}
                          className={btnClass}
                          disabled={isAnswerRevealed} // Выключаем кнопку, пока идет пауза
                        >
                          <span className="option-number">{number}</span>
                          <span className="option-text">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )
            )}
          </div>
          <div className="quiz-sidebar">
            {!isMobile && (
              <LevelsPanel
                language={language}
                currentLevel={currentLevel}
                setCurrentLevel={setCurrentLevel}
                unlockedLevels={unlockedLevels}
                isQuizCompleted={showResult && lives > 0}
              />
            )}
            {!isMobile && !showResult && (
              <QuizTimer
                language={language}
                key={`desktop-${currentLevel}-${currentQuestion}`}
                onTimeUp={() => onOptionClick(null)}
                isGameOver={showResult}
              />
            )}
          </div>
        </main>
      )}
    </>
  );
}
