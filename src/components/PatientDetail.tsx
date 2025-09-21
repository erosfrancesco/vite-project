import { useParams } from "react-router";
import { IPatient } from "../interfaces/Database";
import React from "react";
import { PatientContext } from "../context/Database";
import ListLayout from "../layouts/List";
import TreatmentNotes from "./TreatmentNotes";

export default function PatientDetail() {
  const { patientId } = useParams();
  const { items, upsert } = React.useContext(PatientContext);

  const patient: IPatient | undefined = items.find((p) => p._id === patientId);

  if (!patient) {
    return (
      <main className="flex items-center justify-center pt-16 pb-4">
        <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
          <span className="text-red-600">Patient not found.</span>
        </div>
      </main>
    );
  }

  return (
    <ListLayout
      header={
        <h2 className="text-2xl font-bold mb-2 text-[color:var(--shiatsu-primary)]">
          {patient.name} {patient.surname}
        </h2>
      }
    >
      <TreatmentNotes
        treatments={patient.treatments || []}
        onCreate={(updatedNote) =>
          upsert({ ...patient, treatments: updatedNote })
        }
        onUpdate={(updatedNote) =>
          upsert({ ...patient, treatments: updatedNote })
        }
        onDelete={(updatedNote) =>
          upsert({ ...patient, treatments: updatedNote })
        }
      />
    </ListLayout>
  );
}
