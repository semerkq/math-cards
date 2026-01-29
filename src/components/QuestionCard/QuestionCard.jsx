import cls from "./QuestionCard.module.css";
import { Button } from "../Button";
import { Badges } from "../Badges";
import { useNavigate } from "react-router-dom";

export const QuestionCard = (props) => {
  const difficultyVariant = props.cards.difficulty;
  const statusVariant = props.cards.status;
  const navigate = useNavigate();

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
      <Button onClick={() => navigate(`/question/${props.cards.id}`)}>Подробнее</Button>
    </div>
  );
};
