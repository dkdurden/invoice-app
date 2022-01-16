import styles from "./InvoiceForm.module.scss";

export function Label({ children, as = "label", ...props }) {
  const Element = as;
  return (
    <Element className={styles.label} {...props}>
      {children}
    </Element>
  );
}
