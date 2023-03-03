import { lazy } from "react";
import { Branch_ROUTES } from "./paths";

export const branchRoutes = [
  {
    path: Branch_ROUTES.INFO,
    Component: lazy(() => import("../pages/Info")),
  },
  {
    path: Branch_ROUTES.ADDITIONAL,
    Component: lazy(() => import("../pages/Additional")),
  },
  // {
  //   path: Employee_ROUTES.NOTFOUND,
  //   Component: lazy(() => import("@pages/NotFound")),
  // },
];
