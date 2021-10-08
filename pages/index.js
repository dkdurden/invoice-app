import Image from "next/image";

import { Layout } from "../components/Layout/Layout";
import { InvoicesHeader } from "../components/InvoicesHeader/InvoicesHeader";
import { Invoice } from "../components/Invoice/Invoice";
import { EmptyInvoices } from "../components/EmptyInvoices/EmptyInvoices";
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
  const showInvoices = true;
  return (
    <Layout>
      <div className="container">
        <InvoicesHeader />

        <div className="content">
          {showInvoices ? <Invoice invoice={invoices[0]} /> : <EmptyInvoices />}
        </div>
      </div>
    </Layout>
  );
}
