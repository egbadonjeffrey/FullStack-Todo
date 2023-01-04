import { createContext, useReducer } from "react";

export const TodoContext = createContext();

export const TodoReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return {
        todos: action.payload,
      };

    case "POST_TODO":
      return {
        todos: [action.payload, ...state.todos],
      };

    case "DELETE_TODO":
      return {
        todos: state.todos.filter((w) => w._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export const TodoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TodoReducer, {
    todos: null,
  });
  return (
    <TodoContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
