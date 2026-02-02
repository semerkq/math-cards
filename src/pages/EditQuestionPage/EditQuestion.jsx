import { useActionState, useEffect, useState } from "react";
import { Form } from "../../components/Form";
import cls from "./EditQuestionPage.module.css";
import { API_URL } from "../../constants";
import { formatDate } from "../../helpers/formatDate";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Loader } from "../../components/Loader";
import { delayFn } from "../../helpers/delayFn";

export const EditQuestion = ({ initialState = {} }) => {
  const [selectValue, setSelectValue] = useState("");
  const navigate = useNavigate();

  const editCardAction = async (_curr, formData) => {
    try {
      delayFn();

      const newQuestion = Object.fromEntries(formData);
      const isClearCard = formState.clearCard;
      const cardId = newQuestion.cardId;

      const response = await fetch(`${API_URL}/cards/${cardId}`, {
        method: "PATCH",
        body: JSON.stringify({
          preview: { title: newQuestion.title, question: newQuestion.question, short_answer: newQuestion["short_answer"] },
          details: {
            full_theorem: newQuestion["full_theorem"],
            conditions: newQuestion.conditions.trim().length ? newQuestion.conditions.trim().split(",") : [],
            example: { task: newQuestion.task, solution: newQuestion.solution, explanation: newQuestion.explanation },
            last_updated: formatDate(Date.now()),
          },
          difficulty: Number(newQuestion.difficulty),
          status: false,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      toast.success("Данные успешно отправлены");

      return isClearCard ? {} : data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [formState, formAction, isPending] = useActionState(editCardAction, { ...initialState, clearCard: false });

  const onSelectChangeHandler = (e) => {
    setSelectValue(e.target.value);
  };

  useEffect(() => {
    formState.difficulty !== null ? setSelectValue(formState.difficulty) : setSelectValue("");
  }, [formState.difficulty]);

  const [removeCard, isCardRemoving] = useFetch(async () => {
    const response = await fetch(`${API_URL}/cards/${formState.id}`, {
      method: "DELETE",
    });

    response.ok ? toast.success("Карточка была успешно удалена") : toast.error(response.statusText);
  });

  const removeCardHandler = () => {
    if (confirm("Вы уверены?")) {
      removeCard();
      navigate("/");
    } else {
      return;
    }
  };
  return (
    <>
      {(isPending || isCardRemoving) && <Loader />}
      <h1 className={cls.title}>Редактировать вопрос</h1>
      <div className={cls.formContainer}>
        <Form
          formState={formState}
          formAction={formAction}
          isDisabled={isPending || isCardRemoving}
          buttonText="Редактировать"
          onChange={onSelectChangeHandler}
          value={selectValue}
        />
        <button className={cls.removeBtn} onClick={removeCardHandler}>
          X
        </button>
      </div>
    </>
  );
};
