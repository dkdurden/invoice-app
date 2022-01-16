import React from "react";

import { InvoiceContext } from "../../context/invoice-context";
import { useModalState } from "../../context/app-context";
import styles from "./InvoiceButtonGroup.module.scss";

export function InvoiceButtonGroup() {
  const invoiceData = React.useContext(InvoiceContext);
  const { toggleModal } = useModalState();

  console.log(invoiceData);
  const handleEdit = (e) => toggleModal("edit-invoice", invoiceData);

  return (
    <div className={styles.container}>
      <button className="button--light" onClick={handleEdit}>
        Edit
      </button>
      <button className="button--danger mx-1">Delete</button>
      <button className="button--primary">Mark as Paid</button>
    </div>
  );
}
