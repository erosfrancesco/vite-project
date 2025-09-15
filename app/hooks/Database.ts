import Loki from "lokijs";
import hydrationData from "../patient/patients.json";

export type TreatmentNote = {
  notes: string;
  date: number;
};

export type Patient = {
  id: number;
  name: string;
  surname: string;
  generalNotes: string;
  treatments: TreatmentNote[];
};

const db = new Loki("patients.db");
const patients: Loki.Collection<Patient> = db.addCollection("patients", {
  unique: ["id"],
});

hydrateDatabase().catch((err) => {
  console.error("Error hydrating database:", err);
});

// CREATE
export async function createPatient(data: Patient): Promise<Patient> {
  return patients.insert(data)!;
}

// READ (all or by query)
export async function getPatients(query: any = {}): Promise<Patient[]> {
  return patients.find(query);
}

// UPDATE (by id)
export async function updatePatient(
  id: Patient["id"],
  updates: Partial<Patient>
): Promise<Patient | null> {
  const patient = patients.findOne({ id });
  if (patient) {
    Object.assign(patient, updates);
    patients.update(patient);
    return patient;
  }
  return null;
}

// DELETE (by id)
export async function deletePatient(id: Patient["id"]): Promise<boolean> {
  const patient = patients.findOne({ id });
  if (patient) {
    patients.remove(patient);
    return true;
  }
  return false;
}

// HYDRATE DATABASE WITH INITIAL DATA
export async function hydrateDatabase() {
  if (patients.count() === 0) {
    const promises = hydrationData.map((patient) => {
      return patients.insert(patient);
    });
    await Promise.all(promises);
  }
}
