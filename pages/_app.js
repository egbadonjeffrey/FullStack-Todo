import { TodoContextProvider } from "../context/TodoContext";
import "../styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <TodoContextProvider>
      <Component {...pageProps} />
    </TodoContextProvider>
  );
}
