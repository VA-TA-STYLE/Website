import React from "react";
import "../styles/AboutMe.css";
import { useEffect, useState } from "react";
import { FaGitAlt, FaNpm } from "react-icons/fa";
import { BiBox, BiCloudUpload } from "react-icons/bi";
import { VscGitCommit } from "react-icons/vsc";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact } from "react-icons/fa";
const translations = {
  rus: {
    title: "Привет, я веб-разработчик-самоучка",
    subtitle: "МОЙ ТЕХНОЛОГИЧЕСКИЙ СТЕК И ПРОГРЕСС",
    htmlDesc: "Полное понимание семантики, структуры.",
    cssDesc: "Адаптивная верстка, анимации.",
    jsDesc: "Активно применяю на практике. Изучаю основы ES6+, DOM.",
    reactDesc: "В процессе освоения. Изучаю хуки, стейт.",
    description:
      "Я увлечен веб-программированием и прошел путь от полного новичка до создания своих первых проектов. Обучаюсь самостоятельно, используя онлайн-курсы, документацию и сообщества",
    terminalTitle: "История команд: лог моего роста",
  },
  eng: {
    title: "Hi, I'm a self-taught web developer",
    subtitle: "MY TECH STACK AND PROGRESS",
    htmlDesc: "Full understanding of semantics and structure.",
    cssDesc: "Responsive design, animations.",
    jsDesc: "Actively using in projects. Learning ES6+, DOM.",
    reactDesc: "In progress. Learning hooks, state.",
    description:
      "I am passionate about web development and have gone from a complete beginner to building my first projects. I am self-taught, using online courses, documentation, and communities.",
    terminalTitle: "Command History: My Growth Log",
  },
};
const skills = [
  {
    id: 1,
    name: "HTML5",
    descKey: "htmlDesc",
    progress: 90,
    color: "#E34F26",
    icon: (
      <div className="custom-icon">
        <FaHtml5 color="#E34F26" />
      </div>
    ),
  },
  {
    id: 2,
    name: "CSS3",
    descKey: "cssDesc",
    progress: 90,
    color: "#264DE4",
    icon: (
      <div className="custom-icon">
        <FaCss3Alt color="#264DE4" />
      </div>
    ),
  },
  {
    id: 3,
    name: "JavaScript",
    descKey: "jsDesc",
    progress: 40,
    color: "#F7DF1E",
    icon: (
      <div className="custom-icon">
        <FaJsSquare color="#F7DF1E" />
      </div>
    ),
  },
  {
    id: 4,
    name: "React",
    descKey: "reactDesc",
    progress: 30,
    color: "#61DAFB",
    icon: (
      <div className="custom-icon">
        <FaReact color="#61DAFB" />
      </div>
    ),
  },
];
export default function AboutMe({ language, theme }) {
  const t = translations[language] || translations.eng;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <h1 className="about-title">{t.title}</h1>
          <p className="about-description">{t.description}</p>
          <h3 className="skills-subtitle">{t.subtitle}</h3>

          <div className="skills-container">
            {skills.map((skill) => (
              <div key={skill.id} className="skill-card">
                <div className="skill-card-top">
                  {skill.icon}
                  <div className="skill-info">
                    <h2>{skill.name}</h2>
                    <p>{t[skill.descKey]}</p>
                  </div>
                </div>

                <div className="skill-progress-container">
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width: isLoaded ? `${skill.progress}%` : "0%",
                        backgroundColor: skill.color,
                      }}
                    ></div>
                  </div>
                  <span className="progress-number">{skill.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="about-image-wrapper">
          <h3 className="terminal-title">{t.terminalTitle}</h3>
          <div className="terminal-card">
            {/* Шапка терминала с тремя точками (macOS стиль) */}
            <div className="terminal-header">
              <span className="mac-btn close"></span>
              <span className="mac-btn minimize"></span>
              <span className="mac-btn expand"></span>
            </div>

            {/* Тело терминала */}
            <div className="terminal-body">
              {/* Вертикальная линия соединения */}
              <div className="timeline-line"></div>

              {/* Шаг 1 */}
              <div className="log-entry">
                <div className="log-icon git-icon">
                  <FaGitAlt size={18} />
                </div>
                <div className="log-info">
                  <span className="log-command">{">_"} git init</span>
                  <span className="log-desc">git init --script</span>
                </div>
              </div>

              {/* Шаг 2 */}
              <div className="log-entry">
                <div className="log-icon npm-icon">
                  <FaNpm size={18} />
                </div>
                <div className="log-info">
                  <span className="log-command">npx create-react-app</span>
                  <span className="log-desc">
                    npx create-react-app --script
                  </span>
                </div>
              </div>

              {/* Шаг 3 */}
              <div className="log-entry">
                <div className="log-icon react-icon">
                  <FaReact size={18} />
                </div>
                <div className="log-info">
                  <span className="log-command">npm install react-router</span>
                  <span className="log-desc">npm install react-router</span>
                </div>
              </div>

              {/* Шаг 4 */}
              <div className="log-entry">
                <div className="log-icon git-commit-icon">
                  <VscGitCommit size={18} />
                </div>
                <div className="log-info">
                  <span className="log-command">git commit</span>
                  <span className="log-desc">git commit -m "init"</span>
                </div>
              </div>

              {/* Шаг 5 */}
              <div className="log-entry">
                <div className="log-icon build-icon">
                  <BiBox size={18} />
                </div>
                <div className="log-info">
                  <span className="log-command">npm run build</span>
                  <span className="log-desc">npm run build</span>
                </div>
              </div>

              {/* Шаг 6 */}
              <div className="log-entry">
                <div className="log-icon deploy-icon">
                  <BiCloudUpload size={18} />
                </div>
                <div className="log-info">
                  <span className="log-command">{">_"} deploy to vercel</span>
                  <span className="log-desc">deploy to vercel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
