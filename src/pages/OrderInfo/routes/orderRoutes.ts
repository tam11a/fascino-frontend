import { lazy } from "react";
import { Order_ROUTES } from "./paths";

export const orderRoutes = [
  {
    path: Order_ROUTES.INFO,
    Component: lazy(() => import("../pages/Info")),
  },
  {
    path: Order_ROUTES.ADDITIONAL,
    Component: lazy(() => import("../pages/Additional")),
  },
  // {
  //   path: Employee_ROUTES.NOTFOUND,
  //   Component: lazy(() => import("@pages/NotFound")),
  // },
];
