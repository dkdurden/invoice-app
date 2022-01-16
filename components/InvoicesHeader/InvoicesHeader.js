import Image from "next/image";
import { useModalState } from "../../context/app-context";

import { ButtonWithAdd } from "../ButtonWithAdd/ButtonWithAdd";
import styles from "./InvoicesHeader.module.scss";

export function InvoicesHeader() {
  const { toggleModal } = useModalState();

  const onClick = () => {
    toggleModal("add-invoice");
  };

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
              width={"12.69"}
              height={"7.5"}
            />
          </span>
        </button>
        <ButtonWithAdd text="New" onClick={onClick} />
      </div>
    </div>
  );
}
