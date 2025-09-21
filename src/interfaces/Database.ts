import { IModel, PouchCollection } from "pouchorm";

export interface ITreatmentNote {
  notes: string;
  date: number;
}

export interface IPatient extends IModel {
  name: string;
  surname?: string;
  generalNotes?: string;
  treatments: ITreatmentNote[];
}

export class PatientCollection extends PouchCollection<IPatient> {}

export interface IPatientContext {
  upsert: (doc: IPatient) => void;
  remove: (doc: IPatient) => void;
  items: IPatient[];
  all: () => void;
}
