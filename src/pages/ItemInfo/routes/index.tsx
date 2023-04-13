import NProgressSuspense from "@components/NProgressSuspense";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { itemRoutes } from "./itemRoutes";

const ItemRoutes: React.FC = () => {
  return (
    <Routes>
      {itemRoutes?.map?.(({ path, Component }) => (
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

export default ItemRoutes;
