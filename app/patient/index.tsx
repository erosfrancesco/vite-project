import MagnifyingGlassIcon from "~/components/icons/MagnifyingGlassIcon";
import { usePatients } from "./patients";
import PatientsList from "~/components/PatientGrid";
import PatientsLayout from "~/layouts/Patients";

export default function Patients() {
  const { filter, setFilter } = usePatients();

  return (
    <PatientsLayout
      header={<h1 className="text-2xl font-bold">Your patients</h1>}
      filters={
        <div className="flex min-w-[20rem] items-center border rounded">
          <MagnifyingGlassIcon className="ml-2" />
          <input
            type="text"
            placeholder="Search by name, surname or notes"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full border-0 ring-0 outline-0"
          />
        </div>
      }
      main={<PatientsList className="shadow-md mt-4" />}
    />
  );
}
