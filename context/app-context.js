import React, { useState, useContext, createContext } from "react";

const AppContext = createContext();

export function useModalState() {
  const context = useContext(AppContext);

  return {
    open: context.modalState.open,
    formAction: context.modalState.formAction,
    toggleModal: context.toggleModal,
  };
}

export function StateProvider({ children }) {
  const [modalState, setModalState] = useState({
    open: false,
    formAction: null,
  });

  const toggleModal = (formAction) => {
    setModalState((prevState) => {
      if (prevState.open) return { open: false, formAction: null };

      return {
        open: true,
        formAction,
      };
    });
  };

  const value = {
    modalState,
    toggleModal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
