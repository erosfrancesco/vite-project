import { useEffect, useState } from "react";
import PlusIcon from "./icons/PlusIcon";
import TreatmentNoteDetail, { type TreatmentNote } from "./TreatmentNoteDetail";
import CloseIcon from "./icons/CloseIcon";
import { IPatient } from "../interfaces/Database";

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
  const [notes, setNotes] = useState<IPatient["treatments"]>([]);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  // TODO: - Change when treatments change outside. Already done. Check PatientDetail.
  useEffect(() => {
    setNotes(treatments);
  }, [treatments]);

  const toggleSelectedRow = (index: number) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };

  const onCreateNote = () => {
    const newNote = {
      date: new Date().getTime(),
      notes: "",
    };
    onCreate([newNote, ...treatments]);
    setNotes([newNote, ...treatments]);
  };

  const onUpdateNote = (note: TreatmentNote, index: number) => {
    treatments[index] = note;
    onUpdate(treatments);
  };

  const onDeleteNote = (index: number) => {
    treatments.splice(index, 1);
    onDelete(treatments);
    setSelectedRow(null);
  };

  return (
    <>
      <button
        disabled={false}
        className="flex items-center px-2"
        onClick={onCreateNote}
      >
        New note <PlusIcon />
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
          {notes.map((note, idx) => (
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
