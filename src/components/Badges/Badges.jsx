import cls from "./Badges.module.css";

export const Badges = (props) => {
  switch (props.variant) {
    case "easy":
      return <div className={`${cls.badges} ${cls.easy}`}>{props.children}</div>;
    case "medium":
      return <div className={`${cls.badges} ${cls.medium}`}>{props.children}</div>;
    case "hard":
      return <div className={`${cls.badges} ${cls.hard}`}>{props.children}</div>;
    case "completed":
      return <div className={`${cls.badges} ${cls.completed}`}>{props.children}</div>;
    case "in progress":
      return <div className={`${cls.badges} ${cls.inProgress}`}>{props.children}</div>;
    default:
      return <div className={cls.badges}>{props.children}</div>;
  }
};
