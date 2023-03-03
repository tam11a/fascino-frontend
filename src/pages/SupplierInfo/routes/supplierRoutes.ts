import { lazy } from "react";
import { SUPPLIER_ROUTES } from "./paths";

export const supplierRoutes = [
  {
    path: SUPPLIER_ROUTES.INFO,
    Component: lazy(() => import("../pages/Info")),
  },
  {
    path: SUPPLIER_ROUTES.ADDITIONAL,
    Component: lazy(() => import("../pages/Additional")),
  },
  // {
  //   path: Employee_ROUTES.NOTFOUND,
  //   Component: lazy(() => import("@pages/NotFound")),
  // },
];
