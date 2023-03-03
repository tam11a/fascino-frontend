export const PUBLIC_ROUTES = {
	HOME: "",
	NOTFOUND: "*",
};

export const PRIVATE_ROUTES = {
	DASHBOARD: "",
	NOTFOUND: "*",
	EMPLOYEES: "employees",
	EMPLOYEEINFO: "employee/:eid/*",
	ROLES: "roles/*",
  BRANCHINFO: "branch/:bid/*",
  BRANCHES: "branches",
};
