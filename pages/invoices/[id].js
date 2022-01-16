import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Layout } from "../../components/Layout/Layout";
import { InvoiceContext } from "../../context/invoice-context";
import { InvoiceStatusBar } from "../../components/InvoiceStatusBar/InvoiceStatusBar";
import { InvoiceDetails } from "../../components/InvoiceDetails/InvoiceDetails";
import { getInvoiceIds, getInvoiceData } from "../../library/invoices";
import { InvoiceButtonGroup } from "../../components/InvoiceButtonGroup/InvoiceButtonGroup";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export async function getStaticPaths() {
  const paths = getInvoiceIds();
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const invoiceData = await getInvoiceData(params.id);

  return {
    props: {
      invoiceData,
    },
  };
}

export default function Invoice({ invoiceData }) {
  const aboveBreakpoint = useMediaQuery(768);

  return (
    <Layout>
      {/* <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/simplebar@latest/dist/simplebar.css"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/simplebar@latest/dist/simplebar.min.js"
          defer
        ></script>
      </Head> */}
      <InvoiceContext.Provider value={invoiceData}>
        <div className="container">
          <Link href="/">
            <a className="back-link">
              <Image src="/icon-arrow-left.svg" alt="" width="6" height="8" />
              <span className="h4">Go back</span>
            </a>
          </Link>
          <InvoiceStatusBar />

          <InvoiceDetails />
        </div>

        {!aboveBreakpoint && <InvoiceButtonGroup />}
      </InvoiceContext.Provider>
    </Layout>
  );
}
