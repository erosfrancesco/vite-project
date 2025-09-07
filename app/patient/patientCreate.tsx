import { useEffect, useState } from "react";
import { type Patient } from "../hooks/Patients";
import CloseIcon from "~/components/icons/CloseIcon";
import { useModal } from "~/components/Modal";

export function PatientModal({
  // open,
  onClose,
  onSubmit,
  patient,
}: {
  // open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Patient>) => void;
  patient?: Patient;
}) {
  const [name, setName] = useState(patient?.name || "");
  const [surname, setSurname] = useState(patient?.surname || "");
  const [generalNotes, setGeneralNotes] = useState(patient?.generalNotes || "");

  /*
  useEffect(() => {
    if (!open) {
      setName("");
      setSurname("");
      setGeneralNotes("");
    }
  }, [open]);

  if (!open) return null;
  /** */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, surname, generalNotes });
    setName("");
    setSurname("");
    setGeneralNotes("");
    onClose();
  };

  const handleOuterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInnerClick =
    (setValue: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.stopPropagation();
      setValue(e.target.value);
    };

  return (
    <div
      className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50"
      onClick={handleOuterClick}
    >
      <div className="p-6 rounded shadow-lg min-w-[300px] bg-[color:var(--shiatsu-primary-bg)] text-[color:var(--shiatsu-text)]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Create Patient</h2>
          <button
            type="button"
            className="button_accent w-6 h-6 rounded-full flex items-center justify-center"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            className="border p-2 rounded"
            placeholder="Name"
            value={name}
            onChange={handleInnerClick(setName)}
            required
            autoFocus
          />
          <input
            className="border p-2 rounded"
            placeholder="Surname"
            value={surname}
            onChange={handleInnerClick(setSurname)}
          />
          <textarea
            className="border p-2 rounded"
            placeholder="General Notes"
            value={generalNotes}
            onChange={handleInnerClick(setGeneralNotes)}
          />

          <button
            type="submit"
            className="px-3 py-1 rounded"
            onClick={handleSubmit}
          >
            {patient ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}

// CREATE COMPONENT
export function CreatePatient({
  onCreate,
}: {
  onCreate: (data: Partial<Patient>) => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const { showModal, closeModal } = useModal();

  return (
    <button
      className="ml-2 p-2 rounded"
      onClick={() =>
        showModal(<PatientModal onClose={closeModal} onSubmit={onCreate} />)
      }
    >
      Add Patient
    </button>
  );
}
