import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../config/api";
import style from "../styles/Form.module.scss";

import ModalBG from "../public/image/bg/Modal-bg.jpg";
import { useTodoContext } from "../hooks/useTodosContext";

const CreateTodoModal = () => {
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updatePriority, setUpdatePriority] = useState("");
  const [error, setError] = useState(null);

  // const [emptyFields, setEmptyFields] = useState([]);
  const { dispatch } = useTodoContext();

  const completedTask = false;

  const router = useRouter();

  const handleRetryForm = () => {
    if (updateTitle || description !== "") {
      setError(null);
    }
  };

  const handlePriority = (e) => {
    console.log(e.target.value);
    setPriority(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await api
      .patch("/todos", {
        updateTitle,
        updateDescription,
        updatePriority,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        const jsonError = error.response.data;
        setError(jsonError.error);
        // setEmptyFields(jsonError.emptyFields);
      });
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

      <div className={style.formModalContainer} onClick={handleRetryForm}>
        <h2>Add Todo</h2>
        <form
          onSubmit={handleUpdate}
          // className={emptyFields.includes("priority") ? style.error : ""}
        >
          <div className={style.inputContainer}>
            <input
              type="text"
              id="title"
              placeholder="Pick up Grocies"
              onChange={(e) => setUpdateTitle(e.target.value)}
              value={updateTitle}
            />
            <label htmlFor="title">Update Title</label>
          </div>
          <div className={style.inputContainer}>
            <textarea
              type="text"
              id="description"
              cols={10}
              rows={5}
              placeholder="Pick up Grocies at market square"
              onChange={(e) => setUpdateDescription(e.target.value)}
              value={updateDescription}
            />
            <label htmlFor="description">Update Description</label>
          </div>
          <div className={style.priorityContainer}>
            <span>Update Priority</span>
            <div className={style.priorityGroup}>
              <div>
                <input
                  type="radio"
                  id="low"
                  name="priority"
                  value="low"
                  checked={updatePriority === "low"}
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
                  checked={updatePriority === "medium"}
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
                  checked={updatePriority === "high"}
                  onChange={handlePriority}
                />
                <label htmlFor="high">High</label>
              </div>
            </div>
          </div>

          <div className={style.buttonContainer}>
            <button
              type="submit"
              className={style.button}
              disabled={error && true}
            >
              Update Todo
            </button>
          </div>
          {error && (
            <div className={style.errorContainer}>
              <span className={style.errorText}>{error}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateTodoModal;
