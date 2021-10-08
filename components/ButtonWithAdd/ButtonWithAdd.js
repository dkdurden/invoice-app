import Image from "next/image";

import styles from "./ButtonWithAdd.module.scss";

export function ButtonWithAdd({ text }) {
  return (
    <button className={styles.button}>
      <span className={styles.span}>
        <Image src="/icon-plus.svg" alt="" width={"10"} height={"10"} />
      </span>
      {text}
    </button>
  );
}