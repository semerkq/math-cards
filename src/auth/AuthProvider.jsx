import { createContext, useState } from "react";
import { AUTH_STORAGE } from "../constants";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const isAuthFromLocalStorage = JSON.parse(localStorage.getItem(AUTH_STORAGE));
  const [isAuth, setIsAuth] = useState(isAuthFromLocalStorage);

  return <AuthContext.Provider value={{ isAuth, setIsAuth }}>{children}</AuthContext.Provider>;
};
