import cls from "./AddQuestionPage.module.css";
import { useActionState, useEffect, useState } from "react";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";
import { Button } from "../../components/Button";
import { SortSelect } from "../../components/SortSelect";
import { Loader } from "../../components/Loader";
import { delayFn } from "../../helpers/delayFn";

export const AddQuestionPage = () => {
  const [selectValue, setSeclectValue] = useState("");

  const createCardAction = async (_currState, formData) => {
    try {
      await delayFn();
      const newQuestion = Object.fromEntries(formData);
      const isClearForm = newQuestion.clearForm;
      const response = await fetch(`${API_URL}/cards`, {
        method: "POST",
        body: JSON.stringify({
          preview: { title: newQuestion.title, question: newQuestion.question, short_answer: newQuestion["short_answer"] },
          details: {
            full_theorem: newQuestion["full_theorem"],
            conditions: newQuestion.conditions.trim().length ? newQuestion.conditions.trim().split(",") : [],
            example: { task: newQuestion.task, solution: newQuestion.solution, explanation: newQuestion.explanation },
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
      return isClearForm ? {} : data;
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  };

  const selectChangeHandler = (e) => {
    setSeclectValue(e.target.value);
  };

  const [formState, formAction, isPending] = useActionState(createCardAction, { clearForm: true });

  useEffect(() => {
    formState.difficulty !== null ? setSeclectValue(formState.difficulty) : setSeclectValue("");
  }, [formState]);

  return (
    <>
      {isPending && <Loader />}
      <h1 className={cls.title}>Добавить вопрос</h1>
      <div className={cls.formContainer}>
        <form action={formAction} className={cls.form}>
          <div className={cls.formControl}>
            <label htmlFor="titleField">Название:</label>
            <textarea
              name="title"
              id="titleField"
              placeholder="введите название..."
              defaultValue={formState.preview?.title}
              rows="2"
              cols="30"
              required
            />
          </div>
          <div className={cls.formControl}>
            <label htmlFor="questionField">Вопрос:</label>
            <textarea
              name="question"
              id="questionField"
              placeholder="введите вопрос..."
              defaultValue={formState.preview?.question}
              rows="2"
              cols="30"
              required
            />
          </div>
          <div className={cls.formControl}>
            <label htmlFor="shortAnswerField">Ответ:</label>
            <textarea
              name="short_answer"
              id="shortAnswerField"
              placeholder="введите ответ..."
              defaultValue={formState.preview?.short_answer}
              rows="3"
              cols="30"
              required
            />
          </div>
          <div className={cls.formControl}>
            <label htmlFor="fullTheoremField">Теорема:</label>
            <textarea
              name="full_theorem"
              id="fullTheoremField"
              placeholder="введите теорему..."
              defaultValue={formState.details?.full_theorem}
              rows="4"
              cols="30"
              required
            />
          </div>
          <div className={cls.formControl}>
            <label htmlFor="conditionsField">Условия применения:</label>
            <textarea
              name="conditions"
              id="conditionsField"
              placeholder="введите условия применения, разделенные запятой..."
              defaultValue={formState.details?.conditions}
              rows="5"
              cols="30"
              required
            />
          </div>
          <div className={cls.formControl}>
            <label htmlFor="taskField">Пример задания:</label>
            <textarea
              name="task"
              id="taskField"
              placeholder="введите пример задания..."
              defaultValue={formState.details?.example?.task}
              rows="5"
              cols="30"
              required
            />
          </div>
          <div className={cls.formControl}>
            <label htmlFor="solutionField">Решение:</label>
            <textarea
              name="solution"
              id="solutionField"
              placeholder="введите решение задания..."
              defaultValue={formState.details?.example?.solution}
              rows="5"
              cols="30"
              required
            />
          </div>
          <div className={cls.formControl}>
            <label htmlFor="explanationField">Объяснение решения:</label>
            <textarea
              name="explanation"
              id="explanationField"
              placeholder="введите объяснение решения..."
              defaultValue={formState.details?.example?.explanation}
              rows="4"
              cols="30"
              required
            />
          </div>
          <div className={cls.formControl}>
            <label htmlFor="difficultyField">Уровень сложности:</label>
            <SortSelect
              options={[
                { value: "1", text: "1", key: 1 },
                { value: "2", text: "2", key: 2 },
                { value: "3", text: "3", key: 3 },
              ]}
              isDisabled={true}
              firstOptionText="Уровень"
              name="difficulty"
              id="difficultyField"
              value={selectValue}
              onChange={selectChangeHandler}
            />
          </div>
          <label htmlFor="clearFormField" className={cls.clearFormControl}>
            <input
              type="checkbox"
              name="clearForm"
              id="clearFormField"
              defaultChecked={formState.clearForm}
              className={cls.checkbox}
            />
            <span>Очистить форму после отправки</span>
          </label>
          <Button isDisabled={isPending}>Отправить</Button>
        </form>
      </div>
    </>
  );
};
