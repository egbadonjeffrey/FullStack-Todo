import { MobileContext } from "../context/MobileContext";
import { useContext } from "react";

export const useMobileContext = () => {
  const context = useContext(MobileContext);

  if (!context) {
    throw Error("useMobileContext must be inside MobileContext");
  }

  return context;
};
