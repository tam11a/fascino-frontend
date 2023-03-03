export const PUBLIC_ROUTES = {
  HOME: "",
  NOTFOUND: "*",
};

export const PRIVATE_ROUTES = {
  DASHBOARD: "",
  NOTFOUND: "*",
  BRANCHINFO: "branch/:bid/*",
  BRANCHES: "branches",
  CUSTOMER: "customer",
  EMPLOYEES: "employees",
  EMPLOYEEINFO: "employee/:eid/*",
  ROLES: "roles/*",
};
