import React from "react";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import ShipmentRoutes from "./routes";
import { AccessMargin } from "@tam11a/react-use-access";
import defaultPermissions from "@/utilities/defaultPermissions";

const ShipmentInfo: React.FC = () => {
  return (
    <AccessMargin to={defaultPermissions.INVENTORY} defaultFallback>
      <Navigator />
      <Container>
        <ShipmentRoutes />
      </Container>
    </AccessMargin>
  );
};

export default ShipmentInfo;
