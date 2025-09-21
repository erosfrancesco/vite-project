import { ReactNode } from "react";

export interface IModalContext {
  showModal: (content: ReactNode) => void;
  closeModal: () => void;
}

export interface IModalProviderProps {
  children: ReactNode;
}
