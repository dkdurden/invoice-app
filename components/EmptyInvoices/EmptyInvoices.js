import Image from "next/image";

import styles from "./EmptyInvoices.module.scss";

export function EmptyInvoices() {
  return (
    <div className={styles.container}>
      <Image src="/illustration-empty.svg" alt="" width="193" height="160" />
      <h2>There is nothing here</h2>
      <p className="text-gray-dark" style={{ padding: "0 1em" }}>
        Create an invoice by clicking the <b>New</b> button and get started
      </p>
    </div>
  );
}
