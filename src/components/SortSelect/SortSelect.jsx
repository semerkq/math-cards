import cls from "./SortSelect.module.css";

export const SortSelect = (props) => {
  return (
    <select className={cls.select} onChange={props.onChange} value={props.value}>
      <option value="">Сортировать по</option>
      <hr />
      {props.options.map((option) => {
        return (
          <option value={option.value} key={option.key}>
            {option.text}
          </option>
        );
      })}
    </select>
  );
};
