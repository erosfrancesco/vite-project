import { useState } from "react";
import { type Patient } from "../hooks/Patients";

export type TreatmentNote = Patient["treatments"][number];

export default function TreatmentNoteDetail({
  note,
  isSelected,
  onUpdate,
}: {
  note: TreatmentNote;
  isSelected: boolean;
  onUpdate: (note: TreatmentNote) => void;
}) {
  const [editedNotes, setEditedNotes] = useState(note);
  const { date, notes } = editedNotes;

  return (
    <>
      <td className="w-1 whitespace-nowrap">
        {date ? new Date(date).toLocaleDateString() : "-"}
      </td>
      <td>
        <input
          className={isSelected ? "cursor-text" : "cursor-pointer"}
          onClick={(e) => {
            if (isSelected) {
              e.stopPropagation();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }

            onUpdate(note);
          }}
          onChange={(e) => {
            const updatedNotes = e.currentTarget.value;

            setEditedNotes({ ...editedNotes, notes: updatedNotes });
          }}
          type="textarea"
          value={notes}
          readOnly={!isSelected}
        />
      </td>
    </>
  );
}
