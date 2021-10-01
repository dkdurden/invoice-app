import { Layout } from "../../components/Layout/Layout";

import { getInvoiceIds, getInvoiceData } from "../../library/invoices";

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
  return (
    <Layout>
      <div>
        <p>{invoiceData.description}</p>
      </div>
    </Layout>
  );
}
