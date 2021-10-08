import Head from "next/head";

import { Layout } from "../components/Layout/Layout";
import { InvoicesHeader } from "../components/InvoicesHeader/InvoicesHeader";
import { getAllInvoices } from "../library/invoices";

export async function getStaticProps() {
  const invoices = getAllInvoices();
  return {
    props: {
      invoices,
    },
  };
}

export default function Home({ invoices }) {
  return (
    <Layout>
      <div className="container">
        <InvoicesHeader />
      </div>
    </Layout>
  );
}
