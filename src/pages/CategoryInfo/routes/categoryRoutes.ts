import { lazy } from "react";
import { Category_ROUTES } from "./paths";

export const categoryRoutes = [
  {
    path: Category_ROUTES.INFO,
    Component: lazy(() => import("../pages/Info")),
  },
  {
    path: Category_ROUTES.SUBCATEGORY,
    Component: lazy(() => import("../pages/Subcategory")),
  },
  // {
  //   path: Employee_ROUTES.NOTFOUND,
  //   Component: lazy(() => import("@pages/NotFound")),
  // },
];
