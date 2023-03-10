export const PUBLIC_ROUTES = {
	HOME: "",
	NOTFOUND: "*",
};

export const PRIVATE_ROUTES = {
	DASHBOARD: "",
	NOTFOUND: "*",
	POS: "pos",
	PRODUCTS: "products",
	PRODUCTINFO: "product/:pid/*",
	BRANCHINFO: "branch/:bid/*",
	BRANCHES: "branches",
	CUSTOMERINFO: "customer/:cid/*",
	CUSTOMER: "customer",
	EMPLOYEES: "employees",
	SUPPLIERS: "suppliers",
	EMPLOYEEINFO: "employee/:eid/*",
	ROLES: "roles/*",
	SETTINGS: "settings/*",
};
