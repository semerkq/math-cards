import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MainLayout } from "./components/MainLayout";
import { NotFoundPage } from "./pages/NotFoundPage";
import { QuestionPage } from "./pages/QuestionPage/QuestionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/addquestion" element={<div>add</div>} />
          <Route path="/question/:id" element={<QuestionPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
