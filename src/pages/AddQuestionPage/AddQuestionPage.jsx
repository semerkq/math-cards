import cls from "./AddQuestionPage.module.css";
import { useActionState, useEffect, useState } from "react";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";
import { Loader } from "../../components/Loader";
import { delayFn } from "../../helpers/delayFn";
import { Form } from "../../components/Form";

const AddQuestionPage = () => {
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
  }, [formState.difficulty]);

  return (
    <>
      {isPending && <Loader />}
      <h1 className={cls.title}>Добавить вопрос</h1>
      <div className={cls.formContainer}>
        <Form
          formState={formState}
          value={selectValue}
          onChange={selectChangeHandler}
          formAction={formAction}
          isDisabled={isPending}
          buttonText="Отправить"
        />
      </div>
    </>
  );
};

export default AddQuestionPage;
