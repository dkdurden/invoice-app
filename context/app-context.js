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

export function StateProvider({ children }) {
  // Form modal, need to rename
  const [modalState, setModalState] = useState({
    open: false,
    formAction: null,
    invoiceData: null,
  });

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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
