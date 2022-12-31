import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../config/api";
import style from "../styles/Components.module.scss";

import ModalBG from "../public/image/bg/Modal-bg.jpg";

const AddTodoModal = ({ allTodos }) => {
  const [todoState, setTodoState] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [completedTask, setCompletedTask] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    setTodoState(allTodos);
  }, [allTodos]);

  const handlePriority = (e) => {
    console.log(e.target.value);
    setPriority(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      title,
      description,
      priority,
      completedTask,
    };

    const response = await api
      .post("/api/todos", {
        title,
        description,
        priority,
        completedTask,
      })
      .then(
        (res) => {
          return res;
        },
        (error) => {
          setError(error.message);
        }
      );

    const json = await response.data;

    if (!response.ok) {
      setError(json.error);
    }

    if (response) {
      setTitle("");
      setDescription("");
      setPriority("");
      setCompletedTask(false);
      setError(null);
      router.push("/");
    }
  };

  return (
    <div className={style.AddTodoModalContainer}>
      <div className={style.formModalOverlay}>
        <Image
          src={ModalBG}
          alt="Photo by Kelly Sikkema"
          className={style.overlayPhoto}
        />
        <div className={style.attribute}>
          Photo by{" "}
          <Link href="https://unsplash.com/@kellysikkema?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Kelly Sikkema
          </Link>{" "}
          on{" "}
          <Link href="https://unsplash.com/photos/Pmq77M23eU8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </Link>
        </div>
      </div>

      <div className={style.formModalContainer}>
        <h2>Add Todo</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.inputContainer}>
            <input
              type="text"
              id="title"
              placeholder="Pick up Grocies"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <label htmlFor="title">Title</label>
          </div>
          <div className={style.inputContainer}>
            <textarea
              type="text"
              id="description"
              cols={10}
              rows={5}
              placeholder="Pick up Grocies at market square"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <label htmlFor="description">Description</label>
          </div>
          <div className={style.priorityContainer}>
            <span>Set Priority</span>
            <div className={style.priorityGroup}>
              <div>
                <input
                  type="radio"
                  id="low"
                  name="priority"
                  value="low"
                  checked={priority === "low"}
                  onChange={handlePriority}
                />
                <label htmlFor="low">Low</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="medium"
                  name="priority"
                  value="medium"
                  checked={priority === "medium"}
                  onChange={handlePriority}
                />
                <label htmlFor="medium">Medium</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="high"
                  name="priority"
                  value="high"
                  checked={priority === "high"}
                  onChange={handlePriority}
                />
                <label htmlFor="high">High</label>
              </div>
            </div>
          </div>

          <div className={style.buttonContainer}>
            <button type="submit" className={style.button}>
              Add Todo
            </button>
          </div>

          {error && (
            <div className={style.errorContainer}>
              <span className={style.error}>{error}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;

export async function getServerSideProps() {
  let res = await fetch("/api/todos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let allTodos = await res.json();

  return {
    props: { allTodos },
  };
}
