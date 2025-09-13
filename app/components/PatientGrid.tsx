import type { Patient } from "~/hooks/Patients";
import PatientSummaryCard from "./PatientSummaryCard";

interface PatientsListProps {
  patients: Patient[];
  onUpdate: (patient: Partial<Patient>) => void;
  onDelete: (id: Patient["id"]) => void;
}

export default function PatientsGrid({
  patients,
  onUpdate,
  onDelete,
}: PatientsListProps) {
  if (!patients || patients.length === 0) {
    return <p>No patients found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {patients.map((patient) => (
        <PatientSummaryCard
          key={patient.id}
          patient={patient}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
