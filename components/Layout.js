import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import style from "../styles/Layout.module.scss";
import { useModalContext } from "../hooks/useModalContext";

const Layout = ({ title, children }) => {
  const { modal } = useModalContext();
  const router = useRouter();

  const remove = router.pathname === `/[id]` ? true : false;
  const createTodo = modal ? true : false;

  return (
    <div className={style.container}>
      <Head>
        <title> {title ? title + " - Scarlett" : "Scarlett"} </title>
      </Head>

      {!createTodo && (
        <div className={style.navbarContainer}>
          <Navbar />
        </div>
      )}

      {children}

      {!remove && !createTodo && (
        <footer className={style.footerContainer}>
          <Footer />
        </footer>
      )}
    </div>
  );
};

export default Layout;
