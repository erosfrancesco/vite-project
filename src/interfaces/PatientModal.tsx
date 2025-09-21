import { IPatient } from "./Database";

export interface IPatientModalProps {
  onClose: () => void;
  onSubmit: (data: IPatient) => void;
  patient?: IPatient;
}
