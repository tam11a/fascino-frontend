import { lazy } from "react";
import { PRIVATE_ROUTES } from "./paths";

export const privateRoutes = [
  {
    path: PRIVATE_ROUTES.DASHBOARD,
    Component: lazy(() => import("@pages/Dashboard")),
  },
  {
    path: PRIVATE_ROUTES.POS,
    Component: lazy(() => import("@pages/POS")),
  },
  {
    path: PRIVATE_ROUTES.PRODUCTS,
    Component: lazy(() => import("@pages/Products")),
  },
  {
    path: PRIVATE_ROUTES.PRODUCTINFO,
    Component: lazy(() => import("@pages/ProductInfo")),
  },
  {
    path: PRIVATE_ROUTES.ITEMINFO,
    Component: lazy(() => import("@pages/ItemInfo")),
  },
  {
    path: PRIVATE_ROUTES.ORDERS,
    Component: lazy(() => import("@pages/OrderList")),
  },
  {
    path: PRIVATE_ROUTES.ORDERINFO,
    Component: lazy(() => import("@pages/OrderInfo")),
  },
  {
    path: PRIVATE_ROUTES.CATEGORY,
    Component: lazy(() => import("@pages/Category")),
  },
  {
    path: PRIVATE_ROUTES.CATEGORYINFO,
    Component: lazy(() => import("@pages/CategoryInfo")),
  },
  {
    path: PRIVATE_ROUTES.SUBCATEGORYINFO,
    Component: lazy(() => import("@pages/SubcategoryInfo")),
  },
  {
    path: PRIVATE_ROUTES.TAILOR,
    Component: lazy(() => import("@pages/Tailor")),
  },
  {
    path: PRIVATE_ROUTES.TAILORINFO,
    Component: lazy(() => import("@pages/TailorInfo")),
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
    path: PRIVATE_ROUTES.SHIPMENT,
    Component: lazy(() => import("@pages/Shipment")),
    // permissions: Object.values(defaultPermissions.EMPLOYEES),
  },
  {
    path: PRIVATE_ROUTES.SHIPMENTINFO,
    Component: lazy(() => import("@pages/ShipmentInfo")),
    // permissions: Object.values(defaultPermissions.EMPLOYEES),
  },
  {
    path: PRIVATE_ROUTES.CUSTOMERINFO,
    Component: lazy(() => import("@pages/CustomeInfo")),
    // permissions: Object.values(defaultPermissions.EMPLOYEES),
  },
  {
    path: PRIVATE_ROUTES.CUSTOMER,
    Component: lazy(() => import("@pages/Customer")),
    // permissions: Object.values(defaultPermissions.EMPLOYEES),
  },
  {
    path: PRIVATE_ROUTES.SUPPLIERS,
    Component: lazy(() => import("@pages/Suppliers")),
    // permissions: Object.values(defaultPermissions.EMPLOYEES),
  },
  {
    path: PRIVATE_ROUTES.SUPPLIERSINFO,
    Component: lazy(() => import("@pages/SuppliersInfo")),
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
    path: PRIVATE_ROUTES.SALES,
    Component: lazy(() => import("@pages/Reports")),
    // permissions: Object.values(defaultPermissions.EMPLOYEES),
  },
  {
    path: PRIVATE_ROUTES.NOTFOUND,
    Component: lazy(() => import("@pages/NotFound")),
  },
  {
    path: PRIVATE_ROUTES.SETTINGS,
    Component: lazy(() => import("@pages/Settings")),
  },
];
