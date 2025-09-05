import { usePatients } from "../patient/patients";
import { useNavigate } from "react-router";

interface PatientsListProps {
  className?: string;
}

export default function PatientsList({ className }: PatientsListProps) {
  const navigate = useNavigate();

  const { renderOrderIconValue, handleOrder, patients } = usePatients();

  function goToPatientDetails(patientId: number) {
    navigate(`/patients/${patientId}`);
  }

  return (
    <table className={["min-w-[400px] w-full", className].join(" ")}>
      <thead>
        <tr className="cursor-default">
          <th
            className="px-4 py-2 border cursor-pointer select-none"
            onClick={() => handleOrder("name")}
            title="Order by name"
          >
            Name {renderOrderIconValue("name")}
          </th>
          <th
            className="px-4 py-2 border cursor-pointer select-none"
            onClick={() => handleOrder("surname")}
            title="Order by surname"
          >
            Surname {renderOrderIconValue("surname")}
          </th>
          <th className="px-4 py-2 border select-none">General Notes</th>
          <th
            className="px-4 py-2 border cursor-pointer select-none"
            onClick={() => handleOrder("lastTreatmentDate")}
            title="Order by last treatment"
          >
            Last treatment {renderOrderIconValue("lastTreatmentDate")}
          </th>
          <th className="px-4 py-2 border cursor-pointer select-none">
            N. Treatments
          </th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => {
          const { generalNotes, treatments, name, surname, lastTreatmentDate } =
            patient;

          return (
            <tr
              key={patient.id}
              className="cursor-pointer"
              onClick={() => goToPatientDetails(patient.id)}
            >
              <td className="px-4 py-2 border">{name}</td>
              <td className="px-4 py-2 border">{surname}</td>
              <td className="px-4 py-2 border flex-1">{generalNotes}</td>
              <td className="px-4 py-2 border">
                {new Date(lastTreatmentDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border">
                {treatments.length || "None"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
