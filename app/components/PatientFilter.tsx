import MagnifyingGlassIcon from "~/components/icons/MagnifyingGlassIcon";
import { type OrderKey } from "../hooks/Patients";

export function SearchBar({
  filter,
  onFilterUpdate,
}: {
  filter: string;
  onFilterUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
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
}

export function OrderBy({
  orderKey,
  orderDir,
  onOrderKeyUpdate,
  onOrderDirUpdate,
}: {
  orderKey: OrderKey;
  orderDir: string;
  onOrderKeyUpdate: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onOrderDirUpdate: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <p>Order by:</p>
      <select onChange={onOrderKeyUpdate} value={orderKey}>
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
}
