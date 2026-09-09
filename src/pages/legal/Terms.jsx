import React from "react";
import "../../styles/Privacy.css";

const translations = {
  eng: {
    title: "Terms of Use",
    date: "Last updated: September 2026",
    sec1Title: "1. Acceptance of Terms",
    sec1Text:
      "By accessing and browsing this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this site.",
    sec2Title: "2. Intellectual Property & Ownership",
    sec2Text:
      "All source code, design architecture, custom components, and text presented on this website are the intellectual property of the site creator (VATaSTYLE). Unauthorized copying, reproduction, or commercial redistribution of the source code is strictly prohibited. Visual assets and illustrations may include AI-generated content or open-source materials used for demonstration purposes.",
    sec3Title: "3. Acceptable Use & Scraping",
    sec3Text:
      "You agree to use this website only for lawful purposes. Automated scraping, data harvesting, or extracting content from this site for commercial purposes, machine learning training, or malicious activities without explicit permission is strictly forbidden.",
    sec4Title: "4. Third-Party Content & APIs",
    sec4Text:
      "This website may feature movie information, images, or links pointing to external platforms (such as GitHub, Telegram, or third-party media APIs). All external trademarks, movie titles, and posters belong to their respective copyright holders.",
    sec5Title: "5. Disclaimer of Warranties",
    sec5Text:
      "This website is provided on an 'as is' and 'as available' basis for personal portfolio and educational purposes. I make no representations or warranties of any kind, express or implied, regarding the operation or availability of the site.",
    sec6Title: "6. Changes to Terms",
    sec6Text:
      "I reserve the right to modify these terms at any time. Changes will be posted directly on this page, and your continued use of the platform constitutes your agreement to the updated terms.",
  },
  rus: {
    title: "Условия использования",
    date: "Последнее обновление: Сентябрь 2026 г.",
    sec1Title: "1. Принятие условий",
    sec1Text:
      "Посещая и просматривая данный веб-сайт, вы принимаете и соглашаетесь соблюдать условия и положения настоящего соглашения. Если вы не согласны следовать данным правилам, пожалуйста, воздержитесь от использования сайта.",
    sec2Title: "2. Интеллектуальная собственность и авторские права",
    sec2Text:
      "Весь исходный код, архитектура дизайна, кастомные компоненты и текст, представленные на этом веб-сайте, являются интеллектуальной собственностью автора проекта (VATaSTYLE). Несанкционированное копирование, воспроизведение или коммерческое распространение исходного кода строго запрещены. Визуальные материалы и иллюстрации могут включать контент, сгенерированный нейросетями, или материалы из открытых источников, используемые в демонстрационных целях.",
    sec3Title: "3. Допустимое использование и запрет парсинга",
    sec3Text:
      "Вы соглашаетесь использовать данный сайт исключительно в законных целях. Категорически запрещается автоматизированный сбор данных (парсинг), извлечение контента в коммерческих целях, использование материалов для обучения моделей машинного обучения (ИИ) или осуществление вредоносной активности без прямого разрешения автора.",
    sec4Title: "4. Сторонний контент и API",
    sec4Text:
      "На сайте могут отображаться данные о фильмах, изображения или ссылки, ведущие на внешние ресурсы (например, GitHub, Telegram или сторонние медиа-API). Все внешние торговые марки, названия фильмов и постеры принадлежат их законным правообладателям.",
    sec5Title: "5. Ограничение ответственности",
    sec5Text:
      "Этот веб-сайт предоставляется на условиях «как есть» (as is) исключительно в качестве личного портфолио и образовательного проекта. Автор не дает никаких гарантий относительно бесперебойной работы сайта или абсолютной точности всей размещенной информации.",
    sec6Title: "6. Изменение условий",
    sec6Text:
      "Я оставляю за собой право изменять настоящие условия в любое время. Все изменения публикуются на этой странице, а продолжение использования сайта означает ваше автоматическое согласие с обновленной версией.",
  },
};

export default function Terms({ language }) {
  const t = translations[language] || translations.eng;

  return (
    <div className="legal-container">
      <h1>{t.title}</h1>
      <p className="legal-date">{t.date}</p>

      <section className="legal-section">
        <h2>{t.sec1Title}</h2>
        <p>{t.sec1Text}</p>
      </section>

      <section className="legal-section">
        <h2>{t.sec2Title}</h2>
        <p>{t.sec2Text}</p>
      </section>

      <section className="legal-section">
        <h2>{t.sec3Title}</h2>
        <p>{t.sec3Text}</p>
      </section>

      <section className="legal-section">
        <h2>{t.sec4Title}</h2>
        <p>{t.sec4Text}</p>
      </section>

      <section className="legal-section">
        <h2>{t.sec5Title}</h2>
        <p>{t.sec5Text}</p>
      </section>

      <section className="legal-section">
        <h2>{t.sec6Title}</h2>
        <p>{t.sec6Text}</p>
      </section>
    </div>
  );
}
