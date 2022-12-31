import Link from "next/link";
import React from "react";
import style from "../styles/Components.module.scss";

const Navbar = () => {
  return (
    <div className={style.innerNavbar}>
      <span className={style.logo}>Scarlett</span>
      <ul className={style.menu}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/signup">Sign up</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
