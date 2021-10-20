import { Invoice } from "../Invoice/Invoice";

export function Invoices({ invoices }) {
  return (
    <>
      {invoices.map((invoice) => {
        return <Invoice key={invoice.id} invoice={invoice} />;
      })}
    </>
  );
}
