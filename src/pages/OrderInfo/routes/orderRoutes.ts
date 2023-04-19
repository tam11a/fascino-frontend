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
  {
    path: Order_ROUTES.ITEM,
    Component: lazy(() => import("../pages/Item")),
  },
];
