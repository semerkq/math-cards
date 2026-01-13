import cls from "./QuestionCard.module.css";
import { Button } from "../Button";

export const QuestionCard = () => {
  return (
    <div className={cls.questionCard}>
      <div className={cls.labelsWrapper}>
        <div>Easy</div>
        <div>In progress</div>
      </div>
      <h5 className={cls.cardTitle}>Теорема Виета</h5>
      <p className={cls.cardQuestion}>Чему равна сумма и произведение корней уравнения x² + px + q = 0?</p>
      <div className={cls.shortAnswerWrapper}>
        <label>Короткий ответ:</label>
        <p className={cls.shortAnswer}>x₁ + x₂ = -p, x₁·x₂ = q </p>
      </div>
      <Button>Подробнее</Button>
    </div>
  );
};
