import { PatientSummaryCardInterface } from "../interfaces/PatientSummary";
import CardLayout from "../layouts/Card";
import { PatientActions } from "./PatientActions";
import { useNavigate } from "react-router-dom";

export default function PatientSummaryCardStyling(
  props: PatientSummaryCardInterface
) {
  return (
    <CardLayout>
      <PatientSummaryCard {...props} />
    </CardLayout>
  );
}

function PatientSummaryCard({
  patient,
  onUpdate,
  onDelete,
}: PatientSummaryCardInterface) {
  const navigate = useNavigate();

  const lastTreatment = patient.treatments[patient.treatments.length - 1];
  const lastTreatmentLabel = lastTreatment
    ? new Date(lastTreatment.date).toLocaleDateString()
    : "-";

  function goToPatientDetails(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();

    navigate(`/patients/${patient._id}`);
  }

  return (
    <div onClick={goToPatientDetails} className="flex justify-between">
      <div className="flex flex-col justify-between items-start">
        <h2 className="text-xl font-bold mb-2">
          {patient.name} {patient.surname}
        </h2>

        <p>{patient.generalNotes}</p>
        <p>Last Treated on: {lastTreatmentLabel}</p>
        <p>Treatments: {patient.treatments.length || "None"}</p>
      </div>

      <PatientActions
        patient={patient}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </div>
  );
}
