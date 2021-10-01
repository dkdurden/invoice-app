import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Header } from "../Header/Header";
import styles from "./Layout.module.scss";

export function Layout({ children }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Nextjs Invoice App</title>
      </Head>
      <Header />
      <main>{children}</main>
    </div>
  );
}
