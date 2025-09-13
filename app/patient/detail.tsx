import { useParams } from "react-router";
import { usePatients } from "../hooks/Patients";
import TreatmentsLayout from "~/layouts/Treatments";
import TreatmentTable from "~/components/TreatmentTable";

export default function PatientDetail() {
  const { patientId } = useParams();
  const { getPatientTreatments } = usePatients();
  const patient = getPatientTreatments(patientId);

  if (!patient) {
    return (
      <main className="flex items-center justify-center pt-16 pb-4">
        <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
          <span className="text-red-600">Patient not found.</span>
        </div>
      </main>
    );
  }

  return (
    <TreatmentsLayout
      header={
        <h2 className="text-2xl font-bold mb-2 text-[color:var(--shiatsu-primary)]">
          {patient.name} {patient.surname}
        </h2>
      }
      filters={<div></div>}
      main={
        <TreatmentTable
          treatments={patient.treatments || []}
          onCreate={() => {}}
          onUpdate={() => {}}
          onDelete={() => {}}
        />
      }
    />
  );
}
