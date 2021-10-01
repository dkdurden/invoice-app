import invoices from "../data/data.json";

export function getInvoiceIds() {
  const paths = invoices.map((invoice) => {
    return {
      params: {
        id: invoice.id,
      },
    };
  });
  return paths;
}

export function getInvoiceData(id) {
  const invoice = invoices.find((invoice) => invoice.id === id);

  return invoice;
}
