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
      {/* <h1>Home Page</h1>
      <h2>Home Page</h2>
      <h3>Home Page</h3>
      <h4>Home Page</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
        hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet
        vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin
        laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu
        nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et
        vulputate volutpat, eros pede semper est, vitae luctus metus libero eu
        augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida
        id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper
        lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque
        euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu,
        dapibus eu, fermentum et, dapibus sed, urna.
      </p>

      <p className="alt">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
        hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet
        vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin
        laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu
        nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et
        vulputate volutpat, eros pede semper est, vitae luctus metus libero eu
        augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida
        id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper
        lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque
        euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu,
        dapibus eu, fermentum et, dapibus sed, urna.
      </p>

      <button className="button--primary">Mark as Paid</button>
      <button className="button--light">Mark as Paid</button>
      <button className="button--wide">+ Add New Item</button>
      <button className="button--dark">+ Add New Item</button>
      <button className="button--danger">+ Add New Item</button> */}
    </Layout>
  );
}
