import Head from "next/head";
import Image from "next/image";
import "simplebar";

import { useModalState } from "../../context/app-context";
import { InvoiceForm } from "../InvoiceForm/InvoiceForm";
import { FormButtonGroup } from "../FormButtonGroup/FormButtonGroup";
import styles from "./InvoiceFormModal.module.scss";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export function InvoiceFormModal() {
  const { formAction, toggleModal, invoiceData } = useModalState();
  const aboveBreakpoint = useMediaQuery(768);

  const onClick = (e) => {
    toggleModal();
  };

  return (
    <>
      <div className={styles.container} data-simplebar>
        <div className="container">
          <button className="back-link" onClick={onClick}>
            <Image src="/icon-arrow-left.svg" alt="" width="6" height="8" />
            <span className="h4">Go back</span>
          </button>

          {invoiceData ? (
            <h1 className={styles.heading}>
              Edit <span className="text-dark">#</span>
              {invoiceData.id}
            </h1>
          ) : (
            <h1 className={styles.heading}>New Invoice</h1>
          )}

          <InvoiceForm />
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <FormButtonGroup formAction={formAction} />
      </div>
    </>
  );
}
