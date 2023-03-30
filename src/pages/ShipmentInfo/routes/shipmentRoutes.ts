import { lazy } from "react";
import { SHIPMENT_ROUTES } from "./paths";

export const shipmentRoutes = [
  {
    path: SHIPMENT_ROUTES.INFO,
    Component: lazy(() => import("@pages/ShipmentInfo/pages/Info")),
  },
  // {
  //   path: SHIPMENT_ROUTES.NOTFOUND,
  //   Component: lazy(() => import("@pages/NotFound")),
  // },
];
