import cls from "./HomePage.module.css";
import { API_URL, COUNT_OF_PAGES_OPTIONS, SORT_OPTIONS, DEFAULT_PER_PAGE } from "../../constants";
import { useEffect, useMemo, useRef, useState } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";
import { SortSelect } from "../../components/SortSelect";
import { Pagination } from "../../components/Pagination/Pagination";
import { useAuth } from "../../hooks/useAuth";

export const HomePage = () => {
  const { isAuth } = useAuth();
  const [cardsInformation, setCardsInformation] = useState({});
  const [allCards, setAllCards] = useState([]);
  const [userProgress, setUserProgress] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");
  const [searchParams, setSearchParams] = useState(`?_page=1&_per_page=${DEFAULT_PER_PAGE}`);
  const [sortSelecCountValue, setSortSelecCountValue] = useState(DEFAULT_PER_PAGE);

  const controlsContainerRef = useRef();

  const [getQuestions, isLoading, error] = useFetch(async (arg) => {
    const response = await fetch(`${API_URL}/${arg}`);
    const questions = await response.json();
    setCardsInformation(questions);
    return questions;
  });

  const [getAllCards] = useFetch(async () => {
    const response = await fetch(`${API_URL}/cards`);
    if (response.ok) {
      const data = await response.json();
      if (data.data) {
        setAllCards(data.data);
      } else {
        setAllCards(data);
      }
    }
  });

  const [getUserProgress] = useFetch(async () => {
    if (isAuth) {
      const response = await fetch(`${API_URL}/userProgress`);
      if (response.ok) {
        const progress = await response.json();
        setUserProgress(progress);
      }
    }
  });

  const [saveUserProgress] = useFetch(async (updatedProgress) => {
    if (isAuth) {
      await fetch(`${API_URL}/userProgress`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProgress),
      });
    }
  });

  useEffect(() => {
    if (isAuth && allCards.length > 0 && userProgress) {
      const completedCards = allCards.filter((card) => card.status === true).map((card) => card.id);

      if (completedCards.length > 0) {
        const newStudiedCards = [...new Set([...userProgress.studiedCards, ...completedCards])];

        if (newStudiedCards.length > userProgress.studiedCards.length) {
          const updatedProgress = {
            studiedCards: newStudiedCards,
            lastUpdated: new Date().toLocaleDateString("ru-RU"),
          };

          setUserProgress(updatedProgress);
          saveUserProgress(updatedProgress);
        }
      }
    }
  }, [isAuth, allCards, userProgress]);

  useEffect(() => {
    if (isAuth) {
      getUserProgress();
      getAllCards();
    } else {
      setUserProgress(null);
      setAllCards([]);
    }
  }, [isAuth]);

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
    const totalCards = cardsInformation?.pages;
    return Array(totalCards)
      .fill(0)
      .map((_, i) => i + 1);
  }, [cardsInformation]);

  const progressStats = useMemo(() => {
    if (!isAuth || !userProgress || allCards.length === 0) {
      return null;
    }

    const totalCards = allCards.length;
    const studiedCount = userProgress.studiedCards?.length || 0;

    return {
      studied: studiedCount,
      total: totalCards,
      percentage: totalCards > 0 ? Math.round((studiedCount / totalCards) * 100) : 0,
    };
  }, [isAuth, userProgress, allCards]);

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
    controlsContainerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const sortSelectCountHandler = (e) => {
    setSortSelecCountValue(e.target.value);
    setSearchParams(`?_page=1&_per_page=${e.target.value}&${sortSelectValue}`);
  };

  const updateProgress = async (cardId, studied) => {
    if (!isAuth || !userProgress) return;

    // Обновляем прогресс пользователя
    let updatedStudiedCards;

    if (studied) {
      updatedStudiedCards = userProgress.studiedCards.includes(cardId)
        ? userProgress.studiedCards
        : [...userProgress.studiedCards, cardId];
    } else {
      updatedStudiedCards = userProgress.studiedCards.filter((id) => id !== cardId);
    }

    const updatedProgress = {
      studiedCards: updatedStudiedCards,
      lastUpdated: new Date().toLocaleDateString("ru-RU"),
    };

    setUserProgress(updatedProgress);
    await saveUserProgress(updatedProgress);

    try {
      // Обновляем статус карточки на сервере
      await fetch(`${API_URL}/cards/${cardId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: studied }),
      });

      // Обновляем статус в allCards
      setAllCards((prevCards) => prevCards.map((card) => (card.id === cardId ? { ...card, status: studied } : card)));

      // ОБНОВЛЯЕМ статус в cardsInformation для текущей страницы
      setCardsInformation((prevInfo) => ({
        ...prevInfo,
        data: prevInfo.data.map((card) => (card.id === cardId ? { ...card, status: studied } : card)),
      }));
    } catch (error) {
      console.error("Ошибка при обновлении status карточки:", error);
    }
  };

  return (
    <>
      <div className={cls.controlsContainer} ref={controlsContainerRef}>
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

      {isAuth && progressStats && (
        <div className={cls.progressWrapper}>
          <div className={cls.progressContainer}>
            <div className={cls.progressInfo}>
              <span className={cls.progressText}>
                Ваш прогресс: {progressStats.studied}/{progressStats.total} ({progressStats.percentage}%)
              </span>
            </div>
            <div className={cls.progressBar}>
              <div className={cls.progressFill} style={{ width: `${progressStats.percentage}%` }} />
            </div>
          </div>
        </div>
      )}

      {error && <p>{error}</p>}
      {isLoading && <Loader />}
      {!isLoading && cards.length === 0 && <p className={cls.noCardsInfo}>Нет таких карточек...</p>}

      <QuestionCardList cardsInformation={cards} isAuth={isAuth} userProgress={userProgress} onUpdateProgress={updateProgress} />

      {!isLoading && pagination.length > 1 && (
        <div className={cls.paginationWrapper}>
          <Pagination paginationArray={pagination} isActive={getActiveNumber} onClick={paginationHandler} />
        </div>
      )}
    </>
  );
};
