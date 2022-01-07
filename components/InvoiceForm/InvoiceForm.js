import styles from "./InvoiceForm.module.scss";

export function InvoiceForm() {
  return (
    <form>
      <div className={styles.billFrom}>
        <p id="bill-from" className="h4 text-purple">
          Bill From
        </p>
      </div>
    </form>
  );
}
