import MagnifyingGlassIcon from "~/components/icons/MagnifyingGlassIcon";
import { usePatients, type OrderKey } from "./patients";
import PatientsGrid from "~/components/PatientGrid";
import PatientsLayout from "~/layouts/Patients";

export default function Patients() {
  const {
    filter,
    setFilter,
    orderDir,
    setOrderDir,
    setOrderKey,
    orderKey,
    patients,
  } = usePatients();

  // HANDLERS
  const onFilterUpdate = (e: any) => {
    // e.stopPropagation();
    console.log("updated", e);
    /*
    if (e.key === "Enter") {
      console.log("j");
    }
    setFilter(e.target.value);
    /** */
  };

  const onOrderKeyUpdate = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setOrderKey(e.target.value as OrderKey);

  const onOrderDirUpdate = () =>
    setOrderDir(orderDir === "asc" ? "desc" : "asc");
  //

  //
  const SearchBar = () => (
    <div className="flex max-w-[20rem] items-center border rounded">
      <MagnifyingGlassIcon className="ml-2" />
      <input
        type="text"
        placeholder="Search by name, surname or notes"
        value={filter}
        onChange={onFilterUpdate}
        className="w-full border-0 ring-0 outline-0"
      />
    </div>
  );

  const OrderBy = () => (
    <div className="flex items-center gap-2">
      <p>Order by:</p>

      <select onChange={onOrderKeyUpdate} defaultValue={orderKey}>
        <option value="lastTreatmentDate">Last Treatment Date</option>
        <option value="name">Name</option>
        <option value="surname">Surname</option>
        <option value="generalNotes">General Notes</option>
      </select>

      <p
        onClick={onOrderDirUpdate}
        className="h-full cursor-pointer text-[1.1em]"
      >
        {orderDir === "asc" ? "🔼" : "🔽"}
      </p>
    </div>
  );

  return (
    <PatientsLayout
      header={
        <div className="flex justify-between items-center flex-grow">
          <h1 className="text-2xl font-bold">Your patients</h1>
          <button className="ml-2 p-2 rounded">Add Patient</button>
        </div>
      }
      filters={
        <div className="flex gap-2 items-center justify-center">
          <SearchBar />
          <OrderBy />
        </div>
      }
      main={<PatientsGrid patients={patients} />}
    />
  );
}
