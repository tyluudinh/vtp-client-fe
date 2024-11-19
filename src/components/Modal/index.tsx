import React, { createContext, useState, useContext, ReactNode } from "react";

interface ModalContextType {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const openModal = (content: ReactNode) => {
    setTimeout(() => {
      setModalContent(content);
      setIsOpen(true);
    }, 200);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-white rounded-lg shadow-lg p-4 w-11/12 max-w-96 relative">
            {modalContent}
            <button
              className={`absolute top-1 right-3 text-xl text-gray-500 hover:text-gray-800 transform transition-transform duration-300 ${
                isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

// Custom hook to use modal
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
