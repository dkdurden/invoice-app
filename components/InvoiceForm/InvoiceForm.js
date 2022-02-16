import React from "react";
import cn from "classnames";

import { FormGroup } from "./FormGroup";
import { Label } from "./Label";
import { DatePicker } from "../DatePicker/DatePicker";
import styles from "./InvoiceForm.module.scss";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { PaymentTermsSelect } from "../PaymentTermsSelect/PaymentTermsSelect";
import { ItemList } from "./ItemList";
import { useInvoices } from "../../context/app-context";

const initialState = {
  id: "",
  createdAt: "",
  paymentDue: "",
  description: "",
  paymentTerms: "",
  clientName: "",
  clientEmail: "",
  status: "",
  senderAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  clientAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  items: [],
  total: "",
};

export function InvoiceForm() {
  const { addInvoice } = useInvoices;
  const aboveBreakpoint = useMediaQuery(768);

  const [state, setState] = React.useState(initialState);

  const handleValueChange = (e) => {
    const { name } = e.target;
    setState((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const handleDateChange = React.useCallback((newDate) => {
    setState((prevState) => ({ ...prevState, paymentDue: newDate }));
  }, []);

  const handleAddressChange = (e) => {
    // The id on the address input should be of the format adressFieldName-addressValueName
    const [addressFieldName, addressValueName] = e.target.id.split("-");

    setState((prevState) => ({
      ...prevState,
      [addressFieldName]: {
        ...prevState[addressFieldName],
        [addressValueName]: e.target.value,
      },
    }));
  };

  const addItem = (item) => {
    setState((prevState) => ({
      ...prevState,
      items: [...prevState.items, item],
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    alert("Submitted!");
  };

  return (
    <form id="invoice-form" onSubmit={onSubmit}>
      <p id="bill-from" className="h4 text-purple mb-3">
        Bill From
      </p>
      <div className={cn("mb-4", styles.grid)}>
        <FormGroup className={styles.wide}>
          <Label id="from-street-label">Street Address</Label>
          <input
            id="senderAddress-street"
            type="text"
            aria-labelledby="bill-from from-street-label"
            value={state.senderAddress.street}
            onChange={handleAddressChange}
          />
        </FormGroup>

        <FormGroup>
          <Label id="from-city-label">City</Label>
          <input
            id="senderAddress-city"
            type="text"
            aria-labelledby="bill-from from-city-label"
            value={state.senderAddress.city}
            onChange={handleAddressChange}
          />
        </FormGroup>
        <FormGroup>
          <Label id="from-code-label">Post Code</Label>
          <input
            id="senderAddress-postCode"
            type="text"
            aria-labelledby="bill-from from-code-label"
            value={state.senderAddress.postCode}
            onChange={handleAddressChange}
          />
        </FormGroup>

        <FormGroup className={!aboveBreakpoint ? styles.wide : null}>
          <Label id="from-country-label">Country</Label>
          <input
            id="senderAddress-country"
            type="text"
            aria-labelledby="bill-from from-country-label"
            value={state.senderAddress.country}
            onChange={handleAddressChange}
          />
        </FormGroup>
      </div>

      <p id="bill-to" className="h4 text-purple mb-3">
        Bill To
      </p>

      <div className={cn(styles.grid, "mb-4")}>
        <FormGroup className={styles.wide}>
          <Label htmlFor="client-name">Client&apos;s Name</Label>
          <input
            id="client-name"
            type="text"
            name="clientName"
            value={state.clientName}
            onChange={handleValueChange}
          />
        </FormGroup>

        <FormGroup className={styles.wide}>
          <Label htmlFor="client-email">Client&apos;s Email</Label>
          <input
            id="client-email"
            placeholder="e.g. email@example.com"
            type="email"
            name="clientEmail"
            value={state.clientEmail}
            onChange={handleValueChange}
          />
        </FormGroup>

        <FormGroup className={styles.wide}>
          <Label id="to-street-label">Street Adress</Label>
          <input
            id="clientAddress-street"
            type="text"
            aria-labelledby="bill-to to-street-label"
            value={state.clientAddress.street}
            onChange={handleAddressChange}
          />
        </FormGroup>

        <FormGroup>
          <Label id="to-city-label">City</Label>
          <input
            id="clientAddress-city"
            type="text"
            aria-labelledby="bill-to to-city-label"
            value={state.clientAddress.city}
            onChange={handleAddressChange}
          />
        </FormGroup>

        <FormGroup>
          <Label id="to-code-label">Post Code</Label>
          <input
            id="clientAddress-postCode"
            type="text"
            aria-labelledby="bill-to to-code-label"
            value={state.clientAddress.postCode}
            onChange={handleAddressChange}
          />
        </FormGroup>

        <FormGroup className={!aboveBreakpoint ? styles.wide : null}>
          <Label id="to-country-label">Country</Label>
          <input
            id="clientAddress-country"
            type="text"
            aria-labelledby="bill-to to-country-label"
            value={state.clientAddress.country}
            onChange={handleAddressChange}
          />
        </FormGroup>
      </div>

      <div className={cn(styles.grid__lg)}>
        <FormGroup className={!aboveBreakpoint ? styles.wide : null}>
          <Label id="invoice-date" as={"p"}>
            Invoice Date
          </Label>
          <DatePicker
            aria-describedby="invoice-date"
            onDateChange={handleDateChange}
          />
        </FormGroup>

        <FormGroup className={!aboveBreakpoint ? styles.wide : null}>
          <Label id="payment-terms" as={"p"}>
            Payment Terms
          </Label>
          <PaymentTermsSelect />
        </FormGroup>

        <FormGroup className={styles.wide}>
          <Label htmlFor="project-description">Project Description</Label>
          <input
            id="project-description"
            placeholder="e.g. Graphic Design Service"
            type="text"
            name="description"
            value={state.description}
            onChange={handleValueChange}
          />
        </FormGroup>
      </div>

      <ItemList />
    </form>
  );
}
