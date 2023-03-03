export const PUBLIC_ROUTES = {
  HOME: "",
  NOTFOUND: "*",
};

export const PRIVATE_ROUTES = {
  DASHBOARD: "",
  NOTFOUND: "*",
  BRANCHINFO: "branch/:bid/*",
  BRANCHES: "branches",
  CUSTOMERINFO: "customer/:cid/*",
  CUSTOMER: "customer",
  SUPPLIERS: "suppliers",
  SUPPLIERINFO: "supplier/:sid",
  EMPLOYEES: "employees",
  EMPLOYEEINFO: "employee/:eid/*",
  ROLES: "roles/*",
};
