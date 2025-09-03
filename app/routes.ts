import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("patients", "patient/index.tsx"),
  route("patients/:patientId", "patient/detail.tsx"),
] satisfies RouteConfig;
