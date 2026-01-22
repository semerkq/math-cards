import cls from "./QuestionCard.module.css";
import { Button } from "../Button";
import { Badges } from "../Badges";

export const QuestionCard = (props) => {
  const difficultyVariant = props.cards.difficulty;
  const statusVariant = props.cards.status;

  return (
    <div className={cls.questionCard}>
      <div className={cls.labelsWrapper}>
        <Badges variant={difficultyVariant}>
          {props.cards.difficulty === 1 ? "легко" : props.cards.difficulty === 2 ? "средне" : "сложно"}
        </Badges>
        <Badges variant={statusVariant}>{props.cards.status ? "завершено" : "в процессе"}</Badges>
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
