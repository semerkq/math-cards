import { useContext } from "react";
import { AuthContext } from "../components/auth";

export const useAuth = () => {
  return useContext(AuthContext);
};
