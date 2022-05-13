import cn from "classnames";

import styles from "./InvoiceForm.module.scss";

export function Input({
  id,
  type,
  name,
  ariaLabelledBy,
  placeholder,
  className,
  value,
  onChange,
  onBlur,
  error,
  showError = true,
  index,
}) {
  const newClassName = cn(className, error && "invalid");

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
        className={newClassName}
        style={{ width: "100%" }}
        data-index={index}
      />
    </div>
  );
}
