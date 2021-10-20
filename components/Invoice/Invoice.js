import Link from "next/link";

import { processDate } from "../../utilities/processDate";
import { processCurrency } from "../../utilities/processCurrency";
import styles from "./Invoice.module.scss";

export function Invoice({ invoice }) {
  const date = processDate(invoice.paymentDue);
  const total = processCurrency(invoice.total);
  return (
    <article className={styles.invoice}>
      <Link href={`/invoices/${invoice.id}`}>
        <a className={styles.container}>
          <h2 className={`${styles.id} h4`}>
            <span className="text-gray-dark">#</span>
            {invoice.id}
          </h2>

          <span
            className={`${styles.date} text text-gray-dark`}
          >{`Due ${date}`}</span>
          <span className={`${styles.total} h3`}>&#163; {total}</span>

          <div className={`${styles.name} align-end`}>
            <span className="text text-gray-dark">{invoice.clientName}</span>
          </div>

          <div className={`${styles.status} align-end`}>
            <span className={`${styles[invoice.status]}`}>
              <span className={styles.circle}></span>
              <span className="text text-bold">{invoice.status}</span>
            </span>
          </div>
        </a>
      </Link>
    </article>
  );
}
