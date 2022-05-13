import React from "react";

import { InvoiceContext } from "../../context/invoice-context";
import { PaymentStatus } from "../PaymentStatus/PaymentStatus";
import { InvoiceButtonGroup } from "../InvoiceButtonGroup/InvoiceButtonGroup";
import styles from "./InvoiceStatusBar.module.scss";

export function InvoiceStatusBar() {
  const { status } = React.useContext(InvoiceContext);

  return (
    <div className={`card ${styles.container}`}>
      <div className={styles.groupOne}>
        <span className="text text-dark">Status</span>
        <PaymentStatus status={status} />
      </div>

      <div className={styles.groupTwo}>
        <InvoiceButtonGroup />
      </div>
    </div>
  );
}
