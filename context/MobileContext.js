import { createContext, useReducer } from "react";

export const MobileContext = createContext();

export const MobileReducer = (state, action) => {
  switch (action.type) {
    case "SET_MOBILE_MENU":
      return {
        mobileMenu: action.payload,
      };

    case "OPEN_MOBILE_MENU":
      return {
        mobileMenu: true,
      };

    case "CLOSE_MOBILE_MENU":
      return {
        mobileMenu: false,
      };

    default:
      return state;
  }
};

export const MobileContextProvider = ({ children }) => {
  const [state, mobileDispatch] = useReducer(MobileReducer, {
    mobileMenu: false,
  });
  return (
    <MobileContext.Provider
      value={{
        ...state,
        mobileDispatch,
      }}
    >
      {children}
    </MobileContext.Provider>
  );
};
