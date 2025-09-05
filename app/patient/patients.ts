import { useState } from "react";
import patients from "./patients.json";

export type Patient = {
  id: number;
  name: string;
  surname: string;
  generalNotes: string;
  treatments: {
    notes: string;
    date: number;
  }[];

  lastTreatmentDate: number;
};

export type OrderKey = keyof Patient;
export type OrderDir = "asc" | "desc";

export const usePatients = () => {
  const [filter, setFilter] = useState("");
  const [orderKey, setOrderKey] = useState<OrderKey>("lastTreatmentDate");
  const [orderDir, setOrderDir] = useState<OrderDir>("desc");

  const filteredPatients = [...patients]
    .map((patient) => {
      const lastTreatment = patient.treatments[patient.treatments.length - 1];
      const lastTreatmentDate = lastTreatment?.date;
      return { ...patient, lastTreatmentDate };
    })
    .filter((patient) =>
      `${patient.name} ${patient.surname} ${patient.generalNotes}`
        .toLowerCase()
        .includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      let aVal = a[orderKey];
      let bVal = b[orderKey];
      if (orderKey === "lastTreatmentDate") {
        aVal = new Date(a.lastTreatmentDate).getTime();
        bVal = new Date(b.lastTreatmentDate).getTime();
      }
      if (orderKey === "treatments") {
        aVal = a.treatments.length;
        bVal = b.treatments.length;
      }
      if (typeof aVal === "string" && typeof bVal === "string") {
        if (orderDir === "asc") return aVal.localeCompare(bVal);
        else return bVal.localeCompare(aVal);
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        if (orderDir === "asc") return aVal - bVal;
        else return bVal - aVal;
      }
      return 0;
    });

  //
  function handleOrder(key: OrderKey) {
    if (orderKey === key) {
      setOrderDir(orderDir === "asc" ? "desc" : "asc");
    } else {
      setOrderKey(key);
      setOrderDir("desc");
    }
  }

  function renderOrderIconValue(key: OrderKey) {
    return orderKey === key ? (orderDir === "desc" ? "↓" : "↑") : "";
  }
  //

  //
  function getPatientTreatments(patientId?: string) {
    return patients.find((p) => String(p.id) === patientId);
  }

  return {
    filter,
    setFilter,
    patients: filteredPatients,
    handleOrder,
    renderOrderIconValue,
    getPatientTreatments,
  };
};
