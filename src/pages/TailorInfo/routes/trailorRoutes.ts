import { lazy } from "react";
import { TAILOR_ROUTES } from "./paths";

export const trailorRoutes = [
  {
    path: TAILOR_ROUTES.INFO,
    Component: lazy(() => import("../pages/Info")),
  },
  {
    path: TAILOR_ROUTES.ITEM,
    Component: lazy(() => import("../pages/item")),
  },
  // {
  //   path: Employee_ROUTES.NOTFOUND,
  //   Component: lazy(() => import("@pages/NotFound")),
  // },
];
