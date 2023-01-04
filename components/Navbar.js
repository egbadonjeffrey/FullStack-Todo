import Link from "next/link";
import React, { useState } from "react";
import style from "../styles/Navbar.module.scss";

const Navbar = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  return (
    <>
      {!isDesktop && (
        <div className={style.mobileMenu}>
          <ul>
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
      )}
      <div className={style.innerNavbar}>
        <span className={style.logo}>Scarlett</span>
        {isDesktop ? (
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
        ) : (
          <button>Mobile menu</button>
        )}
      </div>
    </>
  );
};

export default Navbar;
