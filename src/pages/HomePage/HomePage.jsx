import { QuestionCard } from "../../components/QuestionCard";
import cls from "./HomePage.module.css";
import { API_URL } from "../../constants";
import { useEffect, useState } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { delayFn } from "../../helpers/delayFn";

export const HomePage = () => {
  const [cardsInformation, setCardsInformation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getQuestions = async () => {
    try {
      setIsLoading(true);
      await delayFn();
      const response = await fetch(`${API_URL}/cards`);
      const questions = await response.json();

      setCardsInformation(questions);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <QuestionCardList cardsInformation={cardsInformation} />
    </>
  );
};
