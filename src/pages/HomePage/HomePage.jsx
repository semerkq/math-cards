import cls from "./HomePage.module.css";
import { API_URL, COUNT_OF_PAGES_OPTIONS, SORT_OPTIONS, DEFAULT_PER_PAGE } from "../../constants";
import { useEffect, useMemo, useRef, useState } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";
import { SortSelect } from "../../components/SortSelect";
import { Button } from "../../components/Button";
import { Pagination } from "../../components/Pagination/Pagination";

export const HomePage = () => {
  const [cardsInformation, setCardsInformation] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");
  const [searchParams, setSearchParams] = useState(`?_page=1&_per_page=${DEFAULT_PER_PAGE}`);
  const [sortSelecCountValue, setSortSelecCountValue] = useState();

  const paginationWrapperRef = useRef();

  const [getQuestions, isLoading, error] = useFetch(async (arg) => {
    const response = await fetch(`${API_URL}/${arg}`);
    const questions = await response.json();

    setCardsInformation(questions);
    return questions;
  });

  const getActiveNumber = () => {
    return cardsInformation.next === null ? cardsInformation.last : cardsInformation.next - 1;
  };

  const cards = useMemo(() => {
    if (cardsInformation?.data) {
      if (searchValue.trim()) {
        return cardsInformation.data.filter((card) => {
          return card.preview.title.toLowerCase().trim().includes(searchValue.toLowerCase().trim());
        });
      } else {
        return cardsInformation.data;
      }
    }
    return [];
  }, [cardsInformation, searchValue]);

  const pagination = useMemo(() => {
    const totalCards = cardsInformation.pages;
    return Array(totalCards)
      .fill(0)
      .map((_, i) => i + 1);
  }, [cardsInformation]);

  useEffect(() => {
    getQuestions(`cards${searchParams}`);
  }, [searchParams]);

  const searchInputHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const sortSelectHandler = (e) => {
    setSortSelectValue(e.target.value);
    setSearchParams(`?_page=1&_per_page=${sortSelecCountValue}&${e.target.value}`);
  };

  const paginationHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      setSearchParams(`?_page=${e.target.textContent}&_per_page=${sortSelecCountValue}&${sortSelectValue}`);
    }
  };

  const sortSelectCountHandler = (e) => {
    setSortSelecCountValue(e.target.value);
    setSearchParams(`?_page=1&_per_page=${e.target.value}&${sortSelectValue}`);
  };

  return (
    <>
      <div className={cls.controlsContainer}>
        <SearchInput onChange={searchInputHandler} value={searchValue} />
        <SortSelect
          onChange={sortSelectHandler}
          value={sortSelectValue}
          options={SORT_OPTIONS}
          firstOptionText="Сортировать по"
          isDisabled={false}
        />
        <SortSelect
          onChange={sortSelectCountHandler}
          value={sortSelecCountValue}
          options={COUNT_OF_PAGES_OPTIONS}
          firstOptionText="Количество страниц"
          isDisabled={true}
        />
      </div>

      {error && <p>{error}</p>}
      {isLoading && <Loader />}
      {!isLoading && cards.length === 0 && <p className={cls.noCardsInfo}>Нет таких карточек...</p>}
      <QuestionCardList cardsInformation={cards} />
      {!isLoading && pagination.length > 1 && (
        <div className={cls.paginationWrapper} ref={paginationWrapperRef}>
          <Pagination paginationArray={pagination} isActive={getActiveNumber} onClick={paginationHandler} />
        </div>
      )}
    </>
  );
};
