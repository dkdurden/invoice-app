import Image from "next/image";

import styles from "./ButtonWithAdd.module.scss";

export function ButtonWithAdd({ children, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      <span className={styles.span}>
        <Image src="/icon-plus.svg" alt="" width={"10"} height={"10"} />
      </span>
      <span className={styles.text}>{children}</span>
    </button>
  );
}
