import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import style from "../styles/Layout.module.scss";

const Layout = ({ title, children }) => {
  const router = useRouter();
  // const hideNav = router.pathname === `/[id]` ?
  const showFooter = router.pathname === `/[id]` ? false : true;

  return (
    <div className={style.container}>
      <Head>
        <title> {title ? title + " - Scarlett" : "Scarlett"} </title>
        <meta name="description" content="Crypto Investment Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={style.navbarContainer}>
        <Navbar />
      </header>

      {children}

      {showFooter && (
        <footer className={style.footerContainer}>
          <Footer />
        </footer>
      )}
    </div>
  );
};

export default Layout;
