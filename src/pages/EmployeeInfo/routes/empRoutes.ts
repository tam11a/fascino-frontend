import { lazy } from "react";
import { Employee_ROUTES } from "./paths";

export const empRoutes = [
  {
    path: Employee_ROUTES.INFO,
    Component: lazy(() => import("../pages/Info")),
  },
  {
    path: Employee_ROUTES.SECURITY,
    Component: lazy(() => import("../pages/Security")),
  },
];
