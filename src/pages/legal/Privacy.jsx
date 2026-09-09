import React from "react";
import "../../styles/Privacy.css";

const translations = {
  eng: {
    title: "Privacy Policy",
    date: "Last updated: September 2026",
    sec1Title: "1. General Overview",
    sec1Text: "Welcome to my personal portfolio and project platform. I respect the privacy of every visitor and strive to ensure maximum transparency regarding data processing. This Privacy Policy explains what data is handled when using this website.",
    sec2Title: "2. Data Collection",
    sec2Text: "This website is a static project created for educational and demonstration purposes. The site does not contain registration systems, feedback forms, or databases for collecting direct personal information (such as names, email addresses, or phone numbers). However, anonymous statistical data is collected automatically via third-party analytics services.",
    sec3Title: "3. Use of LocalStorage",
    sec3Text: "The site uses your browser's local storage (localStorage) exclusively to save your individual interface preferences: the selected theme (dark/light), preferred interface language, and your cookie banner consent. This information is stored locally on your device only and is used solely for your convenience upon return visits.",
    sec4Title: "4. Web Analytics and Hosting Logs",
    sec4Text: "This website uses Yandex Metrica to collect anonymous statistics about traffic and user behavior to improve the site's performance. Additionally, as the site is hosted on GitHub Pages, the provider automatically collects standard technical data (server logs) to ensure platform security. This data may include your IP address, browser type, time of visit, and requested pages.",
    sec5Title: "5. External Links",
    sec5Text: "The contact and project sections may contain links to third-party resources (such as GitHub, Telegram). By following these links, you leave my site. I am not responsible for the privacy policies or content of third-party services and recommend reviewing their internal rules.",
    sec6Title: "6. Changes to This Policy",
    sec6Text: "This Privacy Policy may be updated as the project evolves. All changes are published on this page with the date of the last update indicated. By continuing to use the site after changes are made, you automatically agree to the updated version.",
  },
  rus: {
    title: "Политика конфиденциальности",
    date: "Последнее обновление: Сентябрь 2026 г.",
    sec1Title: "1. Общие положения",
    sec1Text: "Добро пожаловать на мое личное портфолио и проект-платформу. Я уважительно отношусь к конфиденциальности каждого посетителя и стремлюсь обеспечить максимальную прозрачность в вопросах обработки информации. Настоящая Политика конфиденциальности объясняет, какие данные затрагиваются при использовании данного веб-сайта.",
    sec2Title: "2. Сбор данных",
    sec2Text: "Данный веб-сайт является статическим проектом, созданным в образовательных и демонстрационных целях. Сайт не содержит систем регистрации, форм обратной связи или баз данных для сбора прямой личной информации (имен, адресов электронной почты или номеров телефонов). Однако в автоматическом режиме собираются обезличенные статистические данные через сервисы аналитики.",
    sec3Title: "3. Использование LocalStorage (Локальное хранилище)",
    sec3Text: "Сайт использует локальное хранилище вашего браузера (localStorage) исключительно для сохранения ваших индивидуальных настроек интерфейса: выбранной темы (темная/светлая), языка и согласия на скрытие уведомления о cookie. Эта информация хранится локально только на вашем устройстве и используется исключительно для вашего удобства.",
    sec4Title: "4. Веб-аналитика и технические логи",
    sec4Text: "На сайте используется сервис Яндекс Метрика для сбора анонимной статистики о посещаемости и поведении пользователей с целью улучшения работы проекта. Кроме того, поскольку веб-сайт размещен на GitHub Pages, хостинг-провайдер автоматически собирает стандартные технические логи для обеспечения безопасности. Эти данные могут включать IP-адрес, тип браузера, время посещения и просмотренные страницы.",
    sec5Title: "5. Ссылки на сторонние ресурсы",
    sec5Text: "В разделе контактов и проектов могут содержаться ссылки на сторонние ресурсы (например, GitHub, Telegram). Переходя по данным ссылкам, вы покидаете мой сайт. Я не несу ответственности за политику конфиденциальности или контент сторонних сервисов и рекомендую ознакомиться с их внутренними правилами.",
    sec6Title: "6. Изменения в политике",
    sec6Text: "Настоящая Политика конфиденциальности может обновляться по мере развития проекта. Все изменения публикуются на этой странице с указанием даты последнего обновления. Продолжая использовать сайт после внесения изменений, вы автоматически соглашаетесь с обновленной версией.",
  },
};
export default function PrivacyPolicy({ language }) {
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