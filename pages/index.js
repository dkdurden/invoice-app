import React, { useState } from "react";

import { Layout } from "../components/Layout/Layout";
import { InvoicesHeader } from "../components/InvoicesHeader/InvoicesHeader";
import { EmptyInvoices } from "../components/EmptyInvoices/EmptyInvoices";
import { getAllInvoices } from "../library/invoices";
import { Invoices } from "../components/Invoices/Invoices";
import { useInvoices } from "../context/app-context";

// export async function getStaticProps() {
//   const invoices = getAllInvoices();
//   return {
//     props: {
//       invoices,
//     },
//   };
// }

export default function Home() {
  const { invoices } = useInvoices();

  const showInvoices = invoices && invoices.length > 0;

  return (
    <Layout>
      <div className="container">
        <InvoicesHeader />

        <div className="content">
          {showInvoices ? <Invoices invoices={invoices} /> : <EmptyInvoices />}
        </div>
      </div>
    </Layout>
  );
}
