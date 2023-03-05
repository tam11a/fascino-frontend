import { lazy } from "react";
import { PRODUCT_ROUTES } from "./paths";

export const prodRoutes = [
  {
    path: PRODUCT_ROUTES.INFO,
    Component: lazy(() => import("../pages/Info")),
  },
  {
    path: PRODUCT_ROUTES.ADDITIONAL,
    Component: lazy(() => import("../pages/Additional")),
  },
  // {
  //   path: Employee_ROUTES.NOTFOUND,
  //   Component: lazy(() => import("@pages/NotFound")),
  // },
];
