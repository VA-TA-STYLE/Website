import React from "react";
import { useState } from "react";
import "../styles/SwitchLanguage.css"
import UKFlag from "../assets/flags/UKFlag.svg";
import RussiaFlag from "../assets/flags/RussiaFlag.svg";

export default function Switch({ language, setLanguage }) {
  return (
    <div className="switch-language">
      <button
        className={language === "eng" ? "active" : ""}
        onClick={() => setLanguage("eng")}
      >
        <img src={UKFlag} alt="English" />
      </button>

      <button
        className={language === "rus" ? "active" : ""}
        onClick={() => setLanguage("rus")}
      >
        <img src={RussiaFlag} alt="Russian" />
      </button>
    </div>
  );
}
