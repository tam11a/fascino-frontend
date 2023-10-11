import React from "react";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import BranchRoutes from "./routes";
import { AccessMargin } from "@tam11a/react-use-access";
import defaultPermissions from "@/utilities/defaultPermissions";

const BranchInfo: React.FC = () => {
  return (
    <AccessMargin to={defaultPermissions.INVENTORY} defaultFallback>
      <Navigator />
      <Container>
        <BranchRoutes />
      </Container>
    </AccessMargin>
  );
};

export default BranchInfo;
