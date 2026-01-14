import cls from "./QuestionCardList.module.css";
import { QuestionCard } from "../QuestionCard";

export const QuestionCardList = (props) => {
  return (
    <div className={cls.listWrapper}>
      {props.cardsInformation.map((card) => {
        return <QuestionCard cards={card} key={card.id} />;
      })}
    </div>
  );
};
