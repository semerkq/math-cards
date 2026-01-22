import cls from "./Badges.module.css";

export const Badges = (props) => {
  switch (props.variant) {
    case 1:
      return <div className={`${cls.badges} ${cls.easy}`}>{props.children}</div>;
    case 2:
      return <div className={`${cls.badges} ${cls.medium}`}>{props.children}</div>;
    case 3:
      return <div className={`${cls.badges} ${cls.hard}`}>{props.children}</div>;
    case true:
      return <div className={`${cls.badges} ${cls.completed}`}>{props.children}</div>;
    case false:
      return <div className={`${cls.badges} ${cls.inProgress}`}>{props.children}</div>;
    default:
      return <div className={cls.badges}>{props.children}</div>;
  }
};
