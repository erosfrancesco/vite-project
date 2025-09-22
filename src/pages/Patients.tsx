import React from "react";
import { PatientContext } from "../context/Database";
import { CreatePatient } from "../components/PatientActions";
import PatientSummaryCardStyling from "../components/PatientSummary";
import LayoutGrid from "../layouts/Grid";

export const ListPatients = () => {
  const { items, remove, upsert } = React.useContext(PatientContext);

  return (
    <div className="transition-[background-color] duration-1000 flex flex-col h-screen">
      <header>
        <h1 className="text-2xl font-bold">Your patients</h1>
        <CreatePatient onCreate={upsert} />
      </header>

      {items.length > 0 ? (
        <LayoutGrid>
          {items.map((t) => {
            return (
              <PatientSummaryCardStyling
                key={t._id}
                patient={t}
                onDelete={() => {
                  remove(t);
                }}
                onUpdate={(updates) => {
                  upsert({ ...t, ...updates });
                }}
              />
            );
          })}
        </LayoutGrid>
      ) : (
        <div className="grow flex">
          <p className="m-auto">No patients yet.</p>
        </div>
      )}
    </div>
  );
};
