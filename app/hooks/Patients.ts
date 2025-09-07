import { useMemo, useState } from "react";
import patients from "../patient/patients.json";

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
  const [updatePatients, setUpdatePatients] = useState(false); // Dummy state to force re-render

  const filteredPatients = useMemo(() => {
    return patients
      .map((patient) => {
        const lastTreatment = patient.treatments[patient.treatments.length - 1];
        const lastTreatmentDate = lastTreatment?.date;
        return { ...patient, lastTreatmentDate };
      })
      .filter((patient) =>
        `${patient.name} ${patient.surname} ${patient.generalNotes} ${patient.treatments.map((t) => t.notes).join(" ")}`
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
  }, [filter, orderKey, orderDir, updatePatients]);

  //
  function getPatientTreatments(patientId?: string) {
    return patients.find((p) => String(p.id) === patientId);
  }

  function addPatient(data: Partial<Patient>) {
    const newPatientId = patients[patients.length - 1]?.id ?? 0;
    const newPatient: Patient = {
      id: newPatientId + 1,
      name: "",
      surname: "",
      generalNotes: "",
      treatments: [],
      lastTreatmentDate: 0,
      ...data,
    };
    patients.push(newPatient);
    setUpdatePatients(!updatePatients);
  }

  const updatePatient = (updatedPatient: Patient) => {
    const index = patients.findIndex((p) => p.id === updatedPatient.id);
    if (index !== -1) {
      patients[index] = updatedPatient;
      setUpdatePatients(!updatePatients);
    }
  };

  return {
    filter,
    setFilter,
    patients: filteredPatients,
    orderDir,
    setOrderDir,
    orderKey,
    setOrderKey,

    getPatientTreatments,
    addPatient,
    updatePatient,
  };
};
