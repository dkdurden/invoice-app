import cn from "classnames";

import styles from "./InvoiceForm.module.scss";

export function Input({
  id,
  type,
  name,
  ariaLabelledBy,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  showError = true,
}) {
  return (
    <div className={cn(styles.input, error && showError && styles.invalid)}>
      <input
        id={id}
        type={type}
        name={name}
        aria-labelledby={ariaLabelledBy}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={cn("test", error && "invalid")}
        style={{ width: "100%" }}
      />
    </div>
  );
}
