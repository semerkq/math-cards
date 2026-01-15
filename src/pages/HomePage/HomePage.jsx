import { QuestionCard } from "../../components/QuestionCard";
import cls from "./HomePage.module.css";
import { API_URL } from "../../constants";
import { useEffect, useState } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";

export const HomePage = () => {
  const [cardsInformation, setCardsInformation] = useState([]);
  const [getQuestions, isLoading] = useFetch(async (arg) => {
    const response = await fetch(`${API_URL}/${arg}`);
    const questions = await response.json();

    setCardsInformation(questions);
    return questions;
  });

  useEffect(() => {
    getQuestions("cards");
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <QuestionCardList cardsInformation={cardsInformation} />
    </>
  );
};
