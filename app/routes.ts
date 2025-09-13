import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // index("home/index.tsx"),
  index("patient/index.tsx"),
  route("patients/:patientId", "patient/detail.tsx"),
] satisfies RouteConfig;
