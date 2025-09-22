import { createContext, useContext, useState, type ReactNode } from "react";
import { IModalContext, IModalProviderProps } from "../interfaces/Modal";

const ModalContext = createContext<IModalContext | undefined>(undefined);

export default function ModalProvider({ children }: IModalProviderProps) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const showModal = (modalContent: ReactNode) => {
    setContent(modalContent);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setContent(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {open && (
        <div
          className="bg-black fixed inset-0 bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="p-6 rounded shadow-lg min-w-[300px]"
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within a ModalProvider");
  return ctx;
}
