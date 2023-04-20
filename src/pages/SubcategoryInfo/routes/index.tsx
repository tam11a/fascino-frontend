import NProgressSuspense from "@components/NProgressSuspense";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { subcategoryRoutes } from "./subcategoryRoutes";

const SubcategoryRoutes: React.FC = () => {
  return (
    <Routes>
      {subcategoryRoutes?.map?.(({ path, Component }) => (
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

export default SubcategoryRoutes;
