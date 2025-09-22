import { useParams } from "react-router";
import { IPatient, ITreatmentNote } from "../interfaces/Database";
import React, { useEffect } from "react";
import { PatientContext } from "../context/Database";
import ListLayout from "../layouts/List";
import TreatmentNotes from "../components/TreatmentNotes";
import PlusIcon from "../components/icons/PlusIcon";

export default function PatientDetail() {
  const { patientId } = useParams();
  const { upsert, search, patient, items } = React.useContext(PatientContext);
  const [notes, setNotes] = React.useState<ITreatmentNote[]>([]);
  const [updateFlag, setUpdateFlag] = React.useState(false);

  useEffect(() => {
    search(patientId);
  }, [patientId, updateFlag, items]);

  useEffect(() => {
    setNotes(patient?.treatments || []);
  }, [patient]);

  /** */
  if (!patient) {
    return (
      <main className="flex items-center justify-center pt-16 pb-4">
        <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
          <span className="text-red-600">Patient not found. Go back.</span>
        </div>
      </main>
    );
  }
  /** */

  const onCreateNote = () => {
    const newNote = {
      date: new Date().getTime(),
      notes: "",
    };

    upsert({ ...patient, treatments: [newNote, ...patient.treatments] });
    setUpdateFlag(!updateFlag);
  };

  return (
    <ListLayout
      header={
        <>
          <h2 className="text-2xl font-bold text-[color:var(--shiatsu-primary)]">
            {patient.name} {patient.surname}
          </h2>
          <button
            className="flex items-center justify-center p-1"
            onClick={onCreateNote}
          >
            <PlusIcon /> <span className="pr-1">new</span>
          </button>
        </>
      }
    >
      <TreatmentNotes
        refresh={updateFlag}
        treatments={notes || []}
        onUpdate={(updatedNote) => {
          upsert({ ...patient, treatments: updatedNote });
          setUpdateFlag(!updateFlag);
        }}
        onDelete={(updatedNote) => {
          upsert({ ...patient, treatments: updatedNote });
          setUpdateFlag(!updateFlag);
        }}
      />
    </ListLayout>
  );
}
