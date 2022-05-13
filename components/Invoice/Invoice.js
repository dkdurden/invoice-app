import Link from "next/link";
import Image from "next/image";

import { PaymentStatus } from "../PaymentStatus/PaymentStatus";
import { processDate } from "../../utilities/processDate";
import { processCurrency } from "../../utilities/processCurrency";
import styles from "./Invoice.module.scss";

export function Invoice({ invoice }) {
  const date = processDate(invoice.paymentDue);
  const total = processCurrency(invoice.total);
  return (
    <article className={`${styles.invoice} card`}>
      <Link href={`/invoices/${invoice.id}`}>
        <a className={styles.container}>
          <h2 className={`${styles.id} h4`}>
            <span className="text-dark">#</span>
            {invoice.id}
          </h2>

          <span
            className={`${styles.date} text text-dark`}
          >{`Due ${date}`}</span>
          <span className={`${styles.total} h3`}>&#163; {total}</span>

          <div className={`${styles.name} d-flex align-end`}>
            <span className="text text-dark-alt">{invoice.clientName}</span>
          </div>

          <div className={`${styles.status} d-flex align-end`}>
            <PaymentStatus status={invoice.status} />
          </div>

          <div className={styles.arrow}>
            <Image
              src="/icon-arrow-right.svg"
              alt=""
              width={"6"}
              height={"8"}
            />
          </div>
        </a>
      </Link>
    </article>
  );
}
