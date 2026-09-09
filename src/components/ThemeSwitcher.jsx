import "../styles/ThemeSwitcher.css"
export default function ThemeSwitcher({ theme, toggleTheme }) {
  return (
    <div className="switch-theme">
      <button onClick={toggleTheme}>
        {theme === "dark" ? "☀ " : "☾ "}
        <span className="theme-text">
          {theme === "dark" ? "Light" : "Dark"}
        </span>
      </button>
    </div>
  );
}