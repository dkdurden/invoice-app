import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { useModalState } from "../../context/app-context";
import { Header } from "../Header/Header";
import { InvoiceFormModal } from "../InvoiceFormModal/InvoiceFormModal";
import styles from "./Layout.module.scss";

export function Layout({ children }) {
  const { open } = useModalState();

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Nextjs Invoice App</title>
      </Head>

      <header className={styles.header}>
        <Header />
      </header>

      <main className={styles.main}>{children}</main>

      {open && <InvoiceFormModal />}
    </div>
  );
}
