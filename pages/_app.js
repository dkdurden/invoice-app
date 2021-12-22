import "../styles/index.scss";
import "animate.css";
import { StateProvider } from "../context/app-context";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default MyApp;
