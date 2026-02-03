import { THEME_STORAGE } from "../../constants";
import { useTheme } from "../../hooks/useTheme";
import cls from "./ThemeToggler.module.css";

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  const ChangeThemeHandler = (e) => {
    const updateTheme = e.target.checked ? "dark" : "light";
    localStorage.setItem(THEME_STORAGE, updateTheme);

    setTheme(updateTheme);
  };

  return (
    <label htmlFor="theme" className={cls.theme}>
      <span className={cls.themeToggleWrap}>
        <input
          id="theme"
          className={cls.themeToggle}
          type="checkbox"
          role="switch"
          name="theme"
          value="dark"
          checked={theme === "dark"}
          onChange={ChangeThemeHandler}
        />
        <span className={cls.themeFill}></span>
        <span className={cls.themeIcon}>
          <span className={cls.themeIconPart}></span>
          <span className={cls.themeIconPart}></span>
          <span className={cls.themeIconPart}></span>
          <span className={cls.themeIconPart}></span>
          <span className={cls.themeIconPart}></span>
          <span className={cls.themeIconPart}></span>
          <span className={cls.themeIconPart}></span>
          <span className={cls.themeIconPart}></span>
          <span className={cls.themeIconPart}></span>
        </span>
      </span>
    </label>
  );
};
