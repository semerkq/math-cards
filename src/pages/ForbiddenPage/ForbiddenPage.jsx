import { replace, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import cls from "./ForbiddenPage.module.css";
import { useEffect } from "react";

export const ForbiddenPage = () => {
  const { isAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    isAuth && navigate(location?.state.from || "/", replace(true));
  }, [isAuth]);

  return <h2 className={cls.title}>Forbidden</h2>;
};
