import styles from "./PaymentStatus.module.scss";

export function PaymentStatus({ status }) {
  return (
    <div className={styles.status}>
      <span className={`${styles[status]}`}>
        <span className={styles.circle}></span>
        <span className="text text-bold">{status}</span>
      </span>
    </div>
  );
}
