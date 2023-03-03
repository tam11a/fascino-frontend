import { lazy } from "react";
import { PRIVATE_ROUTES } from "./paths";

export const privateRoutes = [
  {
    path: PRIVATE_ROUTES.DASHBOARD,
    Component: lazy(() => import("@pages/Dashboard")),
  },
  {
    path: PRIVATE_ROUTES.BRANCHES,
    Component: lazy(() => import("@pages/Branches")),
    // permissions: Object.values(defaultPermissions.EMPLOYEES),
  },
  {
    path: PRIVATE_ROUTES.BRANCHINFO,
    Component: lazy(() => import("@pages/BrancheInfo")),
    // permissions: Object.values(defaultPermissions.EMPLOYEES),
  },
  {
    path: PRIVATE_ROUTES.CUSTOMER,
    Component: lazy(() => import("@pages/Customer")),
    // permissions: Object.values(defaultPermissions.EMPLOYEES),
  },
  {
    path: PRIVATE_ROUTES.EMPLOYEES,
    Component: lazy(() => import("@pages/Employees")),
    // permissions: Object.values(defaultPermissions.EMPLOYEES),
  },
  {
    path: PRIVATE_ROUTES.EMPLOYEEINFO,
    Component: lazy(() => import("@pages/EmployeeInfo")),
    // permissions: Object.values(defaultPermissions.EMPLOYEES),
  },

  {
    path: PRIVATE_ROUTES.ROLES,
    Component: lazy(() => import("@pages/Roles")),
    // permissions: Object.values(defaultPermissions.EMPLOYEES),
  },
  {
    path: PRIVATE_ROUTES.NOTFOUND,
    Component: lazy(() => import("@pages/NotFound")),
  },
];
