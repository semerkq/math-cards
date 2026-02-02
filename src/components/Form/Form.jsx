import { Button } from "../Button";
import { SortSelect } from "../SortSelect";
import cls from "./Form.module.css";

export const Form = ({ formAction, value, onChange, formState, isDisabled, buttonText }) => {
  return (
    <form action={formAction} className={cls.form}>
      <div className={cls.formControl}>
        <input type="text" name="cardId" defaultValue={formState.id} hidden />
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
          value={value}
          onChange={onChange}
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
      <Button isDisabled={isDisabled}>{buttonText}</Button>
    </form>
  );
};
