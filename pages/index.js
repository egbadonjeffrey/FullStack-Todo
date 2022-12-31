import React, { useEffect, useState } from "react";
import { Inter } from "@next/font/google";
import style from "../styles/Home.module.scss";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import { IoIosAddCircle } from "react-icons/io";
import { useRouter } from "next/router";
import api from "../config/api";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ allTodos }) {
  const [todoState, setTodosState] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (allTodos) {
      setTodosState(allTodos);
    }
  }, [allTodos]);

  console.log(todoState);

  return (
    <Layout title="Home page">
      <div className={style.todoContainer}>
        {todoState &&
          todoState.map((todo) => <Modal key={todo._id} todo={todo} />)}
      </div>
      <div className={style.addTodoButtonContainer}>
        <IoIosAddCircle
          className={style.addTodoButton}
          onClick={() => router.push("/addModal")}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  let response = await api.get("/api/todos").then((res) => {
    return res;
  });

  let allTodos = await response.data;

  return {
    props: {
      allTodos,
    },
  };
}
