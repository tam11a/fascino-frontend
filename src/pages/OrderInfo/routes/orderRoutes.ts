import { lazy } from "react";
import { Order_ROUTES } from "./paths";

export const orderRoutes = [
  {
    path: Order_ROUTES.INFO,
    Component: lazy(() => import("../pages/Info")),
  },
  {
    path: Order_ROUTES.TRANSACTION,
    Component: lazy(() => import("../pages/Transection")),
  },
  // {
  //   path: Employee_ROUTES.NOTFOUND,
  //   Component: lazy(() => import("@pages/NotFound")),
  // },
];
