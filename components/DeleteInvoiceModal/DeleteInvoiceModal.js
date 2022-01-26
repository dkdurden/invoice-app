import React from "react";
import { Dialog } from "@headlessui/react";
import cn from "classnames";

import { InvoiceContext } from "../../context/invoice-context";
import { ModalContext } from "./ModalContext";
import styles from "./DeleteInvoiceModal.module.scss";

export function DeleteInvoiceModal() {
  const { modalOpen, toggleModal } = React.useContext(ModalContext);
  const invoiceData = React.useContext(InvoiceContext);

  return (
    <Dialog open={modalOpen} onClose={toggleModal} className={styles.container}>
      <Dialog.Overlay />

      <Dialog.Title className={styles.heading}>Confirm Deletion</Dialog.Title>

      <p className={cn("text-dark", styles.desc)}>
        Are you sure you want to delete invoice #{invoiceData.id}? This action
        cannot be undone.
      </p>

      <div className={styles.group}>
        <button onClick={toggleModal} className="button--light">
          Cancel
        </button>
        <button onClick={toggleModal} className="button--danger">
          Delete
        </button>
      </div>
    </Dialog>
  );
}
