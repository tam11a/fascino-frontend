import React from "react";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import OrderRoutes from "./routes";
import { AccessMargin } from "@tam11a/react-use-access";
import defaultPermissions from "@/utilities/defaultPermissions";

const OrderInfo: React.FC = () => {
  return (
    <AccessMargin to={defaultPermissions.INVENTORY} defaultFallback>
      <Navigator />
      <Container>
        <OrderRoutes />
      </Container>
    </AccessMargin>
  );
};

export default OrderInfo;
