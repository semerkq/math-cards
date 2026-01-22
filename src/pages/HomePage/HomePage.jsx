import cls from "./HomePage.module.css";
import { API_URL, SORT_OPTIONS } from "../../constants";
import { useEffect, useState } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";
import { SortSelect } from "../../components/SortSelect";

export const HomePage = () => {
  const [cardsInformation, setCardsInformation] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");

  const [getQuestions, isLoading, error] = useFetch(async (arg) => {
    const response = await fetch(`${API_URL}/${arg}`);
    const questions = await response.json();

    setCardsInformation(questions);
    return questions;
  });

  const cards = cardsInformation.filter((card) => {
    return card.preview.title.toLowerCase().trim().includes(searchValue.toLowerCase().trim());
  });

  useEffect(() => {
    getQuestions(`cards?${sortSelectValue}`);
  }, [sortSelectValue]);

  const searchInputHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const sortSelectHandler = (e) => {
    setSortSelectValue(e.target.value);
  };

  return (
    <>
      <div className={cls.controlsContainer}>
        <SearchInput onChange={searchInputHandler} value={searchValue} />
        <SortSelect onChange={sortSelectHandler} value={sortSelectValue} options={SORT_OPTIONS} />
      </div>

      {error && <p>{error}</p>}
      {isLoading && <Loader />}
      {cards.length === 0 && <p className={cls.noCardsInfo}>Нет таких карточек...</p>}
      <QuestionCardList cardsInformation={cards} />
    </>
  );
};
