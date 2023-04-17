import { lazy } from "react";
import { Branch_ROUTES } from "./paths";

export const branchRoutes = [
  {
    path: Branch_ROUTES.INFO,
    Component: lazy(() => import("../pages/Info")),
  },
  {
    path: Branch_ROUTES.EMPLOYEE,
    Component: lazy(() => import("../pages/Employees")),
  },
  {
    path: Branch_ROUTES.PETTYCASH,
    Component: lazy(() => import("../pages/PettyCash")),
  },
  {
    path: Branch_ROUTES.ITEM,
    Component: lazy(() => import("../pages/Item")),
  },
];
