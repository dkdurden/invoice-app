import "../styles/index.scss";
import "animate.css";
import { StateProvider } from "../context/app-context";
import invoices from "../data/data.json";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider initialInvoices={invoices}>
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default MyApp;
