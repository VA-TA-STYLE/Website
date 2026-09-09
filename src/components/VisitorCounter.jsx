import { useState, useEffect } from "react";
import { doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { db } from "../assets/data/firebase";

const translations = {
  eng: {
    visitors: "Visitors",
  },

  rus: {
    visitors: "Посетители",
  },
};
export default function VisitorCounter({ language }) {
  const [visitors, setVisitors] = useState(0);
  const t = translations[language] || translations.eng;
  useEffect(() => {
    const trackVisitor = async () => {
      const visitorRef = doc(db, "siteStats", "visitors");

      // 1. Проверяем, был ли человек тут раньше
      const hasVisited = localStorage.getItem("hasVisited");

      if (!hasVisited) {
        // Если не был — прибавляем +1 в базе
        await updateDoc(visitorRef, {
          count: increment(1),
        });
        // Ставим метку в браузере, чтобы больше не прибавлять
        localStorage.setItem("hasVisited", "true");
      }

      // 2. В любом случае скачиваем актуальное число, чтобы показать на экране
      const snapshot = await getDoc(visitorRef);
      if (snapshot.exists()) {
        setVisitors(snapshot.data().count);
      }
    };

    trackVisitor();
  }, []);

  return (
    <div style={styles.text}>
      {t.visitors}: {visitors}
    </div>
  );
}

const styles = {
  text: {
    textAlign: "center",
    fontSize: "1.5rem",
    opacity: '1',
    color: 'var(--text)',
    fontWeight: "bold",

  },
};
