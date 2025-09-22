import { createContext, PropsWithChildren, useEffect, useState } from "react";
import {
  IPatient,
  IPatientContext,
  PatientCollection,
} from "../interfaces/Database";

const _db = new PatientCollection("shiatsu-notes");

export const PatientContext = createContext<IPatientContext>({
  upsert(_doc) {},
  all() {},
  items: [],
  patient: null,
  remove(_doc) {},
  search(_filter) {},
});

export default function Database(props: PropsWithChildren) {
  const [items, setItems] = useState<IPatient[]>([]);
  const [patient, setPatient] = useState<IPatient | null>(null);

  // UPDATE || CREATE
  function upsert(doc: IPatient) {
    _db
      .upsert(doc)
      .then((res) => {
        all();
      })
      .catch(console.error);
  }

  // DELETE DOCUMENT
  function remove(doc: IPatient) {
    _db
      .remove(doc)
      .then((_) => all())
      .catch(console.error);
  }

  // GET ALL ITEMS
  function all() {
    _db
      .find()
      .then((res) => {
        setItems(res);
      })
      .catch(console.error);
  }

  useEffect(() => {
    all();
  }, []);

  function search(patientId: IPatient["_id"]) {
    _db
      .find({ _id: patientId })
      .then((res) => {
        setPatient(res[0] || null);
      })
      .catch(console.error);
  }

  return (
    <PatientContext.Provider
      value={{
        upsert,
        remove,
        items,
        patient,
        all,
        search,
      }}
    >
      {props.children}
    </PatientContext.Provider>
  );
}
