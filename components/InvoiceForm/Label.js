import cn from "classnames";

import styles from "./InvoiceForm.module.scss";

export function Label({
  children,
  as = "label",
  error,
  showError = false,
  ...props
}) {
  const Element = as;
  return (
    <div className={styles.labelGroup}>
      <Element className={cn(styles.label, error && "text-danger")} {...props}>
        {children}
      </Element>

      {error && showError && (
        <span className={styles.errorMsg}>can&apos;t be empty</span>
      )}
    </div>
  );
}
