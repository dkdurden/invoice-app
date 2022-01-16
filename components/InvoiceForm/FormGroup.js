import cn from "classnames";

import styles from "./InvoiceForm.module.scss";

export function FormGroup({ children, className, ...props }) {
  return (
    <div className={cn(styles.group, className)} {...props}>
      {children}
    </div>
  );
}
