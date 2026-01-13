import cls from "./MainLayout.module.css";
import { Header } from "../Header";

export const MainLayout = () => {
  return (
    <div className={cls.mainLayout}>
      <Header />
      <main>main</main>
      <footer>footer</footer>
    </div>
  );
};
