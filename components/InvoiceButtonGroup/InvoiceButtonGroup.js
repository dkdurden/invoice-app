import React from "react";

import { ModalContext } from "../DeleteInvoiceModal/ModalContext";
import { InvoiceContext } from "../../context/invoice-context";
import { useInvoices, useModalState } from "../../context/app-context";
import styles from "./InvoiceButtonGroup.module.scss";

export function InvoiceButtonGroup() {
  const invoiceData = React.useContext(InvoiceContext);

  const { updateInvoice } = useInvoices();

  // Form modal
  const { toggleModal } = useModalState();
  const handleEdit = (e) => toggleModal("edit-invoice", invoiceData);

  // delete invoice modal
  const { toggleModal: toggleDeleteInvoiceModal } =
    React.useContext(ModalContext);

  const markAsPaid = () => updateInvoice({ ...invoiceData, status: "paid" });

  return (
    <div className={styles.container}>
      <button className="button--light" onClick={handleEdit}>
        Edit
      </button>
      <button
        className="button--danger mx-1"
        onClick={toggleDeleteInvoiceModal}
      >
        Delete
      </button>
      <button className="button--primary" onClick={markAsPaid}>
        Mark as Paid
      </button>
    </div>
  );
}
