import cls from "./HomePage.module.css";
import { API_URL } from "../../constants";
import { useEffect, useState } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput/SearchInput";

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
        <select className={cls.select} onChange={sortSelectHandler} value={sortSelectValue}>
          <option value="">Сортировать по</option>
          <hr />
          <option value="_sort=difficulty">возрастанию сложности</option>
          <option value="_sort=-difficulty">убыванию сложности</option>
          <option value="_sort=status">выполненным задачам</option>
          <option value="_sort=-status">невыполненным задачам</option>
        </select>
      </div>

      {error && <p>{error}</p>}
      {isLoading && <Loader />}
      {cards.length === 0 && <p className={cls.noCardsInfo}>Нет таких карточек...</p>}
      <QuestionCardList cardsInformation={cards} />
    </>
  );
};
