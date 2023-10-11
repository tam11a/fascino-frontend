import React from "react";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import SupplierRoutes from "./routes";
import { AccessMargin } from "@tam11a/react-use-access";
import defaultPermissions from "@/utilities/defaultPermissions";

const SupplierInfo: React.FC = () => {
  return (
    <AccessMargin to={defaultPermissions.INVENTORY} defaultFallback>
      <Navigator />
      <Container>
        <SupplierRoutes />
      </Container>
    </AccessMargin>
  );
};

export default SupplierInfo;
