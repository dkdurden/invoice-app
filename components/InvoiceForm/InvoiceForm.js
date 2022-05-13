import Router from "next/router";
import React from "react";
import cn from "classnames";
import { customAlphabet } from "nanoid";

import { FormGroup } from "./FormGroup";
import { Label } from "./Label";
import { DatePicker } from "../DatePicker/DatePicker";
import styles from "./InvoiceForm.module.scss";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { PaymentTermsSelect } from "../PaymentTermsSelect/PaymentTermsSelect";
import { ItemList } from "./ItemList";
import { useInvoices, useModalState } from "../../context/app-context";
import { Input } from "./Input";

const nanoid = customAlphabet("123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);

const initialState = {
  paymentTerms: 30,
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

export function InvoiceForm({ formRef }) {
  const { addInvoice, updateInvoice } = useInvoices();
  const { toggleModal, invoiceData, formAction } = useModalState();
  const aboveBreakpoint = useMediaQuery(768);

  const [state, setState] = React.useState(invoiceData || initialState);
  const [errors, setErrors] = React.useState(null);
  const [errorList, setErrorList] = React.useState([]);

  const handleValueChange = (e) => {
    const { name } = e.target;

    setState((prevState) => ({ ...prevState, [name]: e.target.value }));

    // Clear errors
    if (e.target.value && errors && name in errors) {
      setErrors((prevState) => ({ ...prevState, [name]: false }));
    }
  };

  const updatePaymentTerms = (value) =>
    setState((prevState) => ({
      ...prevState,
      paymentTerms: value,
    }));

  const handleDateChange = React.useCallback((newDate) => {
    setState((prevState) => ({ ...prevState, createdAt: newDate }));
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

    // Clear errors
    if (e.target.value && errors?.[addressFieldName]?.[addressValueName]) {
      setErrors((prevState) => ({
        ...prevState,
        [addressFieldName]: {
          ...prevState[addressFieldName],
          [addressValueName]: false,
        },
      }));
    }
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

    const calculateTotal = (price, quantity) => {
      if (!price || !quantity) {
        return 0;
      }

      const total = parseFloat(price) * parseInt(quantity);

      return isNaN(total) ? 0 : total;
    };

    if (index != null)
      setState((prevState) => ({
        ...prevState,
        items: prevState.items.map((item, itemIndex) => {
          // Not the item we want to change
          if (index !== itemIndex) {
            return item;
          }

          let total;

          if (name === "price") total = calculateTotal(value, item.quantity);
          else if (name === "quantity")
            total = calculateTotal(item.price, value);
          else total = item.total;

          return {
            ...item,
            total,
            [name]: value,
          };
        }),
      }));
  };

  // Handle input error state on blur
  // addressInputID - for nested address inputs, ex. "senderAddress-city"
  // itemIndex - for dynamic item inputs
  const createHandleBlur = (addressInputID, itemIndex) => (e) => {
    if (!e.target.value) {
      if (addressInputID != null) {
        const [addressFieldName, addressValueName] = addressInputID.split("-");

        setErrors((prevState) => {
          if (prevState)
            return {
              ...prevState,
              [addressFieldName]: {
                ...prevState[addressFieldName],
                [addressValueName]: true,
              },
            };

          return {
            [addressFieldName]: {
              [addressValueName]: true,
            },
          };
        });
      } else if (itemIndex != null) {
        setErrors((prevState) => {
          if (prevState)
            return {
              ...prevState,
              items: prevState.items.map((item, index) => {
                if (parseInt(itemIndex) !== index) {
                  return item;
                }

                return {
                  ...item,
                  [e.target.name]: true,
                };
              }),
            };

          let items = [];

          for (let i = 0; i < parseInt(itemIndex); i++) {
            items.push({});
          }

          return {
            items: [],
          };
        });
      } else {
        setErrors((prevState) => ({ ...prevState, [e.target.name]: true }));
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const calculatePaymentDue = (createdAt, paymentTerms) => {
      const paymentDue = new Date(createdAt);
      paymentDue.setDate(paymentDue.getDate() + parseInt(paymentTerms));

      return `${paymentDue.getFullYear()}-${
        paymentDue.getMonth() + 1
      }-${paymentDue.getDate()}`;
    };

    if (formAction === "edit-invoice") {
      const [hasErrors, errorMessages, errors] = validateForm(state);

      if (hasErrors) {
        setErrors(errors);
        setErrorList(errorMessages);
      } else {
        // Invoice total
        const total = state.items.reduce((acc, curr) => {
          acc += parseInt(curr.quantity) * parseFloat(curr.price);
          return acc;
        }, 0);

        // payment due date
        const paymentDue = calculatePaymentDue(
          state.createdAt,
          state.paymentTerms
        );

        const invoiceWithID = {
          ...state,
          total,
          paymentDue,
        };
        updateInvoice(invoiceWithID);
        Router.push("/");
        toggleModal();
      }
    } else {
      // Save as draft
      if (e.target.draft.value === "true") {
        // Invoice total
        const total = state.items.reduce((acc, curr) => {
          acc += parseInt(curr.quantity) * parseFloat(curr.price);
          return acc;
        }, 0);

        // payment due date
        const paymentDue = calculatePaymentDue(
          state.createdAt,
          state.paymentTerms
        );

        const invoiceWithID = {
          ...state,
          id: nanoid(6),
          status: "draft",
          total,
          paymentDue,
        };

        addInvoice(invoiceWithID);
        toggleModal();
        return;
      }

      const [hasErrors, errorMessages, errors] = validateForm(state);

      if (hasErrors) {
        setErrors(errors);
        setErrorList(errorMessages);
      } else {
        // Invoice total
        const total = state.items.reduce((acc, curr) => {
          acc += parseInt(curr.quantity) * parseFloat(curr.price);
          return acc;
        }, 0);

        // payment due date
        const paymentDue = calculatePaymentDue(
          state.createdAt,
          state.paymentTerms
        );

        const invoiceWithID = {
          ...state,
          id: nanoid(6),
          total,
          paymentDue,
          status: "pending",
        };

        addInvoice(invoiceWithID);

        toggleModal();
      }
    }
  };

  return (
    <form id="invoice-form" onSubmit={onSubmit} ref={formRef} method="POST">
      <input type="hidden" name="draft" value="" />
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
            onBlur={createHandleBlur("senderAddress-street")}
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
            onBlur={createHandleBlur("senderAddress-city")}
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
            onBlur={createHandleBlur("senderAddress-postCode")}
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
            onBlur={createHandleBlur("senderAddress-country")}
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
            onBlur={createHandleBlur()}
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
            onBlur={createHandleBlur()}
            error={errors?.clientEmail}
            showError={false}
          />
        </FormGroup>

        <FormGroup className={styles.wide}>
          <Label
            id="to-street-label"
            error={errors?.clientAddress?.street}
            showError
          >
            Street Adress
          </Label>
          <Input
            id="clientAddress-street"
            type="text"
            ariaLabelledBy="bill-to to-street-label"
            value={state.clientAddress.street}
            onChange={handleAddressChange}
            onBlur={createHandleBlur("clientAddress-street")}
            error={errors?.clientAddress?.street}
            showError={false}
          />
        </FormGroup>

        <FormGroup>
          <Label id="to-city-label" error={errors?.clientAddress?.city}>
            City
          </Label>
          <Input
            id="clientAddress-city"
            type="text"
            ariaLabelledBy="bill-to to-city-label"
            value={state.clientAddress.city}
            onChange={handleAddressChange}
            onBlur={createHandleBlur("clientAddress-city")}
            error={errors?.clientAddress?.city}
          />
        </FormGroup>

        <FormGroup>
          <Label id="to-code-label" error={errors?.clientAddress?.postCode}>
            Post Code
          </Label>
          <Input
            id="clientAddress-postCode"
            type="text"
            aria-labelledby="bill-to to-code-label"
            value={state.clientAddress.postCode}
            onChange={handleAddressChange}
            onBlur={createHandleBlur("clientAddress-postCode")}
            error={errors?.clientAddress?.postCode}
          />
        </FormGroup>

        <FormGroup className={!aboveBreakpoint ? styles.wide : null}>
          <Label id="to-country-label" error={errors?.clientAddress?.country}>
            Country
          </Label>
          <Input
            id="clientAddress-country"
            type="text"
            aria-labelledby="bill-to to-country-label"
            value={state.clientAddress.country}
            onChange={handleAddressChange}
            onBlur={createHandleBlur("clientAddress-country")}
            error={errors?.clientAddress?.country}
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
            initialDate={state.createdAt}
          />
        </FormGroup>

        <FormGroup className={!aboveBreakpoint ? styles.wide : null}>
          <Label id="payment-terms" as={"p"}>
            Payment Terms
          </Label>
          <PaymentTermsSelect
            paymentTermsState={state.paymentTerms}
            name="paymentTerms"
            updatePaymentTerms={updatePaymentTerms}
          />
        </FormGroup>

        <FormGroup className={styles.wide}>
          <Label
            htmlFor="project-description"
            error={errors?.description}
            showError
          >
            Project Description
          </Label>
          <Input
            id="project-description"
            placeholder="e.g. Graphic Design Service"
            type="text"
            name="description"
            value={state.description}
            onChange={handleValueChange}
            onBlur={createHandleBlur()}
            error={errors?.description}
            showError={false}
          />
        </FormGroup>
      </div>

      <ItemList
        items={state.items}
        addItem={addItem}
        deleteItem={deleteItem}
        handleItemChange={handleItemChange}
        createHandleBlur={createHandleBlur}
        errors={errors}
      />

      {errorList.length > 0 && (
        <div className={styles.errorList}>
          {errorList.map((error, index) => (
            <p key={index} className={styles.errorMsg}>
              - {error}
            </p>
          ))}
        </div>
      )}
    </form>
  );
}
