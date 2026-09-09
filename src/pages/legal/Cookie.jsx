import React from "react";
import "../../styles/Privacy.css";

const translations = {
  eng: {
    title: "Cookie Policy",
    date: "Last updated: September 2026",
    sec1Title: "1. What Are Cookies?",
    sec1Text:
      "Cookies are small text files stored on your device by websites you visit. They are widely used to make websites work efficiently and to provide information to site owners.",
    sec2Title: "2. Web Analytics and Third-Party Cookies",
    sec2Text:
      "This website uses Yandex Metrica, a web analytics service provided by Yandex. It uses cookies to collect anonymous statistics about site traffic and user behavior (such as pages visited and time spent on the site). This helps to improve the website's performance and design. We do not use this data to identify you personally.",
    sec3Title: "3. Use of LocalStorage",
    sec3Text:
      "In addition to analytics cookies, this site uses your browser's local storage (localStorage) exclusively to remember your personal interface preferences: your choice of theme (dark/light), preferred language, and your consent to hide the cookie banner. This preference data remains entirely on your device.",
    sec4Title: "4. Managing and Disabling Cookies",
    sec4Text:
      "You can control and manage cookies through your browser settings. You can also use the Yandex Metrica opt-out add-on to prevent data collection. Please note that clearing your browser's local storage will reset your interface preferences upon your next visit.",
    sec5Title: "5. Changes to This Policy",
    sec5Text:
      "This Cookie Policy may be updated periodically to reflect changes in technical implementation. Any updates will be posted directly on this page with a revised modification date.",
  },
  rus: {
    title: "Политика использования Cookie",
    date: "Последнее обновление: Сентябрь 2026 г.",
    sec1Title: "1. Что такое файлы Cookie?",
    sec1Text:
      "Cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве посещаемыми веб-сайтами. Они широко используются для того, чтобы сайты работали эффективно и предоставляли аналитическую информацию их владельцам.",
    sec2Title: "2. Веб-аналитика и сторонние файлы Cookie",
    sec2Text:
      "На сайте используется Яндекс Метрика — сервис веб-аналитики, предоставляемый компанией ООО «ЯНДЕКС». Он использует файлы cookie для сбора анонимной статистики о посещаемости и поведении пользователей (например, просмотренные страницы и время на сайте). Это помогает улучшать работу проекта. Мы не используем эти данные для установления вашей личности.",
    sec3Title: "3. Использование LocalStorage",
    sec3Text:
      "Помимо аналитических файлов cookie, сайт использует локальное хранилище браузера (localStorage) для сохранения ваших индивидуальных настроек: темы оформления (темная/светлая), языка и согласия на скрытие уведомления о cookie. Эти данные хранятся локально только на вашем устройстве.",
    sec4Title: "4. Управление и отключение",
    sec4Text:
      "Вы можете управлять настройками файлов cookie через параметры своего браузера, а также установить блокировщик Яндекс Метрики для отказа от сбора статистики. Обратите внимание, что очистка локального хранилища сбросит ваши персональные настройки интерфейса при следующем посещении.",
    sec5Title: "5. Изменения в политике",
    sec5Text:
      "Настоящая Политика использования Cookie может периодически обновляться в связи с техническими изменениями проекта. Все обновления публикуются на этой странице с указанием актуальной даты.",
  },
};

export default function CookiePolicy({ language }) {
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
    </div>
  );
}
