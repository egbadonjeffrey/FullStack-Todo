import { useEffect, useState } from "react";
import style from "../styles/Home.module.scss";
import Layout from "../components/Layout";
import { Card } from "../components/Card";
import Masonry from "react-masonry-css";

import { MdAddCircle } from "react-icons/md";
import api from "../config/api";
import { useModalContext } from "../hooks/useModalContext";
import CreateTodoModal from "../components/CreateTodoModal.js";
import { useTodoContext } from "../hooks/useTodosContext";

export default function Home({ json }) {
  const { todos, dispatch } = useTodoContext();
  const { modal, modalDispatch } = useModalContext();

  useEffect(() => {
    if (json) {
      dispatch({
        type: "SET_TODOS",
        payload: json,
      });
    }
  }, [json, dispatch]);

  useEffect(() => {
    if (modal) {
      modalDispatch({
        type: "SET_MODAL",
        payload: false,
      });
    }
  }, [modal, modalDispatch]);

  return (
    <Layout title="Home">
      {modal ? (
        <CreateTodoModal />
      ) : (
        <div className={style.content}>
          <Masonry
            breakpointCols={{
              default: 3,
              800: 2,
              600: 1,
            }}
            className={style.my_masonry_grid}
            columnClassName={style.my_masonry_grid_column}
          >
            {todos && todos.map((todo) => <Card key={todo._id} todo={todo} />)}
          </Masonry>{" "}
          <div className={style.addTodoButtonContainer}>
            <MdAddCircle
              className={style.addTodoButton}
              onClick={() => {
                modalDispatch({
                  type: "SHOW_MODAL",
                  payload: true,
                });
              }}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  let response = await api.get("/todos").then((res) => {
    return res;
  });

  const json = await response.data;

  return {
    props: {
      json,
    },
  };
}
