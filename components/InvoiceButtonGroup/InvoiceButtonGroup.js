import styles from "./InvoiceButtonGroup.module.scss";

export function InvoiceButtonGroup() {
  return (
    <div className={styles.container}>
      <button className="button--light">Edit</button>
      <button className="button--danger mx-1">Delete</button>
      <button className="button--primary">Mark as Paid</button>
    </div>
  );
}
