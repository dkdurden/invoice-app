import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Layout } from "../../components/Layout/Layout";
import { InvoiceContext } from "../../context/invoice-context";
import { ModalContext } from "../../components/DeleteInvoiceModal/ModalContext";
import { InvoiceStatusBar } from "../../components/InvoiceStatusBar/InvoiceStatusBar";
import { InvoiceDetails } from "../../components/InvoiceDetails/InvoiceDetails";
import { getInvoiceIds, getInvoiceData } from "../../library/invoices";
import { InvoiceButtonGroup } from "../../components/InvoiceButtonGroup/InvoiceButtonGroup";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { DeleteInvoiceModal } from "../../components/DeleteInvoiceModal/DeleteInvoiceModal";

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

  let [modalOpen, setModalOpen] = React.useState(false);
  const toggleModal = () => setModalOpen((prevState) => !prevState);

  return (
    <Layout>
      <InvoiceContext.Provider value={invoiceData}>
        <ModalContext.Provider value={{ modalOpen, toggleModal }}>
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
          <DeleteInvoiceModal />
        </ModalContext.Provider>
      </InvoiceContext.Provider>
    </Layout>
  );
}
