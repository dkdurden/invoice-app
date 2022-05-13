import { useModalState } from "../../context/app-context";
import { ButtonWithAdd } from "../ButtonWithAdd/ButtonWithAdd";
import { FilterPopover } from "./FilterPopover";
import styles from "./InvoicesHeader.module.scss";

export function InvoicesHeader({ setFilter }) {
  const { toggleModal } = useModalState();

  const onClick = () => {
    toggleModal("add-invoice");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.groupOne}>
          <h1 className="h2">Invoices</h1>
          <span className="text">7 invoices</span>
        </div>

        <div className={styles.groupTwo}>
          <FilterPopover setFilter={setFilter} />
          <div className={styles.newInvoiceBtn}>
            <ButtonWithAdd onClick={onClick}>
              <span className={styles.btnText}>New</span>
            </ButtonWithAdd>
          </div>
        </div>
      </div>
    </>
  );
}
