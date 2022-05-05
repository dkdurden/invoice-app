import Image from "next/image";
import React from "react";

import useLocalStorage from "../../hooks/useLocalStorage";
import styles from "./Header.module.scss";

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  React.useEffect(() => {
    if (theme === "dark") {
      window.document.body.classList.add("dark");
    } else {
      window.document.body.classList.remove("dark");
    }
  }, [theme]);

  const toggle = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <button className={styles.toggle} onClick={toggle}>
      {theme === "dark" ? (
        <Image
          src="/icon-sun.svg"
          alt="Theme toggle icon"
          width={"20px"}
          height={"20px"}
        />
      ) : (
        <Image
          src="/icon-moon.svg"
          alt="Theme toggle icon"
          width={"20px"}
          height={"20px"}
        />
      )}
    </button>
  );
}

export function Header() {
  return (
    <>
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
        <ThemeToggle />

        <span className={styles.avatar}>
          <Image
            src="/image-avatar.jpg"
            alt="profile avatar"
            width={"32px"}
            height={"32px"}
          />
        </span>
      </div>
    </>
  );
}
