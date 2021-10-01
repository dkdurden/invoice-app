import Image from "next/image";

import styles from "./Header.module.scss";

export function Header({ children }) {
  return (
    <header className={styles.header}>
      <div className={styles.shape}>
        <Image
          src="/logo.svg"
          alt="logo"
          width={"28px"}
          height={"26px"}
          className={styles.logo}
        />
      </div>
      <div className={styles.group}>
        <button className={styles.toggle}>
          <Image
            src="/icon-moon.svg"
            alt="Theme toggle icon"
            width={"20px"}
            height={"20px"}
          />
        </button>
        <span className={styles.avatar}>
          <Image
            src="/image-avatar.jpg"
            alt="profile avatar"
            width={"32px"}
            height={"32px"}
          />
        </span>
      </div>
    </header>
  );
}
