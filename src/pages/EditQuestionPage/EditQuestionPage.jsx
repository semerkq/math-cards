import { EditQuestion } from "./EditQuestion";
import { useFetch } from "../../hooks/useFetch";
import { API_URL } from "../../constants";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader";

const EditQuestionPage = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  const [fetchCard, isCardLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/cards/${id}`);
    const data = await response.json();

    setCard(data);
  });

  useEffect(() => {
    fetchCard();
  }, []);

  return (
    <>
      {isCardLoading && <Loader />}
      {card && <EditQuestion initialState={card} />}
    </>
  );
};

export default EditQuestionPage;
