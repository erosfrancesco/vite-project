import { useParams } from "react-router";
import { IPatient, ITreatmentNote } from "../interfaces/Database";
import React, { useEffect } from "react";
import { PatientContext } from "../context/Database";
import ListLayout from "../layouts/List";
import TreatmentNotes from "../components/TreatmentNotes";

export default function PatientDetail() {
  const { patientId } = useParams();
  const { items, upsert } = React.useContext(PatientContext);
  const [patient, setPatient] = React.useState<IPatient | undefined>(undefined);
  const [notes, setNotes] = React.useState<ITreatmentNote[]>([]);
  const [updateFlag, setUpdateFlag] = React.useState(false);

  const refreshPage = () => {
    // TODO: - Patient finding could be optimized.
    const patient = items.find((p) => String(p._id) === String(patientId));
    setPatient(patient);
    setNotes(patient?.treatments || []);
  };

  useEffect(() => {
    refreshPage();
  }, [patientId, updateFlag, items]);

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

  return (
    <ListLayout
      header={
        <h2 className="text-2xl font-bold mb-2 text-[color:var(--shiatsu-primary)]">
          {patient.name} {patient.surname}
          {/** TODO: - Create here... */}
        </h2>
      }
    >
      <TreatmentNotes
        treatments={notes || []}
        onCreate={(updatedNote) => {
          upsert({ ...patient, treatments: updatedNote });
          setUpdateFlag(!updateFlag);
        }}
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
