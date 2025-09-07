import { useNavigate } from "react-router";
import PencilIcon from "./icons/PencilIcon";
import type { Patient } from "~/hooks/Patients";
import { useModal } from "./Modal";
import { PatientModal } from "~/patient/patientCreate";

function PatientSummaryCard({
  patient,
  onUpdate,
}: {
  patient: Patient;
  onUpdate: (data: Partial<Patient>) => void;
}) {
  const { showModal, closeModal } = useModal();
  const navigate = useNavigate();

  function goToPatientDetails(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    navigate(`/patients/${patient.id}`);
  }

  return (
    <div onClick={goToPatientDetails}>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">
          {patient.name} {patient.surname}
        </h2>
        <button
          onClick={(e) => {
            e.stopPropagation();
            showModal(
              <PatientModal
                onClose={closeModal}
                onSubmit={(data) => {
                  onUpdate({ ...patient, ...data });
                }}
                patient={patient}
              />
            );
          }}
          className="p-2 rounded cursor-pointer hover:bg-[color:var(--shiatsu-primary-text)]"
          title="Edit patient"
        >
          <PencilIcon className="text-[color:var(--shiatsu-secondary-bg)]" />
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

function PatientSummaryCardStyling({ ...args }: any) {
  return (
    <div
      className={[
        "shadow hover:shadow-lg rounded transition-shadow",
        "border p-4 rounded cursor-pointer",
        "hover:bg-[color:var(--shiatsu-secondary)] hover:text-[var(--shiatsu-text)]",
      ].join(" ")}
    >
      <PatientSummaryCard {...args} />
    </div>
  );
}

interface PatientsListProps {
  patients?: Patient[];
  onUpdate?: (patient: Patient) => void;
}

export default function PatientsGrid({
  patients,
  onUpdate,
}: PatientsListProps) {
  if (!patients || patients.length === 0) {
    return <p>No patients found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {patients.map((patient) => (
        <PatientSummaryCardStyling
          key={patient.id}
          patient={patient}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
