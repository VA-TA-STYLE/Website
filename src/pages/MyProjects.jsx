import React from "react";
import "../styles/MyProjects.css";
import ProjectOnePhoto from "../assets/projects/ProjectOnePhoto.png";
import ProjectOnePhotoLight from "../assets/projects/ProjectOnePhotoLight.png";
const translations = {
  eng: {
    title: "My Website",
    description:
      "This is my first full-fledged project. I created it to learn React and improve my web development skills in general. I've made a few other websites before, but they died shortly after birth.",
    technologies: "TECHNOLOGIES USED: ",
    viewButton: "View Code",
  },

  rus: {
    title: "Мой Веб-сайт",
    description:
      "Это мой первый полноценный проект. Я создал его, чтобы изучить React и в целом улучшить свои навыки веб-разработки. До этого я создавал и другие сайты, но они умерли вскоре после рождения.",
    technologies: "ИСПОЛЬЗОВАННЫЕ ТЕХНОЛОГИИ: ",
      viewButton: "Посмотреть код",
  },
};
export default function MyProjects({ language, theme }) {
  const t = translations[language] || translations.eng;
  const techStack = ["HTML5", "CSS3", "JavaScript", "React", "React Router"];
  return (
    <main className="project-item">
      <div className="project-info">
        <h1>{t.title}</h1>

        <p className="project-description">{t.description}</p>

        <div className="technologies">
          <p className="technologies-title">{t.technologies}</p>

          <div className="technology-list">
            {techStack.map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="project-buttons">
          <a href="#">{t.viewButton} </a>
        </div>
      </div>

      <div
        className={`project-image ${theme === "light" ? "light-mode-img" : ""}`}
      >
        <img
          src={theme === "dark" ? ProjectOnePhoto : ProjectOnePhotoLight}
          alt="Project"
        />
      </div>
    </main>
  );
}
