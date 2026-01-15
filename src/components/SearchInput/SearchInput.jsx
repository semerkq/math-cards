import { useId } from "react";
import cls from "./SearchInput.module.css";
import { SearchIcon } from "../icons";

export const SearchInput = (props) => {
  const inputId = useId();
  return (
    <div className={cls.inputContainer}>
      <label htmlFor={inputId}>
        <SearchIcon className={cls.searchIcon} />
      </label>
      <input id={inputId} className={cls.input} type="text" onChange={props.onChange} value={props.value} />{" "}
    </div>
  );
};
