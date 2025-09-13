import { useState } from "react";
import { usePatients, type Patient } from "../hooks/Patients";
import PlusIcon from "./icons/PlusIcon";

type Treatment = Patient["treatments"][number];

export default function TreatmentTable({
  treatments,
}: {
  treatments: Patient["treatments"];
  onCreate: (treatment: Treatment) => void;
  onUpdate: (treatment: Partial<Treatment>) => void;
  onDelete: (treatmentId: number) => void;
}) {
  const [newTreatment, setNewTreatment] = useState<Treatment | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const toggleSelectedRow = (index: number) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };

  return (
    <>
      <button
        disabled={!!newTreatment}
        className="flex items-center px-2"
        onClick={() => {
          setNewTreatment({
            date: new Date().getTime(),
            notes: "",
          });
        }}
      >
        New note <PlusIcon />
      </button>
      <table>
        <thead>
          <tr>
            <th className="w-1 whitespace-nowrap">Date</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {newTreatment && (
            <tr className="tr-selected">
              <TreatmentDetail treatment={newTreatment} isSelected={true} />
            </tr>
          )}
          {treatments.map((treatment, idx) => (
            <tr
              key={idx}
              className={selectedRow === idx ? "tr-selected" : ""}
              onClick={() => toggleSelectedRow(idx)}
            >
              <TreatmentDetail
                key={idx}
                treatment={treatment}
                isSelected={selectedRow === idx}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function TreatmentDetail({
  treatment,
  isSelected,
}: {
  treatment: Treatment;
  isSelected: boolean;
}) {
  return (
    <>
      <td className="w-1 whitespace-nowrap">
        {treatment.date ? new Date(treatment.date).toLocaleDateString() : "-"}
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

            // save
          }}
          onChange={(e) => {
            const updatedNotes = e.currentTarget.value;
            console.log("Updated notes:", updatedNotes);
          }}
          type="textarea"
          value={treatment.notes}
          readOnly={!isSelected}
        />
      </td>
    </>
  );
}
