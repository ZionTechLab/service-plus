import React, { createContext, useContext, useState } from "react";
import Modal from "../components/Modal";

const ModalContext = createContext();

export function useModalService() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }) {
  const [modalConfig, setModalConfig] = useState(null);

  const openModal = (config) => setModalConfig(config);
  const closeModal = () => setModalConfig(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalConfig?.component && (
        <Modal
          show={true}
          onClose={closeModal}
          title={modalConfig.title}
        >
          {modalConfig.component}
        </Modal>
      )}
    </ModalContext.Provider>
  );
}
