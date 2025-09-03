import { useState } from "react";
import patients from "./patients.json";

export type OrderKey = "name" | "surname" | "date" | "treatments";
export type OrderDir = "asc" | "desc";

export const usePatients = () => {
  const [filter, setFilter] = useState("");
  const [orderKey, setOrderKey] = useState<OrderKey>("date");
  const [orderDir, setOrderDir] = useState<OrderDir>("desc");

  const filteredPatients = [...patients]
    .filter((patient) =>
      `${patient.name} ${patient.surname}`
        .toLowerCase()
        .includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      let aVal = a[orderKey];
      let bVal = b[orderKey];
      if (orderKey === "date") {
        aVal = new Date(a.date).getTime();
        bVal = new Date(b.date).getTime();
      }
      if (orderKey === "treatments") {
        aVal = a.treatments.length;
        bVal = b.treatments.length;
      }
      if (typeof aVal === "string" && typeof bVal === "string") {
        if (orderDir === "asc") return aVal.localeCompare(bVal);
        else return bVal.localeCompare(aVal);
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        if (orderDir === "asc") return aVal - bVal;
        else return bVal - aVal;
      }
      return 0;
    });

  function handleOrder(key: OrderKey) {
    if (orderKey === key) {
      setOrderDir(orderDir === "asc" ? "desc" : "asc");
    } else {
      setOrderKey(key);
      setOrderDir("desc");
    }
  }

  return {
    filter,
    setFilter,
    orderKey,
    setOrderKey,
    orderDir,
    setOrderDir,
    patients: filteredPatients,
    handleOrder,
  };
};
