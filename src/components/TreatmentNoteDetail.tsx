import { useEffect, useState } from "react";
import { IPatient } from "../interfaces/Database";

export type TreatmentNote = IPatient["treatments"][number];

export default function TreatmentNoteDetail({
  note,
  isSelected,
  onUpdate
}: {
  note: TreatmentNote;
  isSelected: boolean;
  onUpdate: (note: TreatmentNote) => void;
}) {
  const [editedNotes, setEditedNotes] = useState("");
  const [dateLabel, setDateLabel] = useState("-");

  useEffect(() => {
    const { date, notes } = note;
    const dateLabel = date ? new Date(date).toLocaleDateString() : "-";

    setEditedNotes(notes);
    setDateLabel(dateLabel);
  }, [note]);

  return (
    <div className="w-full flex justify-between items-center">
      <span className="whitespace-nowrap w-30">{dateLabel}</span>
      <input
        className={"flex-1 " + (isSelected ? "cursor-text" : "cursor-pointer")}
        onClick={(e) => {
          if (isSelected) {
            e.stopPropagation();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
            onUpdate({ date: note.date, notes: editedNotes });
          }
        }}
        onChange={(e) => {
          const updatedNotes = e.currentTarget.value;
          setEditedNotes(updatedNotes);
        }}
        type="textarea"
        value={editedNotes}
        readOnly={!isSelected}
      />
    </div>
  );
}
