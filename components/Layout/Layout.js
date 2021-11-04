import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Header } from "../Header/Header";
import styles from "./Layout.module.scss";

export function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Nextjs Invoice App</title>
      </Head>
      <header className={`fixed-header ${styles.header}`}>
        <Header />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
