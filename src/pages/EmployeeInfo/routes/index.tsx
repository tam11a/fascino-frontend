import NProgressSuspense from "@components/NProgressSuspense";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { empRoutes } from "./empRoutes";

const EmployeeRoutes: React.FC = () => {
  return (
    <Routes>
      {empRoutes?.map?.(({ path, Component }) => (
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

export default EmployeeRoutes;
