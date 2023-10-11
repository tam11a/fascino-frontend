import React from "react";
import DashboardFallback from "@components/DashboardFallback";
import { AccessMargin } from "@tam11a/react-use-access";
import defaultPermissions from "@/utilities/defaultPermissions";

const Dashboard: React.FC = () => {
  return (
    <AccessMargin to={defaultPermissions.DASHBOARD} defaultFallback>
      <DashboardFallback />
    </AccessMargin>
  );
};

export default Dashboard;
