import React from "react";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import CustomerRoutes from "./routes";
import { AccessMargin } from "@tam11a/react-use-access";
import defaultPermissions from "@/utilities/defaultPermissions";

const CustomerInfo: React.FC = () => {
  return (
    <AccessMargin to={defaultPermissions.INVENTORY} defaultFallback>
      <Navigator />
      <Container>
        <CustomerRoutes />
      </Container>
    </AccessMargin>
  );
};

export default CustomerInfo;
