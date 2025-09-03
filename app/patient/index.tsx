import MagnifyingGlassIcon from "~/components/MagnifyingGlassIcon";
import { usePatients, type OrderKey } from "./patients";

export default function Patients() {
  const { filter, setFilter, orderKey, orderDir, patients, handleOrder } =
    usePatients();

  function renderOrderIcon(key: OrderKey) {
    return orderKey === key ? (
      <span className="text-[1em] text-[color:var(--shiatsu-white)]">
        {orderDir === "desc" ? "↓" : "↑"}
      </span>
    ) : (
      <span className="text-[1em] text-[color:var(--shiatsu-white)]"> </span>
    );
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
                Name {renderOrderIcon("name")}
              </th>
              <th
                className="px-4 py-2 border cursor-pointer select-none"
                onClick={() => handleOrder("surname")}
                title="Order by surname"
              >
                Surname {renderOrderIcon("surname")}
              </th>
              <th className="px-4 py-2 border select-none">General Notes</th>
              <th
                className="px-4 py-2 border cursor-pointer select-none"
                onClick={() => handleOrder("date")}
                title="Order by last treatment"
              >
                Last treatment {renderOrderIcon("date")}
              </th>
              <th
                className="px-4 py-2 border cursor-pointer select-none"
                onClick={() => handleOrder("treatments")}
                title="Order by number of treatments"
              >
                N. Treatments {renderOrderIcon("treatments")}
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="cursor-pointer">
                <td className="px-4 py-2 border">{patient.name}</td>
                <td className="px-4 py-2 border">{patient.surname}</td>
                <td className="px-4 py-2 border flex-1">
                  {patient.generalNotes}
                </td>
                <td className="px-4 py-2 border">
                  {new Date(patient.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">
                  {patient.treatments.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
