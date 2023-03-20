import React from "react";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import SupplierRoutes from "./routes";

const SupplierInfo: React.FC = () => {
  return (
    <>
      <Navigator />
      <Container>
        <SupplierRoutes />
      </Container>
    </>
  );
};

export default SupplierInfo;
