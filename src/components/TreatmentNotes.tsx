import { useEffect, useState } from "react";
import TreatmentNoteDetail, { type TreatmentNote } from "./TreatmentNoteDetail";
import CloseIcon from "./icons/CloseIcon";
import { IPatient } from "../interfaces/Database";

export default function TreatmentNotes({
  treatments,
  refresh = false,
  onUpdate,
  onDelete,
}: {
  treatments: IPatient["treatments"];
  refresh: boolean;
  onUpdate: (treatments: IPatient["treatments"]) => void;
  onDelete: (treatments: IPatient["treatments"]) => void;
}) {
  const [notes, setNotes] = useState<IPatient["treatments"]>([]);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  useEffect(() => {
    setNotes([]);
    setNotes(treatments);
  }, [treatments, refresh]);

  const toggleSelectedRow = (index: number) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
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
    <div className="bg-[color:var(--shiatsu-secondary-bg)] px-2 rounded">
      {notes.map((note, idx) => (
        <div
          key={idx}
          className={
            (selectedRow === idx ? "tr-selected " : "") +
            "flex w-full items-center justify-between px-2 [&:not(:last-child)]:border-b"
          }
          onClick={() => toggleSelectedRow(idx)}
        >
          <TreatmentNoteDetail
            key={idx}
            note={note}
            onUpdate={(note) => onUpdateNote(note, idx)}
            isSelected={selectedRow === idx}
          />
          <button
            type="reset"
            className="w-6 h-6 flex items-center justify-center"
            onClick={() => onDeleteNote(idx)}
          >
            <CloseIcon />
          </button>
        </div>
      ))}
    </div>
  );
}
