import React, { useState, useEffect } from "react";
import { IoMdMore } from "react-icons/io";

import style from "../styles/Components.module.scss";

const Modal = ({ todo }) => {
  return (
    <div key={todo._id} className={style.card}>
      <h2 className={style.title}> {todo.title} </h2>
      <p className={style.description}> {todo.description} </p>
      <div className={style.interactiveBtn}>
        <div className={style.toggleContainer}>
          <div className={style.toggle}>
            <div
              className={!todo.completedTask && style.not_active + style.check}
            ></div>
          </div>
        </div>
        <div className={style.priorityContainer}>
          <IoMdMore className={style.priority} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
