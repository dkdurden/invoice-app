import React, { useState, useContext, createContext } from "react";

const AppContext = createContext();

// Form modal
export function useModalState() {
  const context = useContext(AppContext);

  return {
    open: context.modalState.open,
    formAction: context.modalState.formAction,
    toggleModal: context.toggleModal,
    invoiceData: context.modalState.invoiceData,
  };
}

export function useInvoices() {
  const context = useContext(AppContext);

  return {
    invoices: context.invoices,
    removeInvoice: context.removeInvoice,
    addInvoice: context.addInvoice,
    updateInvoice: context.updateInvoice,
  };
}

export function useInvoice(id) {
  const context = useContext(AppContext);

  return context.invoices.find((invoice) => invoice.id === id);
}

export function StateProvider({ children, initialInvoices }) {
  // Form modal, need to rename
  const [modalState, setModalState] = useState({
    open: false,
    formAction: null,
    invoiceData: null,
  });

  const [invoices, setInvoices] = useState(initialInvoices);

  const removeInvoice = (id) =>
    setInvoices((prevState) =>
      prevState.filter((invoice) => invoice.id !== id)
    );

  const addInvoice = (invoiceData) => {
    setInvoices((prevState) => [...prevState, invoiceData]);
  };

  const updateInvoice = (invoiceData) =>
    setInvoices((prevState) =>
      prevState.map((invoice) =>
        invoice.id === invoiceData.id ? invoiceData : invoice
      )
    );

  const toggleModal = (formAction, invoiceData) => {
    setModalState((prevState) => {
      if (prevState.open) {
        document.body.style.overflow = "auto";
        return { open: false, formAction: null, invoiceData: null };
      }

      document.body.style.overflow = "hidden";
      return {
        open: true,
        formAction,
        invoiceData,
      };
    });
  };

  const value = {
    // Form modal
    modalState,
    toggleModal,
    invoices,
    removeInvoice,
    addInvoice,
    updateInvoice,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
