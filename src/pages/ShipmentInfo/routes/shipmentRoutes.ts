import { lazy } from "react";
import { SHIPMENT_ROUTES } from "./paths";

export const shipmentRoutes = [
  {
    path: SHIPMENT_ROUTES.INFO,
    Component: lazy(() => import("@pages/UnderDevelopment")),
  },
  // {
  //   path: Employee_ROUTES.NOTFOUND,
  //   Component: lazy(() => import("@pages/NotFound")),
  // },
];
