import { useState } from "react";
import { type Patient } from "../hooks/Patients";
import PlusIcon from "./icons/PlusIcon";
import TreatmentNoteDetail, { type TreatmentNote } from "./TreatmentNote";
import CloseIcon from "./icons/CloseIcon";

export default function TreatmentTable({
  treatments,
}: {
  treatments: Patient["treatments"];
  onCreate: (treatment: TreatmentNote) => void;
  onUpdate: (treatment: Partial<TreatmentNote>) => void;
  onDelete: (treatmentId: number) => void;
}) {
  const [newNote, setNewNote] = useState<TreatmentNote | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const toggleSelectedRow = (index: number) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };

  const toggleNewNote = () => {
    setNewNote({
      date: new Date().getTime(),
      notes: "",
    });

    setSelectedRow(0);
  };

  const onCreate = (note: TreatmentNote) => {
    console.log("Creating note:", note);
  };

  const onUpdate = (note: TreatmentNote) => {
    console.log("Updating note:", note);
  };

  const onDelete = (index: number) => {
    console.log("Deleting note at index:", index);
  };

  return (
    <>
      <button
        disabled={!!newNote}
        className="flex items-center px-2"
        onClick={toggleNewNote}
      >
        Add note <PlusIcon />
      </button>
      {treatments.length ? (
        <table>
          <thead>
            <tr>
              <th className="w-1 whitespace-nowrap">Date</th>
              <th>Notes</th>
              <th className="w-1 whitespace-nowrap"></th>
            </tr>
          </thead>
          <tbody>
            {newNote && (
              <tr className="tr-selected">
                <TreatmentNoteDetail
                  note={newNote}
                  isSelected={selectedRow === 0}
                  onUpdate={onCreate}
                />
                <td></td>
              </tr>
            )}
            {treatments.map((note, idx) => (
              <tr
                key={idx}
                className={selectedRow === idx ? "tr-selected" : ""}
                onClick={() => toggleSelectedRow(idx)}
              >
                <TreatmentNoteDetail
                  key={idx}
                  note={note}
                  onUpdate={onUpdate}
                  isSelected={selectedRow === idx}
                />
                <td>
                  <button
                    type="reset"
                    className="flex items-center"
                    onClick={() => onDelete(idx)}
                  >
                    <CloseIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="p-4">No notes yet.</p>
      )}
    </>
  );
}
