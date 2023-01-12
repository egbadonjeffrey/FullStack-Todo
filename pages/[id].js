import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../config/api";
import styles from "../styles/TodoItem.module.scss";
import style from "../styles/Form.module.scss";
import { IoDocumentText } from "react-icons/io5";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { format, parse } from "date-fns";
// import style from "../styles/Card.module.scss";
import { useTodoContext } from "../hooks/useTodosContext";

const TodoItem = ({ json, allTodos }) => {
  const [editMode, setEditMode] = useState(false);
  const [todo, setTodo] = useState(json);
  const [title, setTitle] = useState(json.title);
  const [description, setDescription] = useState(json.description);
  const [priority, setPriority] = useState(json.priority);
  const [checked, setChecked] = useState(json.completedTask);
  const [completedTask, setCompletedTask] = useState(json.completedTask);
  const [overlay, setOverlay] = useState(false);
  const [modeMenu, setModeMenu] = useState(false);

  const time = format(new Date(todo.updatedAt), "HH:mm:ss a");

  useEffect(() => {
    if (checked) {
      setCompletedTask(true);
    } else {
      setCompletedTask(false);
    }
  }, [checked]);

  console.log(completedTask);

  // const handleUpdate = async () => {
  //   try {
  //     await api.patch(
  //       "/todos/" + json._id,
  //       {
  //         title,
  //         description,
  //         priority,
  //         completedTask,
  //       }.then((res) => {
  //         const json = res.data;
  //         dispatch({
  //           type: "UPDATE_TODO",
  //           payload: json,
  //         });
  //         setEditMode(false);
  //       })
  //     );
  //   } catch (error) {
  //     error.message;
  //   }
  // };

  const handleCompleteTask = async () => {
    try {
      setCompletedTask((current) => !current);
      await api
        .patch("/todos/" + json._id, {
          completedTask: !completedTask,
        })
        .then((res) => {
          const json = res.data;
        });
    } catch (error) {
      error.message;
    }
  };

  const handlePriority = (e) => {
    console.log(e.target.value);
    setPriority(e.target.value);
  };

  if (!json) {
    <div>Loading...</div>;
  }

  return (
    <Layout title="Todo">
      {/* <div className={styles.overLay}>OVERLAY</div> */}
      <div className={styles.stickyMenu}>
        <div className={styles.stickyMenuContainer}>
          <div className={styles.docContainer}>
            <div className={styles.docDetails}>
              <div className={styles.logoContainer}>
                <IoDocumentText size={50} className={styles.logoImage} />
              </div>
              <div className={styles.docName}>
                <span> {title} </span>
              </div>
            </div>
            <div className={styles.docModeDetails}>
              <div className={styles.lastEdit}>
                <span>
                  Last updated was on{" "}
                  {format(new Date(json.updatedAt), "MM/dd/yyyy")} at{" "}
                  {format(
                    parse(time.split(":", 2).join(":"), "HH:mm", new Date()),
                    "hh:mm a"
                  )}{" "}
                  by {"Benedict"}
                </span>
              </div>
              <div
                className={styles.docMode}
                onClick={() => {
                  setModeMenu(!modeMenu);
                }}
              >
                <span className={styles.menuButton}>
                  {editMode ? "Edit mode" : "View mode"}
                </span>
                {modeMenu && (
                  <div className={styles.menuDropdown}>
                    <div
                      onClick={() => {
                        setEditMode(false);
                      }}
                    >
                      <span>View mode</span>
                      <span>Read your notes and todos</span>
                    </div>
                    <div
                      onClick={() => {
                        setEditMode(true);
                      }}
                    >
                      <span>Edit mode</span>
                      <span>Edit your notes and todos</span>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.priority}>
                <span className={styles.priorityValue}>
                  Priority:{" "}
                  <span
                    className={`${priority === "high" ? styles.high : ""}
                    ${priority === "medium" ? styles.medium : ""}
                    ${priority === "low" ? styles.low : ""}
                  `}
                  >
                    {priority}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className={styles.profilePriority}>
            <div className={styles.profile}>B</div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div
          className={`${styles.card} ${priority === "high" ? styles.high : ""}
                    ${priority === "medium" ? styles.medium : ""}
                    ${priority === "low" ? styles.low : ""} ${
            completedTask ? styles.completedTodo : ""
          }`}
        >
          <div className={styles.interactiveBtn}>
            <input
              type="checkbox"
              checked={completedTask ? true : false}
              onChange={handleCompleteTask}
            />
          </div>

          <div className={styles.todoDetails}>
            {editMode ? (
              <input
                type="text"
                name="title"
                placeholder={title}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className={styles.titleInput}
              />
            ) : (
              <h2 className={styles.title}> {title} </h2>
            )}
            {editMode ? (
              <textarea
                name="description"
                cols="30"
                rows="10"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder={description}
                className={styles.descriptionInput}
              ></textarea>
            ) : (
              <p className={styles.description}> {description} </p>
            )}

            {editMode && (
              <div className={style.priorityContainer}>
                <span>Set Priority</span>
                <div className={styles.priorityGroup}>
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
            )}

            {editMode && (
              <div>
                <button className={styles.updateButton} onClick={handleUpdate}>
                  Update
                </button>
              </div>
            )}
            <span className={styles.createdAt}>
              {completedTask ? (
                <i>
                  {" "}
                  Completed Todo{" "}
                  {formatDistanceToNow(new Date(json.updatedAt), {
                    addSuffix: true,
                  })}{" "}
                </i>
              ) : (
                <i>
                  {" "}
                  Created{" "}
                  {formatDistanceToNow(new Date(json.createdAt), {
                    addSuffix: true,
                  })}{" "}
                </i>
              )}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TodoItem;

export async function getStaticPaths() {
  const response = await api.get("/todos").then((res) => {
    return res;
  });

  const paths = response.data.map((post) => {
    return {
      params: {
        id: post._id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const id = params.id;
  const response = await api.get("/todos/" + id).then((res) => {
    return res;
  });
  const todos = await api.get("/todos").then((res) => {
    return res;
  });

  const json = await response.data;
  const allTodos = await todos.data;
  return {
    props: {
      json,
      allTodos,
    },
  };
}
