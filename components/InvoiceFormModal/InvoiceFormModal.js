import Link from "next/link";
import Image from "next/image";

import { useModalState } from "../../context/app-context";
import { InvoiceForm } from "../InvoiceForm/InvoiceForm";
import { FormButtonGroup } from "../FormButtonGroup/FormButtonGroup";
import styles from "./InvoiceFormModal.module.scss";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export function InvoiceFormModal() {
  const { formAction, toggleModal } = useModalState();
  const aboveBreakpoint = useMediaQuery(768);

  const onClick = (e) => {
    toggleModal();
  };
  return (
    <div className={styles.container}>
      <div className="container">
        <button className="back-link" onClick={onClick}>
          <Image src="/icon-arrow-left.svg" alt="" width="6" height="8" />
          <span className="h4">Go back</span>
        </button>

        <InvoiceForm />
      </div>

      <FormButtonGroup formAction="edit-invoice" />
    </div>
  );
}
