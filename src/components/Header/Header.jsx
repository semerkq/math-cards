import cls from "./Header.module.css";
import headerIcon from "../../assets/icon.svg";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={cls.header}>
      <div className={cls.iconAndTitleWrapper} onClick={() => navigate("/")}>
        <img src={headerIcon} alt="logo" />
        <span>MathCards</span>
      </div>
      <div className={cls.btnsWrapper}>
        <Button onClick={() => navigate("/addquestion")}>Добавить</Button>
        <Button>Войти</Button>
      </div>
    </header>
  );
};
