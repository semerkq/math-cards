import cls from "./QuestionCard.module.css";
import { Button } from "../Button";

export const QuestionCard = (props) => {
  return (
    <div className={cls.questionCard}>
      <div className={cls.labelsWrapper}>
        <div>{props.cards.metadata.difficulty}</div>
        <div>{props.cards.metadata.status}</div>
      </div>
      <h5 className={cls.cardTitle}>{props.cards.preview.title}</h5>
      <p className={cls.cardQuestion}>{props.cards.preview.question}</p>
      <div className={cls.shortAnswerWrapper}>
        <label>Короткий ответ:</label>
        <p className={cls.shortAnswer}>{props.cards.preview["short_answer"]} </p>
      </div>
      <Button>Подробнее</Button>
    </div>
  );
};
