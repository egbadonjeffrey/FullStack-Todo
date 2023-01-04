import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Inter } from "@next/font/google";
import style from "../styles/Home.module.scss";
import Layout from "../components/Layout";
import { Card } from "../components/Card";
import Masonry from "react-masonry-css";

import { MdAddCircle } from "react-icons/md";
import api from "../config/api";
import { useTodoContext } from "../hooks/useTodosContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ json }) {
  const [showModal, setShowModal] = useState(false);
  const { todos, dispatch } = useTodoContext();

  useEffect(() => {
    if (json) {
      dispatch({
        type: "SET_TODOS",
        payload: json,
      });
    }
  }, [json, dispatch]);

  return (
    <Layout title="Home">
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
        <Link href="/createTodo" className={style.addTodoButtonContainer}>
          <MdAddCircle className={style.addTodoButton} />
        </Link>
      </div>
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
