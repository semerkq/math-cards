import { useNavigate, useParams } from "react-router-dom";
import { Badges } from "../../components/Badges";
import { Button } from "../../components/Button";
import cls from "./QuestionPage.module.css";
import { API_URL } from "../../constants";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useId, useState } from "react";
import { Loader, SmallLoader } from "../../components/Loader";

export const QuestionPage = () => {
  const [cards, setCards] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const checkboxId = useId();

  const difficultyVariant = () => {
    return cards.difficulty;
  };
  const statusVariant = () => {
    return cards.status;
  };

  const [fetchCard, isCardLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/cards/${id}`);
    const data = await response.json();

    setCards(data);
    return data;
  });

  const [updateCard, isCardUpdating] = useFetch(async (isChecked) => {
    const response = await fetch(`${API_URL}/cards/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: isChecked }),
    });
    const data = await response.json();

    setCards(data);
    return data;
  });

  useEffect(() => {
    fetchCard();
  }, []);

  useEffect(() => {
    cards !== null && setIsChecked(cards.status);
  }, [cards]);

  const checkboxOnChangeHandler = () => {
    setIsChecked(!isChecked);
    updateCard(!isChecked);
  };

  return (
    <>
      {isCardLoading && <Loader />}
      {cards !== null && (
        <div className={cls.questionCard}>
          <div className={cls.labelsWrapper}>
            <Badges variant={difficultyVariant()}>
              {cards.difficulty === 1 ? "легко" : cards.difficulty === 2 ? "средне" : "сложно"}
            </Badges>
            <Badges variant={statusVariant()}>{cards.status ? "завершено" : "в процессе"}</Badges>
            <span className={cls.editDate}>Обновлено: {cards.details.last_updated}</span>
          </div>

          <h5 className={cls.cardTitle}>{cards.preview.title}</h5>

          <p className={cls.cardQuestion}>{cards.preview.question}</p>

          <div className={cls.answerWrapper}>
            <label>Ответ:</label>
            <p className={cls.answer}>{cards.details["full_theorem"]} </p>
          </div>

          <div className={cls.conditionsWrapper}>
            <label>Условия применения:</label>
            <ul className={cls.conditions}>
              {cards.details.conditions.map((c, i) => {
                return <li key={i}>{c}</li>;
              })}
            </ul>
          </div>

          <div className={cls.exampleWrapper}>
            <label>Пример:</label>
            <p className={cls.example}>{cards.details.example.task} </p>
          </div>

          <div className={cls.solutionWrapper}>
            <label>Решение:</label>
            <p className={cls.solution}>{cards.details.example.solution} </p>
          </div>

          <div className={cls.explanationWrapper}>
            <label>Объяснение:</label>
            <p className={cls.explanation}>{cards.details.example.explanation} </p>
          </div>

          <label htmlFor={checkboxId} className={cls.cardCheckbox}>
            <input
              type="checkbox"
              id={checkboxId}
              className={cls.checkbox}
              checked={isChecked}
              onChange={checkboxOnChangeHandler}
            />
            <span>Завершено</span>
            {isCardUpdating && <SmallLoader />}
          </label>

          <Button onClick={() => navigate(`/question/${cards.id}`)} isDisabled={isCardUpdating}>
            Редактировать
          </Button>
          <Button onClick={() => navigate(`/`)} isDisabled={isCardUpdating}>
            Назад
          </Button>
        </div>
      )}
    </>
  );
};
