import React from "react";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import OrderRoutes from "./routes";

const OrderInfo: React.FC = () => {
  return (
    <>
      <Navigator />
      <Container>
        <OrderRoutes />
      </Container>
    </>
  );
};

export default OrderInfo;
