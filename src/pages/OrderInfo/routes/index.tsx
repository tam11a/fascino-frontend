import NProgressSuspense from "@components/NProgressSuspense";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { orderRoutes } from "./orderRoutes";

const OrderRoutes: React.FC = () => {
  return (
    <Routes>
      {orderRoutes?.map?.(({ path, Component }) => (
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

export default OrderRoutes;
