import { IPatient } from "./Database";

export interface IPatientActionsProps {
  patient: IPatient;
  onUpdate: (data: Partial<IPatient>) => void;
  onDelete: (id: IPatient["_id"]) => void;
}

export interface IPatientActionsCreateProps {
  onCreate: (data: IPatient) => void;
}

export interface IPatientActionsDeleteProps {
  onClose: () => void;
  onConfirm: () => void;
}
