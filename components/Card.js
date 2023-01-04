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

  return (
    <div key={todo._id} className={style.card}>
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
          <p className={style.description}> {todo.description} </p>
          <span className={style.createdAt}>
            {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
          </span>
        </div>
      </Link>{" "}
    </div>
  );
};
