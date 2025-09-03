import { useParams } from "react-router";
import { usePatients } from "./patients";

export default function PatientDetail() {
  const { patientId } = useParams();
  const { getPatientById } = usePatients();
  const patient = getPatientById(patientId);

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
    <main className="flex items-center justify-center p-4 bg-[color:var(--shiatsu-beige)]">
      <div className="flex-1 flex flex-col items-start gap-8 min-h-0">
        <h2 className="text-2xl font-bold mb-2 text-[color:var(--shiatsu-red)]">
          {patient.name} {patient.surname}
        </h2>
        <div className="mb-2 text-[color:var(--shiatsu-brown)]">
          {patient.generalNotes}
        </div>

        <table className="min-w-[300px] w-full border border-[color:var(--shiatsu-gray)] rounded bg-[color:var(--shiatsu-white)]">
          <thead>
            <tr className="bg-[color:var(--shiatsu-brown)]">
              <th className="px-2 py-2 border text-[color:var(--shiatsu-white)] w-1 whitespace-nowrap">
                Date
              </th>
              <th className="px-4 py-2 border text-[color:var(--shiatsu-white)]">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {patient.treatments.map((treatment, idx) => (
              <tr key={idx}>
                <td className="px-2 py-2 border text-[color:var(--shiatsu-gray)] w-1 whitespace-nowrap">
                  {treatment.date
                    ? new Date(treatment.date).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-4 py-2 border text-[color:var(--shiatsu-brown)]">
                  {treatment.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
