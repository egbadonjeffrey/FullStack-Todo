import Link from "next/link";
import React, { useEffect, useState } from "react";
import style from "../styles/Navbar.module.scss";
import { useRouter } from "next/router";
import { HiMenuAlt2 } from "react-icons/hi";
import { useMobileContext } from "../hooks/useMobileContext";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Navbar = () => {
  const { mobileMenu, mobileDispatch } = useMobileContext();
  const router = useRouter();
  const [desktop, setIsDesktop] = useState(false);

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width >= 1024) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }, [width]);

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenu]);

  const handleCloseMenu = () => {
    mobileDispatch({
      type: "CLOSE_MOBILE_MENU",
      payload: false,
    });
  };

  return (
    <>
      <div
        className={
          mobileMenu
            ? style.menuOverlay + " " + style.active
            : style.menuOverlay
        }
        onClick={() =>
          mobileDispatch({
            type: "CLOSE_MOBILE_MENU",
            payload: false,
          })
        }
      ></div>

      {!desktop && (
        <div
          className={
            mobileMenu
              ? style.mobileMenu + " " + style.active
              : style.mobileMenu
          }
          // style={singleTodo ? singleMenuStyle : homeMenuStyle}
        >
          <div className={style.menu}>
            <div className={style.navIntro}>
              <span className={style.navLogo}> Sc. </span>
              <span
                className={style.cancel}
                onClick={() =>
                  mobileDispatch({
                    type: "CLOSE_MOBILE_MENU",
                    payload: false,
                  })
                }
              >
                [X]
              </span>
            </div>
            <span onClick={() => handleCloseMenu()}>
              <Link href="/">Home</Link>
            </span>
            <span onClick={() => handleCloseMenu()}>
              <Link href="/login">Login</Link>
            </span>
            <span onClick={() => handleCloseMenu()}>
              <Link href="/signup">Sign up</Link>
            </span>
          </div>
        </div>
      )}

      <div className={style.innerNavbar}>
        <span className={style.logo}>Scarlett</span>
        {desktop ? (
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
          <HiMenuAlt2
            className={style.mobilemenuIcon}
            color="white"
            size={30}
            onClick={() =>
              mobileDispatch({
                type: "OPEN_MOBILE_MENU",
                payload: true,
              })
            }
          />
        )}
      </div>
    </>
  );
};

export default Navbar;
