import React from "react";
import cn from "classnames";
import { nanoid } from "nanoid";

import { FormGroup } from "./FormGroup";
import { Label } from "./Label";
import { DatePicker } from "../DatePicker/DatePicker";
import styles from "./InvoiceForm.module.scss";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { PaymentTermsSelect } from "../PaymentTermsSelect/PaymentTermsSelect";
import { ItemList } from "./ItemList";
import { useInvoices } from "../../context/app-context";
import { Input } from "./Input";

const initialState = {
  id: "",
  paymentDue: "",
  description: "",
  clientName: "",
  clientEmail: "",
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

function validateStateObj(state) {
  let errors = {};
  let errorFound = false;

  for (const key of Object.keys(state)) {
    const value = state[key];

    // Validating input within dynamic item list
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        let itemErrors = validateStateObj(item);

        if (errors.items == null) {
          errors.items = [];
        }

        errors.items[index] = itemErrors;
      });
    }
    // Validating nested input state (senderAddress/clientAddress)
    else if (typeof value === "object") {
      let itemErrors = validateStateObj(value);

      errors[key] = itemErrors;
    }
    // Base case - name/value pair
    else {
      if (!value) {
        errors[key] = true;
        errorFound = true;
      }
    }
  }

  return !errorFound ? null : errors;
}

function validateForm(state) {
  const errorMessages = [];

  if (state.items.length === 0) {
    errorMessages.push("You must add an item");
  }

  const errors = validateStateObj(state);

  if (errors != null) {
    errorMessages.push("All items must not be empty");
  }

  return [errorMessages.length > 0, errorMessages, errors];
}

export function InvoiceForm() {
  const { addInvoice } = useInvoices();
  const aboveBreakpoint = useMediaQuery(768);

  const [state, setState] = React.useState(initialState);
  const [errors, setErrors] = React.useState(null);
  const [errorList, setErrorList] = React.useState([]);

  const handleValueChange = (e) => {
    const { name } = e.target;
    console.log(e.target.value, e.target);
    setState((prevState) => ({ ...prevState, [name]: e.target.value }));

    if (e.target.value && name in errors) {
      console.log(e.target.value, name in errors);
      setErrors((prevState) => ({ ...prevState, [name]: false }));
    }
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

  const addItem = () => {
    setState((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items,
        { name: "", quantity: "", price: "", id: nanoid() },
      ],
    }));
  };

  const deleteItem = (e) => {
    const index = parseInt(e.currentTarget.dataset.index);

    setState((prevState) => ({
      ...prevState,
      items: prevState.items.filter((item, itemIndex) => itemIndex !== index),
    }));
  };

  // Dynamic input change handler for item within invoice
  const handleItemChange = (e) => {
    const index = parseInt(e.target.dataset.index);
    const { name, value } = e.target;

    if (index != null)
      setState((prevState) => ({
        ...prevState,
        items: prevState.items.map((item, itemIndex) => {
          // Not the item we want to change
          if (index !== itemIndex) {
            return item;
          }

          return {
            ...item,
            [name]: value,
          };
        }),
      }));
  };

  // Handle input error state on blur
  const onBlur = (e) => {
    if (!e.target.value) {
      setErrors((prevState) => ({ ...prevState, [e.target.name]: true }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // alert("Submitted!");

    const [hasErrors, errorMessages, errors] = validateForm(state);
    console.log(hasErrors, errorMessages, errors);

    if (hasErrors) {
      setErrors(errors);
      setErrorList(errorMessages);
    } else {
      alert("Submitted!");
    }
  };

  return (
    <form id="invoice-form" onSubmit={onSubmit}>
      <p id="bill-from" className="h4 text-purple mb-3">
        Bill From
      </p>
      <div className={cn("mb-4", styles.grid)}>
        <FormGroup className={styles.wide}>
          <Label
            id="from-street-label"
            error={errors?.senderAddress?.street}
            showError
          >
            Street Address
          </Label>

          <Input
            id="senderAddress-street"
            type="text"
            ariaLabelledBy="bill-from from-street-label"
            value={state.senderAddress.street}
            onChange={handleAddressChange}
            error={errors?.senderAddress?.street}
            showError={false}
          />
        </FormGroup>

        <FormGroup>
          <Label id="from-city-label" error={errors?.senderAddress?.city}>
            City
          </Label>
          <Input
            id="senderAddress-city"
            type="text"
            ariaLabelledBy="bill-from from-city-label"
            value={state.senderAddress.city}
            onChange={handleAddressChange}
            error={errors?.senderAddress?.city}
          />
        </FormGroup>
        <FormGroup>
          <Label id="from-code-label" error={errors?.senderAddress?.postCode}>
            Post Code
          </Label>
          <Input
            id="senderAddress-postCode"
            type="text"
            ariaLabelledBy="bill-from from-code-label"
            value={state.senderAddress.postCode}
            onChange={handleAddressChange}
            error={errors?.senderAddress?.postCode}
          />
        </FormGroup>

        <FormGroup className={!aboveBreakpoint ? styles.wide : null}>
          <Label id="from-country-label" error={errors?.senderAddress?.country}>
            Country
          </Label>
          <Input
            id="senderAddress-country"
            type="text"
            ariaLabelledBy="bill-from from-country-label"
            value={state.senderAddress.country}
            onChange={handleAddressChange}
            error={errors?.senderAddress?.country}
          />
        </FormGroup>
      </div>

      <p id="bill-to" className="h4 text-purple mb-3">
        Bill To
      </p>

      <div className={cn(styles.grid, "mb-4")}>
        <FormGroup className={styles.wide}>
          <Label htmlFor="client-name" error={errors?.clientName} showError>
            Client&apos;s Name
          </Label>
          <Input
            id="client-name"
            type="text"
            name="clientName"
            value={state.clientName}
            onChange={handleValueChange}
            onBlur={onBlur}
            error={errors?.clientName}
            showError={false}
          />
        </FormGroup>

        <FormGroup className={styles.wide}>
          <Label htmlFor="client-email" error={errors?.clientEmail} showError>
            Client&apos;s Email
          </Label>
          <Input
            id="client-email"
            placeholder="e.g. email@example.com"
            type="email"
            name="clientEmail"
            value={state.clientEmail}
            onChange={handleValueChange}
            error={errors?.clientEmail}
            showError={false}
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

      <ItemList
        items={state.items}
        addItem={addItem}
        deleteItem={deleteItem}
        handleItemChange={handleItemChange}
      />
    </form>
  );
}
