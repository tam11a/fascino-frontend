export const PUBLIC_ROUTES = {
  HOME: "",
  NOTFOUND: "*",
};

export const PRIVATE_ROUTES = {
  DASHBOARD: "",
  NOTFOUND: "*",
  PRODUCTS: "products",
  BRANCHINFO: "branch/:bid/*",
  BRANCHES: "branches",
  CUSTOMERINFO: "customer/:cid/*",
  CUSTOMER: "customer",
  EMPLOYEES: "employees",
  SUPPLIERS: "suppliers",
  EMPLOYEEINFO: "employee/:eid/*",
  ROLES: "roles/*",
};
