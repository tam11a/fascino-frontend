import { lazy } from "react";
import { CUSTOMER_ROUTES } from "./paths";

export const customerRoutes = [
	{
		path: CUSTOMER_ROUTES.INFO,
		Component: lazy(() => import("../pages/Info")),
	},
	{
		path: CUSTOMER_ROUTES.ADDITIONAL,
		Component: lazy(() => import("../pages/Additional")),
	},
	{
		path: CUSTOMER_ROUTES.HISTORY,
		Component: lazy(() => import("../pages/History")),
	},
	{
		path: CUSTOMER_ROUTES.NOTFOUND,
		Component: lazy(() => import("@pages/NotFound")),
	},
];
