import cls from "./Header.module.css";
import headerIcon from "../../assets/icon.svg";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AUTH_STORAGE } from "../../constants";
import { ThemeToggler } from "../../features/ThemeToggler/ThemeToggler";

export const Header = () => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useAuth();

  const onClickHandler = () => {
    setIsAuth(!isAuth);
    localStorage.setItem(AUTH_STORAGE, !isAuth);
  };

  return (
    <header className={cls.header}>
      <div className={cls.iconAndTitleWrapper} onClick={() => navigate("/")}>
        <img src={headerIcon} alt="logo" />
        <span>MathCards</span>
      </div>
      <div className={cls.btnsWrapper}>
        <ThemeToggler />
        {isAuth && <Button onClick={() => navigate("/addquestion")}>Добавить</Button>}
        <Button onClick={onClickHandler} isActive={!isAuth}>
          {isAuth ? "Выйти" : "Войти"}
        </Button>
      </div>
    </header>
  );
};
