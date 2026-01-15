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
    getQuestions("cards");
  }, []);

  const searchInputHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className={cls.controlsContainer}>
        <SearchInput onChange={searchInputHandler} value={searchValue} />
      </div>

      {error && <p>{error}</p>}
      {isLoading && <Loader />}
      <QuestionCardList cardsInformation={cards} />
    </>
  );
};
