import MagnifyingGlassIcon from "~/components/MagnifyingGlassIcon";
import { usePatients } from "./patients";
import { useNavigate } from "react-router";

export default function Patients() {
  const navigate = useNavigate();

  const { filter, setFilter, renderOrderIconValue, handleOrder, patients } =
    usePatients();

  function goToPatientDetails(patientId: number) {
    navigate(`/patients/${patientId}`);
  }

  return (
    <main className="p-4">
      <header className="flex gap-2">
        <h1 className="text-2xl font-bold">Your patients</h1>

        {/* FILTERS */}
        <div className="flex min-w-[20rem] items-center border rounded">
          <MagnifyingGlassIcon className="ml-2" />
          <input
            type="text"
            placeholder="Search by name, surname or notes"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`w-full 
                border-0 ring-0 outline-0 
                focus:border-0 focus:outline-0 focus:ring-0 
                active:border-0 active:outline-0 active:ring-0 
            `}
          />
        </div>
      </header>

      <div className="shadow-md flex flex-col gap-4 mt-4">
        {/* TABLE */}
        <table className="min-w-[400px] w-full">
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
              const {
                generalNotes,
                treatments,
                name,
                surname,
                lastTreatmentDate,
              } = patient;

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
      </div>
    </main>
  );
}
