import { useNavigate } from "react-router";
import PencilIcon from "./icons/PencilIcon";
import DeleteIcon from "./icons/DeleteIcon";
import type { Patient } from "~/hooks/Patients";
import { useModal } from "./Modal";
import { PatientModal } from "~/patient/patientCreate";

interface PatientSummaryCardInterface {
  patient: Patient;
  onUpdate: (data: Partial<Patient>) => void;
  onDelete: (id: Patient["id"]) => void;
}

export default function PatientSummaryCardStyling({
  ...args
}: PatientSummaryCardInterface) {
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

function PatientSummaryCard({
  patient,
  onUpdate,
  onDelete,
}: PatientSummaryCardInterface) {
  const navigate = useNavigate();

  function goToPatientDetails(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    navigate(`/patients/${patient.id}`);
  }

  return (
    <div onClick={goToPatientDetails} className="flex justify-between">
      <div className="flex flex-col justify-between items-start">
        <h2 className="text-xl font-bold mb-2">
          {patient.name} {patient.surname}
        </h2>

        <p>{patient.generalNotes}</p>
        <p>
          Last Treated on:{" "}
          {new Date(patient.lastTreatmentDate).toLocaleDateString()}
        </p>
        <p>Treatments: {patient.treatments.length || "None"}</p>
      </div>

      <PatientActions
        patient={patient}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </div>
  );
}

function PatientActions({
  patient,
  onUpdate,
  onDelete,
}: PatientSummaryCardInterface) {
  const { showModal, closeModal } = useModal();

  return (
    <div className="flex flex-col gap-2">
      <button
        className="p-2 rounded cursor-pointer"
        title="Edit patient"
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
      >
        <PencilIcon />
      </button>
      <button
        className="p-2 rounded cursor-pointer"
        title="Delete patient"
        type="reset"
        onClick={(e) => {
          e.stopPropagation();
          showModal(
            <PatientDeletionConfirmModal
              onClose={closeModal}
              onConfirm={() => {
                onDelete(patient.id);
                closeModal();
              }}
            />
          );
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}

export function PatientDeletionConfirmModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm();
  };

  const handleOuterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50"
      onClick={handleOuterClick}
    >
      <div className="p-6 rounded shadow-lg min-w-[300px] bg-[color:var(--shiatsu-primary-bg)] text-[color:var(--shiatsu-text)]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">
            Are you sure you want to delete this patient?
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex justify-between gap-2 mt-4">
            <button
              type="submit"
              className="px-3 py-1 rounded"
              onClick={handleSubmit}
            >
              Yes
            </button>
            <button
              type="reset"
              className="px-3 py-1 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
