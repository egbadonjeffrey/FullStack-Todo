import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import style from "../styles/Components.module.scss";

const Layout = ({ title, children }) => {
  return (
    <div className={style.container}>
      <Head>
        <title> {title ? title + " - Alphfxtrading" : "Alphafxtrading"} </title>
        <meta name="description" content="Crypto Investment Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={style.navbarContainer}>
        <Navbar />
      </header>

      {children}

      <footer className={style.footerContainer}>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
