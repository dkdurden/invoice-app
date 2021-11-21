import { PaymentStatus } from "../PaymentStatus/PaymentStatus";
import { InvoiceButtonGroup } from "../InvoiceButtonGroup/InvoiceButtonGroup";
import styles from "./InvoiceStatusBar.module.scss";

export function InvoiceStatusBar({ invoiceStatus }) {
  return (
    <div className={`card ${styles.container}`}>
      <div className={styles.groupOne}>
        <span className="text text-dark">Status</span>
        <PaymentStatus status={invoiceStatus} />
      </div>

      <div className={styles.groupTwo}>
        <InvoiceButtonGroup />
      </div>
    </div>
  );
}
