import { MdDelete } from "react-icons/md";
import api from "../config/api";
import { useTodoContext } from "../hooks/useTodosContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

import style from "../styles/Card.module.scss";
import Link from "next/link";

export const Card = ({ todo }) => {
  const { dispatch } = useTodoContext();

  const handleDelete = async () => {
    await api.delete("/todos/" + todo._id).then(
      (res) => {
        dispatch({
          type: "DELETE_TODO",
          payload: res.data,
        });
      },
      (error) => {
        setError(error.message);
      }
    );
  };

  if (!todo) {
    <div>Loading...</div>;
  }

  return (
    <div
      key={todo._id}
      className={`${style.card} ${todo.priority === "low" ? style.low : ""} ${
        todo.priority === "medium" ? style.medium : ""
      } ${todo.priority === "high" ? style.high : ""} ${
        todo.completedTask ? style.completedTodo : ""
      }`}
    >
      <div className={style.interactiveBtn}>
        {/* <div className={style.toggleContainer}>
          <div
            className={todo.completedTask ? style.check : style.not_active}
          ></div>
        </div> */}
        <div className={style.deleteContainer}>
          <MdDelete className={style.delete} onClick={handleDelete} />
        </div>
      </div>
      <Link href={"/" + todo._id} className={style.cardLink}>
        <div>
          <h2 className={style.title}> {todo.title} </h2>
          <p className={style.description}>
            {" "}
            {todo.description.slice(0, 500)}{" "}
          </p>
          <span className={style.createdAt}>
            {todo.completedTask ? (
              <i>
                {" "}
                Completed Todo{" "}
                {formatDistanceToNow(new Date(todo.updatedAt), {
                  addSuffix: true,
                })}{" "}
              </i>
            ) : (
              <i>
                {" "}
                Created{" "}
                {formatDistanceToNow(new Date(todo.createdAt), {
                  addSuffix: true,
                })}{" "}
              </i>
            )}
          </span>
        </div>
      </Link>{" "}
    </div>
  );
};
