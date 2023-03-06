import { lazy } from "react";
import { SETTINGS_ROUTES } from "./paths";

export const settingRoutes = [
  {
    path: SETTINGS_ROUTES.PERSONAL,
    Component: lazy(() => import("../pages/Personal")),
  },
  {
    path: SETTINGS_ROUTES.SECURITY,
    Component: lazy(() => import("../pages/Security")),
  },
  {
    path: SETTINGS_ROUTES.PREFERENCES,
    Component: lazy(() => import("../pages/Preferences")),
  },
  {
    path: SETTINGS_ROUTES.NOTFOUND,
    Component: lazy(() => import("@pages/NotFound")),
  },
];
