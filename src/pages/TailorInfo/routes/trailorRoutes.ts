import { lazy } from "react";
import { TAILOR_ROUTES } from "./paths";

export const trailorRoutes = [
  {
    path: TAILOR_ROUTES.INFO,
    Component: lazy(() => import("../pages/Info")),
  },
  {
    path: TAILOR_ROUTES.ADDITIONAL,
    Component: lazy(() => import("../pages/Additional")),
  },
  // {
  //   path: Employee_ROUTES.NOTFOUND,
  //   Component: lazy(() => import("@pages/NotFound")),
  // },
];
