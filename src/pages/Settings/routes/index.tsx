import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { settingRoutes } from "./settingRoutes";
import NProgressSuspense from "@components/NProgressSuspense";

const SettingRoutes: React.FC = () => {
  return (
    <Routes>
      {settingRoutes?.map?.(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<NProgressSuspense />}>
              <Component />
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};

export default SettingRoutes;
