import { useModal } from "../context/Modal";
import {
  IPatientActionsDeleteProps,
  IPatientActionsProps,
} from "../interfaces/PatientActions";
import { IPatientActionsCreateProps } from "../interfaces/PatientActions";
import DeleteIcon from "./icons/DeleteIcon";
import PencilIcon from "./icons/PencilIcon";
import { PatientModal } from "./PatientModal";

export function PatientActions({
  patient,
  onUpdate,
  onDelete,
}: IPatientActionsProps) {
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
                onDelete(patient._id);
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

function PatientDeletionConfirmModal({
  onClose,
  onConfirm,
}: IPatientActionsDeleteProps) {
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

// CREATE COMPONENT
export function CreatePatient({ onCreate }: IPatientActionsCreateProps) {
  const { showModal, closeModal } = useModal();

  return (
    <button
      className="ml-2 p-2 rounded text-[color:var(--shiatsu-primary-text)]"
      onClick={() =>
        showModal(<PatientModal onClose={closeModal} onSubmit={onCreate} />)
      }
    >
      Add Patient
    </button>
  );
}
