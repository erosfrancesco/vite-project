import { useState } from "react";
import PlusIcon from "./icons/PlusIcon";
import TreatmentNoteDetail, { type TreatmentNote } from "./TreatmentNoteDetail";
import CloseIcon from "./icons/CloseIcon";
import { IPatient } from "../interfaces/Database";
import { on } from "pouchdb-browser";

export default function TreatmentNotes({
  treatments,
  onCreate,
  onUpdate,
  onDelete,
}: {
  treatments: IPatient["treatments"];
  onCreate: (treatments: IPatient["treatments"]) => void;
  onUpdate: (treatments: IPatient["treatments"]) => void;
  onDelete: (treatments: IPatient["treatments"]) => void;
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

  const onCreateNote = (note: TreatmentNote) => {
    console.log("Creating note:", note);
    onCreate([note, ...treatments]);
    setNewNote(null);
    setSelectedRow(null);
  };

  const onUpdateNote = (note: TreatmentNote, index: number) => {
    console.log("Updating note:", note);
    treatments[index] = note;
    onUpdate(treatments);
  };

  const onDeleteNote = (index: number) => {
    console.log("Deleting note at index:", index);
    treatments.splice(index, 1);
    onDelete(treatments);
    setSelectedRow(null);
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
                onUpdate={onCreateNote}
              />
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
                onUpdate={(note) => onUpdateNote(note, idx)}
                isSelected={selectedRow === idx}
              />
              <td>
                <button
                  type="reset"
                  className="flex items-center"
                  onClick={() => onDeleteNote(idx)}
                >
                  <CloseIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
