import { ModalContextProvider } from "../context/ModalContext";
import { MobileContextProvider } from "../context/MobileContext";
import { TodoContextProvider } from "../context/TodoContext";
import "../styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <TodoContextProvider>
      <MobileContextProvider>
        <ModalContextProvider>
          <Component {...pageProps} />
        </ModalContextProvider>
      </MobileContextProvider>
    </TodoContextProvider>
  );
}
