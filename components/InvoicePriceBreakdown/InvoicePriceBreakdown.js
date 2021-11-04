// import { useWindowSize } from "../../hooks/useWindowSize";
import { useMediaQuery } from "../../hooks/useWindowSize";
import { processCurrency } from "../../utilities/processCurrency";
import styles from "./InvoicePriceBreakdown.module.scss";

export function InvoicePriceBreakdown({ invoiceData }) {
  const aboveBreakpoint = useMediaQuery(768);

  return (
    <div className={styles.container}>
      {aboveBreakpoint ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className="alt text-gray-dark">Item Name</th>
              <th className="alt text-gray-dark">QTY.</th>
              <th className="alt text-gray-dark">Price</th>
              <th className="alt text-gray-dark">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item) => {
              return (
                <tr key={item.name}>
                  <td className="h4">{item.name}</td>
                  <td className="h4 text-gray-dark">{item.quantity}</td>
                  <td className="h4 text-gray-dark">
                    &#163; {processCurrency(item.price)}
                  </td>
                  <td className="h4">&#163; {processCurrency(item.total)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>
          {invoiceData.items.map((item) => {
            return (
              <div key={item.name} className={styles.item}>
                <div className="flex-column">
                  <span className="h4 pb-1">{item.name}</span>
                  <span className="h4 text-gray-dark">
                    {`${item.quantity}`} x &#163;{" "}
                    {`${processCurrency(item.price)}`}
                  </span>
                </div>
                <span className="h4">&#163; {processCurrency(item.total)}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
