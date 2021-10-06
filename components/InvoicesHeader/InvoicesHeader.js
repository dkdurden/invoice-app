import Image from "next/image";

import styles from "./InvoicesHeader.module.scss";

export function InvoicesHeader() {
  return (
    <div className={styles.container}>
      <div className={styles.groupOne}>
        <h1 className="h2">Invoices</h1>
        <span className="text">7 invoices</span>
      </div>

      <div className={styles.groupTwo}>
        <button className={styles.dropdown}>
          Filter
          <span>
            <Image
              src="/icon-arrow-down.svg"
              alt=""
              width={"8.5"}
              height={"4.5"}
            />
          </span>
        </button>
        <button className="button--primary">New</button>
      </div>
    </div>
  );
}
