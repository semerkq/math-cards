import { BrowserRouter, Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MainLayout } from "./components/MainLayout";
import { NotFoundPage } from "./pages/NotFoundPage";
import { QuestionPage } from "./pages/QuestionPage";
import { AddQuestionPageLazy } from "./pages/AddQuestionPage";
import { EditQuestionPageLazy } from "./pages/EditQuestionPage";
import { AuthProvider } from "./auth";
import { useAuth } from "./hooks/useAuth";
import { ForbiddenPage } from "./pages/ForbiddenPage";
import { ThemeProvider } from "./theme/ThemeProvider";

const ProtectedRoutes = () => {
  const { isAuth } = useAuth();
  const location = useLocation();

  return isAuth ? <Outlet /> : <Navigate to="/forbidden" state={{ from: location.pathname }} replace />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/question/:id" element={<QuestionPage />} />
              <Route path="/forbidden" element={<ForbiddenPage />} />

              <Route element={<ProtectedRoutes />}>
                <Route path="/addquestion" element={<AddQuestionPageLazy />} />
                <Route path="/editquestion/:id" element={<EditQuestionPageLazy />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
