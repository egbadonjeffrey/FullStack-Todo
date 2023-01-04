import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../config/api";
import styles from "../styles/TodoItem.module.scss";
import { IoDocumentText } from "react-icons/io5";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
// import style from "../styles/Card.module.scss";
import { useTodoContext } from "../hooks/useTodosContext";

const TodoItem = ({ json }) => {
  const [editMode, setEditMode] = useState(false);
  const { dispatch } = useTodoContext();
  const [title, setTitle] = useState(json.title);
  const [description, setDescription] = useState(json.description);
  const [priority, setPriority] = useState(json.priority);
  const [completedTask, setCompletedTask] = useState(json.completedTask);
  const [modeMenu, setModeMenu] = useState(false);
  const [priorityMenu, setPriorityMenu] = useState(false);

  const handleUpdate = async () => {
    try {
      const response = await api
        .patch("/todos/" + json._id, {
          title,
          description,
          priority,
          completedTask,
        })
        .then((res) => {
          const json = res.data;
          dispatch({
            type: "UPDATE_TODO",
            payload: json,
          });
          setEditMode(false);
        });
    } catch (error) {
      error.message;
    }
  };

  return (
    <Layout title="Todo">
      <div className={styles.stickyMenu}>
        <div className={styles.stickyMenuContainer}>
          <div className={styles.docContainer}>
            <div className={styles.docDetails}>
              <div className={styles.logoContainer}>
                <IoDocumentText className={styles.logoImage} />
              </div>
              <div className={styles.docName}>
                <span> {title} </span>
              </div>
            </div>
            <div className={styles.docModeDetails}>
              <div className={styles.lastEdit}>
                <span>
                  Last edit was on {"2nd January at 6:31pm"} by {"Benedict"}
                </span>
              </div>
              <div className={styles.docMode}>
                <span
                  className={styles.menuButton}
                  onClick={() => setModeMenu(!modeMenu)}
                >
                  View mode
                </span>
                {modeMenu && (
                  <div className={styles.menuDropdown}>
                    <div>
                      <span>View mode</span>
                      <span>Read your notes and todos</span>
                    </div>
                    <div>
                      <span>Edit mode</span>
                      <span>Edit your notes and todos</span>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.priority}>
                <span
                  className={styles.priorityImageContainer}
                  onClick={() => setPriorityMenu(!priorityMenu)}
                >
                  Priority
                </span>

                {priorityMenu && (
                  <div className={styles.priorityList}>
                    <div className={styles.low}>
                      <div
                        className={
                          styles.priorityRadioBtn + " " + styles.checked
                        }
                      ></div>
                      <span>Low</span>
                    </div>
                    <div className={styles.medium}>
                      <div className={styles.priorityRadioBtn}></div>
                      <span>Medium</span>
                    </div>
                    <div className={styles.high}>
                      <div className={styles.priorityRadioBtn}></div>
                      <span>High</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.profilePriority}>
            <div className={styles.profile}>B</div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.interactiveBtn}>
            <div className={styles.toggleContainer}>
              <div
                className={completedTask ? styles.check : styles.not_active}
              ></div>
            </div>
            {/* <div className={styles.priorityContainer}>
              <IoMdMore
                className={styles.priority}
                onClick={() => {
                  setEditMode(true);
                }}
              />
            </div> */}
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
              ></textarea>
            ) : (
              <p className={styles.description}> {description} </p>
            )}

            {editMode && (
              <div>
                <button className={styles.updateButton} onClick={handleUpdate}>
                  {" "}
                  Update{" "}
                </button>
              </div>
            )}
            <span className={styles.createdAt}>
              Created{" "}
              {formatDistanceToNow(new Date(json.createdAt), {
                addSuffix: true,
              })}
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

  const json = await response.data;

  return {
    props: {
      json,
    },
  };
}
