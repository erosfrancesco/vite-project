import { usePatients, type Patient } from "../patient/patients";
import { useNavigate } from "react-router";
import PencilIcon from "./icons/PencilIcon";

function PatientSummaryCard({ patient }: { patient: Patient }) {
  const navigate = useNavigate();

  function goToPatientDetails(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    navigate(`/patients/${patient.id}`);
  }

  function editPatient(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    alert("Edit patient " + patient.id);
  }

  return (
    <div onClick={goToPatientDetails}>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">
          {patient.name} {patient.surname}
        </h2>
        <button
          onClick={editPatient}
          className="p-2 rounded cursor-pointer hover:bg-[color:var(--shiatsu-beige)]"
          title="Edit patient"
        >
          <PencilIcon className="text-[color:var(--shiatsu-gray)]" />
        </button>
      </div>

      <p>{patient.generalNotes}</p>
      <p>
        Last Treated on:{" "}
        {new Date(patient.lastTreatmentDate).toLocaleDateString()}
      </p>
      <p>Treatments: {patient.treatments.length || "None"}</p>
    </div>
  );
}

function PatientSummaryCardWrapper(args: any) {
  return (
    <div
      className={[
        "shadow hover:shadow-lg rounded transition-shadow",
        "border p-4 rounded cursor-pointer",
        "hover:bg-[color:var(--shiatsu-green)] hover:text-[var(--shiatsu-white)]",
      ].join(" ")}
    >
      <div />
      <PatientSummaryCard {...args} />
    </div>
  );
}

interface PatientsListProps {
  className?: string;
}

export default function PatientsList({ className }: PatientsListProps) {
  const { renderOrderIconValue, handleOrder, patients } = usePatients();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {patients.map((patient) => (
        <PatientSummaryCardWrapper key={patient.id} patient={patient} />
      ))}
    </div>
  );
}
