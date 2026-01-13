import cls from "./Header.module.css";
import headerIcon from "../../assets/icon.svg";
import { Button } from "../Button/Button";

export const Header = () => {
  return (
    <header className={cls.header}>
      <div className={cls.iconAndTitleWrapper}>
        <img src={headerIcon} alt="logo" />
        <span>MathCards</span>
      </div>
      <div className={cls.btnsWrapper}>
        <Button>Добавить</Button>
        <Button>Войти</Button>
      </div>
    </header>
  );
};
