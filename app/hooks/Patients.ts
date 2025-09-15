import { useEffect, useMemo, useState } from "react";
import {
  type Patient as DBPatient,
  createPatient,
  updatePatient,
  getPatients,
  deletePatient,
} from "./Database";

export type Patient = DBPatient & {
  lastTreatmentDate: number;
};

export type OrderKey = keyof Patient;
export type OrderDir = "asc" | "desc";

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filter, setFilter] = useState("");
  const [orderKey, setOrderKey] = useState<OrderKey>("lastTreatmentDate");
  const [orderDir, setOrderDir] = useState<OrderDir>("desc");
  const [refresh, setRefresh] = useState(false); // Dummy state to force re-render
  const [loading, setLoading] = useState(false);

  /*
  useEffect(() => {
    setLoading(true);
    getPatients()
      .then((data) => {
        const patientsWithLastTreatment = data.map((patient) => {
          const lastTreatment =
            patient.treatments[patient.treatments.length - 1];
          const lastTreatmentDate = lastTreatment?.date;
          return { ...patient, lastTreatmentDate };
        });
        setPatients(patientsWithLastTreatment);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  /** */

  function loadPatients() {
    setLoading(true);
    getPatients()
      .then((data) => {
        const patientsWithLastTreatment = data.map((patient) => {
          const lastTreatment =
            patient.treatments[patient.treatments.length - 1];
          const lastTreatmentDate = lastTreatment?.date;
          return { ...patient, lastTreatmentDate };
        });
        setPatients(patientsWithLastTreatment);
        setRefresh(!refresh);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const filteredPatients: Patient[] = useMemo(() => {
    return patients
      .filter((patient: Patient) =>
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
  }, [filter, orderKey, orderDir, refresh]);

  //
  function getPatientTreatments(patientId?: Patient["id"]) {
    return patients.find((p) => p.id === patientId);
  }

  function addPatient(data: Partial<DBPatient>) {
    const newPatientId = patients[patients.length - 1]?.id ?? 0;
    const newPatient: DBPatient = {
      id: newPatientId + 1,
      name: "",
      surname: "",
      generalNotes: "",
      treatments: [],
      ...data,
    };

    setLoading(true);
    createPatient(newPatient)
      .then(() => {
        setPatients((prev) => [
          ...prev,
          { ...newPatient, lastTreatmentDate: 0 },
        ]);
        setRefresh(!refresh);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const modifyPatient = (updates: Partial<DBPatient>) => {
    const index = patients.findIndex((p) => p.id === updates.id);
    if (index === -1) {
      return;
    }

    setLoading(true);
    updatePatient(updates.id!, updates)
      .then((patient) => {
        if (!patient) return;

        const lastTreatment = patient.treatments[patient.treatments.length - 1];
        const lastTreatmentDate = lastTreatment?.date || 0;
        const updatedPatient = { ...patient, ...updates, lastTreatmentDate };
        patients[index] = updatedPatient;
        setRefresh(!refresh);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const removePatient = (id: Patient["id"]) => {
    const index = patients.findIndex((p) => p.id === id);
    if (index === -1) {
      return;
    }

    setLoading(true);
    deletePatient(id)
      .then((success) => {
        if (!success) return;

        patients.splice(index, 1);
        setRefresh(!refresh);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    filter,
    setFilter,
    patients: filteredPatients,
    orderDir,
    setOrderDir,
    orderKey,
    setOrderKey,
    loading,

    loadPatients,
    getPatientTreatments,
    addPatient,
    updatePatient: modifyPatient,
    deletePatient: removePatient,
  };
};
