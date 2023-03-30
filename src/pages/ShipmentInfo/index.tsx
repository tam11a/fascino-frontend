import React from "react";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import ShipmentRoutes from "./routes";

const ShipmentInfo: React.FC = () => {
  return (
    <>
      <Navigator />
      <Container>
        <ShipmentRoutes />
      </Container>
    </>
  );
};

export default ShipmentInfo;
