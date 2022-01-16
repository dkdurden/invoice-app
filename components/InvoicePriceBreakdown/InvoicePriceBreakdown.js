import React from "react";

import { InvoiceContext } from "../../context/invoice-context";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { processCurrency } from "../../utilities/processCurrency";
import styles from "./InvoicePriceBreakdown.module.scss";

export function InvoicePriceBreakdown() {
  const invoiceData = React.useContext(InvoiceContext);

  const aboveBreakpoint = useMediaQuery(768);

  return (
    <div className={styles.container}>
      {aboveBreakpoint ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className="alt text-light">Item Name</th>
              <th className="alt text-light">QTY.</th>
              <th className="alt text-light">Price</th>
              <th className="alt text-light">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item) => {
              return (
                <tr key={item.name}>
                  <td className="h4">{item.name}</td>
                  <td className="h4 text-light">{item.quantity}</td>
                  <td className="h4 text-light">
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
                <div className="d-flex flex-column">
                  <span className="h4 pb-1">{item.name}</span>
                  <span className="h4 text-light">
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
