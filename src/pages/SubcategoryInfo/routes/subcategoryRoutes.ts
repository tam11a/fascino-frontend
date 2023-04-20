import { lazy } from "react";
import { Subcategory_ROUTES } from "./paths";

export const subcategoryRoutes = [
  {
    path: Subcategory_ROUTES.INFO,
    Component: lazy(() => import("../pages/Info")),
  },
];
