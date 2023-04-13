import { lazy } from "react";
import { ITEM_ROUTES } from "./paths";

export const itemRoutes = [
  {
    path: ITEM_ROUTES.INFO,
    Component: lazy(() => import("../pages/Info")),
  },
];
