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
  remove(_doc) {},
});

export default function Database(props: PropsWithChildren) {
  const [items, setItems] = useState<IPatient[]>([]);

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

  return (
    <PatientContext.Provider
      value={{
        upsert,
        remove,
        items,
        all,
      }}
    >
      {props.children}
    </PatientContext.Provider>
  );
}
