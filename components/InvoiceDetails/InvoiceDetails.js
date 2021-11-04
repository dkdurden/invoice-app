import styles from "./InvoiceDetails.module.scss";
import { processCurrency } from "../../utilities/processCurrency";
import { InvoicePriceBreakdown } from "../InvoicePriceBreakdown/InvoicePriceBreakdown";

export function InvoiceDetails({ invoiceData }) {
  // "senderAddress": {
  //     "street": "19 Union Terrace",
  //     "city": "London",
  //     "postCode": "E1 3EZ",
  //     "country": "United Kingdom"
  //   },

  const total = processCurrency(invoiceData.total);

  const months = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "June",
    6: "July",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };

  const createdAtDateObject = new Date(invoiceData.createdAt);
  const paymentDueDateObject = new Date(invoiceData.paymentDue);

  const createdAt = {
    day: createdAtDateObject.getDate(),
    month: months[createdAtDateObject.getMonth()],
    year: createdAtDateObject.getFullYear(),
  };

  const paymentDue = {
    day: paymentDueDateObject.getDate(),
    month: months[paymentDueDateObject.getMonth()],
    year: paymentDueDateObject.getFullYear(),
  };

  return (
    <section className={`card ${styles.container}`}>
      <div className={styles.groupOne}>
        <header>
          <h1 className={`h4 ${styles.heading}`}>
            <span className="text text-gray-dark">#</span>
            {invoiceData.id}
          </h1>
          <p className={`text-gray-dark ${styles.subheading}`}>
            Graphic Design
          </p>
        </header>

        <div className={styles.address}>
          <p className="text-gray-dark">{invoiceData.senderAddress.street}</p>
          <p className="text-gray-dark">{invoiceData.senderAddress.city}</p>
          <p className="text-gray-dark">{invoiceData.senderAddress.postCode}</p>
          <p className="text-gray-dark">{invoiceData.senderAddress.country}</p>
        </div>
      </div>

      <div className={styles.groupTwo}>
        <div className={styles.dates}>
          <div>
            <p className="text-gray-dark">Invoice Date</p>
            <p className="h3 alt">
              <span>{createdAt.day} </span>
              <span>{createdAt.month} </span>
              <span>{createdAt.year}</span>
            </p>
          </div>

          <div>
            <p className="text-gray-dark">Payment Due</p>
            <p className="h3 alt">
              <span>{paymentDue.day} </span>
              <span>{paymentDue.month} </span>
              <span>{paymentDue.year}</span>
            </p>
          </div>
        </div>
        <div className={styles.billTo}>
          <p className="text-gray-dark">Bill To</p>
          <p className="h3 alt">{invoiceData.clientName}</p>
          <div className={styles.address}>
            <p className="text-gray-dark">{invoiceData.clientAddress.street}</p>
            <p className="text-gray-dark">{invoiceData.clientAddress.city}</p>
            <p className="text-gray-dark">
              {invoiceData.clientAddress.postCode}
            </p>
            <p className="text-gray-dark">
              {invoiceData.clientAddress.country}
            </p>
          </div>
        </div>

        <div className={styles.sentTo}>
          <p className="text-gray-dark">Sent to</p>
          <p className="h3 alt">{invoiceData.clientEmail}</p>
        </div>
      </div>
      <div className={styles.groupThree}>
        <InvoicePriceBreakdown invoiceData={invoiceData} />

        <div className={`${styles.total} ${styles.row}`}>
          <p className="alt">Grand Total</p>
          <span className={styles.totalAmount}>&#163; {total}</span>
        </div>
      </div>
    </section>
  );
}
