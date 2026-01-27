import { Button } from "../Button";

export const Pagination = (props) => {
  return (
    <>
      {props.paginationArray.map((num) => {
        return (
          <Button key={num} onClick={props.onClick} isActive={num === props.isActive()}>
            {num}
          </Button>
        );
      })}
    </>
  );
};
