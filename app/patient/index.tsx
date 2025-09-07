import { usePatients, type OrderKey, type Patient } from "./patients";
import PatientsGrid from "~/components/PatientGrid";
import PatientsLayout from "~/layouts/Patients";
import { OrderBy, SearchBar } from "./patientFilter";
import { CreatePatient } from "./patientCreate";

// MAIN COMPONENT
export default function Patients() {
  const {
    filter,
    setFilter,
    orderDir,
    setOrderDir,
    setOrderKey,
    orderKey,
    patients,
    addPatient,
  } = usePatients();

  // HANDLERS
  const onFilterUpdate = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  const onOrderKeyUpdate = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setOrderKey(e.target.value as OrderKey);

  const onOrderDirUpdate = () =>
    setOrderDir(orderDir === "asc" ? "desc" : "asc");

  const onUpdatePatient = (updatedPatient: Patient) => {
    // This function can be used to update a patient in the state if needed
  };

  return (
    <PatientsLayout
      header={
        <div className="flex justify-between items-center flex-grow">
          <h1 className="text-2xl font-bold">Your patients</h1>
          <CreatePatient onCreate={addPatient} />
        </div>
      }
      filters={
        <div className="flex gap-2 items-center justify-center">
          <SearchBar filter={filter} onFilterUpdate={onFilterUpdate} />
          <OrderBy
            orderKey={orderKey}
            orderDir={orderDir}
            onOrderKeyUpdate={onOrderKeyUpdate}
            onOrderDirUpdate={onOrderDirUpdate}
          />
        </div>
      }
      main={<PatientsGrid patients={patients} onUpdate={onUpdatePatient} />}
    />
  );
}
