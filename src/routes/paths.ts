export const PUBLIC_ROUTES = {
  HOME: "",
  NOTFOUND: "*",
};

export const PRIVATE_ROUTES = {
  DASHBOARD: "",
  NOTFOUND: "*",
  POS: "pos",
  TAILOR: "tailors",
  TAILORINFO: "tailors/:tid/*",
  PRODUCTS: "products",
  CATEGORY: "category",
  PRODUCTINFO: "product/:pid/*",
  BRANCHINFO: "branch/:bid/*",
  BRANCHES: "branches",
  SHIPMENT: "shipment",
  SHIPMENTINFO: "shipment/:shid/*",
  CUSTOMERINFO: "customer/:cid/*",
  CUSTOMER: "customer",
  EMPLOYEES: "employees",
  SUPPLIERSINFO: "suppliers/:sid/*",
  SUPPLIERS: "suppliers",
  EMPLOYEEINFO: "employee/:eid/*",
  ROLES: "roles/*",
  SETTINGS: "settings/*",
};
