import { IPatient } from "./Database";

export interface PatientSummaryCardInterface {
  patient: IPatient;
  onUpdate: (data: Partial<IPatient>) => void;
  onDelete: (id: IPatient["_id"]) => void;
}
