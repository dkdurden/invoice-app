import cn from "classnames";
import { useModalState } from "../../context/app-context";

import { useMediaQuery } from "../../hooks/useMediaQuery";
import styles from "./FormButtonGroup.module.scss";

export function FormButtonGroup({ formAction }) {
  const { toggleModal } = useModalState();

  const aboveBreakpoint = useMediaQuery(768);

  const shadowClass = styles.shadow;

  const handleClose = () => toggleModal();

  if (formAction === "edit-invoice")
    return (
      <div
        className={cn(styles.container, styles.editGroup, {
          shadowClass: !aboveBreakpoint,
        })}
      >
        <button className="button--light mx-1" onClick={handleClose}>
          Cancel
        </button>
        <button className="button--primary">Save Changes</button>
      </div>
    );
  else if (formAction === "add-invoice")
    return (
      <div className={cn(styles.container, styles.addGroup)}>
        <button className="button--light" onClick={handleClose}>
          Discard
        </button>
        <div>
          <button className="button--dark mx-1">Save as Draft</button>
          <button className="button--primary">{"Save & Send"}</button>
        </div>
      </div>
    );
  else return null;
}
